import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Import components and utilities
import { SimpleCollapse } from '../components/FrostUI';
import { findAllParent, findMenuItem } from '../helpers/menu';

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }) => {
    const [open, setOpen] = useState(activeMenuItems.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems.includes(item.key));
    }, [activeMenuItems, item.key]);

    const toggleMenuItem = () => {
        const status = !open;
        setOpen(status);
        if (toggleMenu) {
            toggleMenu(item, status);
        }
        return false;
    };

    return (
        <li className={`menu-item ${open ? 'menuitem-active' : ''}`}>
            <Link to="#" className={`${linkClassName} ${activeMenuItems.includes(item.key) ? 'open' : ''}`} aria-expanded={open} onClick={toggleMenuItem}>
                {item.icon && <span className="menu-icon"><i className={item.icon}></i></span>}
                <span className="menu-text">{item.label}</span>
                {!item.badge ? <span className="menu-arrow"></span> : <span className={`badge ${item.badge.variant}`}>{item.badge.text}</span>}
            </Link>
            <SimpleCollapse open={open} as="ul" classNames={`${subMenuClassNames} sub-menu`}>
                {item.children.map((child, idx) => (
                    <React.Fragment key={idx}>
                        {child.children ? (
                            <MenuItemWithChildren
                                item={child}
                                linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                                activeMenuItems={activeMenuItems}
                                subMenuClassNames="sub-menu"
                                toggleMenu={toggleMenu}
                            />
                        ) : (
                            <MenuItem
                                item={child}
                                className={activeMenuItems.includes(child.key) ? 'menuitem-active' : ''}
                                linkClassName={activeMenuItems.includes(child.key) ? 'active' : ''}
                            />
                        )}
                    </React.Fragment>
                ))}
            </SimpleCollapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }) => {
    return (
        <li className={`menu-item ${className}`}>
            <Link to={item.url} className={`menu-link side-nav-link-ref ${linkClassName}`}>
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

    const toggleMenu = useCallback((menuItem, show) => {
        if (show) {
            setActiveMenuItems([menuItem.key, ...findAllParent(menuItems, menuItem)]);
        }
    }, [menuItems]);

    const activeMenu = useCallback(() => {
        const activeItemKey = findMenuItem(menuItems, location.pathname);
        if (activeItemKey) {
            setActiveMenuItems([activeItemKey, ...findAllParent(menuItems, findMenuItem(menuItems, activeItemKey))]);
        }
    }, [location, menuItems]);

    useEffect(() => {
        activeMenu();
    }, [location, activeMenu]);

    return (
        <ul className="menu" ref={menuRef} id="main-side-menu">
            {menuItems.map((item, idx) => (
                <React.Fragment key={idx}>
                    {item.isTitle ? (
                        <li className="menu-title">{item.label}</li>
                    ) : (
                        item.children ? (
                            <MenuItemWithChildren
                                item={item}
                                toggleMenu={toggleMenu}
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
