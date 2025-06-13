// src/components/LeftSideBar.jsx
import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSideBarType } from '../redux/actions';
import { SideBarType } from '../constants';
import SimpleBar from 'simplebar-react';
import AppMenu from './Menu';
import LogoBox from '../components/LogoBox';
import { getMenuItems } from '../helpers/menu'


const LeftSideBar = ({ hideLogo, userRoleName }) => {
    const dispatch = useDispatch();
    const { sideBarType } = useSelector(state => state.Layout.sideBarType);
    const menuNodeRef = useRef(null);
    // const menuItems = getMenuItems();
    const allMenuItems = getMenuItems();

    useEffect(() => {
        if (sideBarType === 'hover' || sideBarType === 'hover-active') {
            document.body.classList.add('sidebar-hover');
        } else {
            document.body.classList.remove('sidebar-hover');
        }
    }, [sideBarType]);

    const handleHoverMenu = () => {
        if (sideBarType === 'hover') {
            dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE));
        } else if (sideBarType === 'hover-active') {
            dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_HOVER));
        }
    };


    // Filter menu items based on user's role
    const filterMenuByRole = useCallback((items) => {
        return items.filter(item => {
            // If the item has no specific roles defined, it's visible to all authenticated users
            if (!item.roles || item.roles.length === 0) {
                // If it's a title, or a non-linkable parent, show it if any of its children are visible.
                if (item.isTitle || !item.url) {
                    return item.children ? filterMenuByRole(item.children).length > 0 : true;
                }
                return true;
            }
            // If the item has roles, check if the user's role is included
            const isVisible = item.roles.includes(userRoleName);

            // If it's a parent, also check if any of its children are visible
            if (item.children) {
                const visibleChildren = filterMenuByRole(item.children);
                return isVisible || visibleChildren.length > 0;
            }
            return isVisible;
        });
    }, [userRoleName]); // Recalculate if userRoleName changes

    const filteredMenuItems = filterMenuByRole(allMenuItems);
    // console.log("LeftSideBar: Filtered Menu Items for role", userRoleName, ":", filteredMenuItems);

    return (
        <div className="app-menu" ref={menuNodeRef}>
            {!hideLogo && <LogoBox />}
            <button id="button-hover-toggle" className="absolute top-5 end-2 rounded-full p-1.5 z-50" onClick={handleHoverMenu}>
                <span className="sr-only">Menu Toggle Button</span>
                {/* <i className="ri-checkbox-blank-circle-line text-xl"></i> */}
                <span className="flex items-center justify-center">
                    <i className="ri-menu-2-fill text-2xl"></i>
                </span>
            </button>
            <SimpleBar className="menu-inner disable-scrollbar">
                <AppMenu menuItems={filteredMenuItems} />
            </SimpleBar>
        </div>
    );
};

export default LeftSideBar;
