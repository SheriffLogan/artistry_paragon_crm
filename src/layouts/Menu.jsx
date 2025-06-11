// src/layouts/Menu.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import components and utilities
import { SimpleCollapse } from '../components/FrostUI';
import { findAllParent, findMenuItem, findMenuItemByKey } from '../helpers/menu';

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems }) => {
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     setOpen(activeMenuItems.includes(item.key));
    // }, [activeMenuItems, item.key]);

    useEffect(() => {
        // If this item itself is active OR any of its direct/nested children are active, open it
        const isParentOfActive = activeMenuItems.some(activeKey => {
            // Check if activeKey is this item's key OR if activeKey is a child/grandchild of this item
            const foundItem = findMenuItemByKey([item], activeKey); // Search only within this item's subtree
            return !!foundItem; // If an active item is found within this item's subtree, it's a parent of an active item
        });
        setOpen(isParentOfActive);
    }, [activeMenuItems, item]);

    // const toggleMenuItem = () => {
    //     const status = !open;
    //     setOpen(status);
    //     if (toggleMenu) {
    //         toggleMenu(item, status);
    //     }
    //     return false;
    // };

    // Function to toggle the submenu open/close state when clicked
    const toggleMenuItem = (e) => {
        e.preventDefault(); // IMPORTANT: Prevent default link behavior for parent links
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <li className={`menu-item ${open ? 'menuitem-active' : ''}`}>
            <Link to="#" className={`${linkClassName} ${open ? 'open' : ''}`} aria-expanded={open} onClick={toggleMenuItem}>
                {item.icon && <span className="menu-icon"><i className={item.icon}></i></span>}
                <span className="menu-text">{item.label}</span>
                {/* Fixed: Directly render the icon, bypassing potentially problematic .menu-arrow styles */}
                <i className={`ri-arrow-${open ? 'up' : 'down'}-s-line ml-auto`}></i>
                {item.badge && <span className={`badge ${item.badge.variant}`}>{item.badge.text}</span>}
                
                {/* {!item.badge ? <span className="menu-arrow"></span> : <span className={`badge ${item.badge.variant}`}>{item.badge.text}</span>} */}


            </Link>
            {/* SimpleCollapse component to manage the submenu visibility */}
            {/* The 'in' prop directly controls if it's open */}
            <SimpleCollapse in={open}>
                <ul className={`sub-menu ${subMenuClassNames}`}>
                    {(item.children || []).map((child, idx) => (
                        // Render child menu items using the MenuItem component
                        child.children && child.children.length > 0 ? (
                            <MenuItemWithChildren
                                key={idx}
                                item={child}
                                linkClassName="menu-link"
                                subMenuClassNames="" // Or apply specific sub-menu class
                                activeMenuItems={activeMenuItems}
                            />
                        ) : (
                            // Render a simple MenuItem if no children
                            <MenuItem
                                key={idx}
                                item={child}
                                linkClassName="menu-link"
                                className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                            />
                        )
                    ))}
                </ul>
            </SimpleCollapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }) => {
    return (
        <li className={`menu-item ${className}`}>
            <Link to={item.url || '#'} className={` ${linkClassName}`}>
                {item.icon && <span className="menu-icon"><i className={item.icon}></i></span>}
                <span className="menu-text">{item.label}</span>
                {item.badge && <span className={`badge ${item.badge.variant}`}>{item.badge.text}</span>}
            </Link>
        </li>
    );
};

const AppMenu = ({ menuItems }) => {
    const location = useLocation();
    const menuRef = useRef(null);
    const [activeMenuItems, setActiveMenuItems] = useState([]);

    // const toggleMenu = useCallback((menuItem, show) => {
    //     if (show) {
    //         setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
    //     }
    // }, [menuItems]);

    // Callback to determine which menu items should be active based on current route
    const activeMenu = useCallback(() => {
        // Normalize pathname by removing trailing slash if present, for consistent matching
        const normalizedPathname = location.pathname.endsWith('/') && location.pathname !== '/'
                                   ? location.pathname.slice(0, -1)
                                   : location.pathname;

        const foundItemKey = findMenuItem(menuItems, normalizedPathname);

        if (foundItemKey) {
            const parents = findAllParent(menuItems, foundItemKey.key);
            setActiveMenuItems([foundItemKey.key, ...parents]);
            console.log("AppMenu: Active menu items set for path:", normalizedPathname, ":", [foundItemKey.key, ...parents]);
        } else {
            setActiveMenuItems([]); // Clear active menu items if no match
            console.log("AppMenu: No active menu item found for path:", normalizedPathname);
        }
    }, [location.pathname, menuItems]); // Depend on menuItems as well

    useEffect(() => {
        activeMenu();
    }, [location.pathname, activeMenu]);

    return (
        <ul className="menu" ref={menuRef} id="main-side-menu">
            {menuItems.map((item, idx) => (
                <React.Fragment key={idx}>
                    {item.isTitle ? (
                        <li className="menu-title">{item.label}</li>
                    ) : (
                        item.children && item.children.length > 0 ? (
                            <MenuItemWithChildren
                                item={item}
                                // toggleMenu={toggleMenu}
                                subMenuClassNames=""
                                activeMenuItems={activeMenuItems}
                                linkClassName="menu-link"
                            />
                        ) : (
                            <MenuItem
                                item={item}
                                linkClassName="menu-link"
                                className={activeMenuItems.includes(item.key) ? 'menuitem-active' : ''}
                            />
                        )
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default AppMenu;
