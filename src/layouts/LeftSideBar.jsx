import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSideBarType } from '../redux/actions';
import { SideBarType } from '../constants';
import SimpleBar from 'simplebar-react';
import AppMenu from './Menu';
import LogoBox from '../components/LogoBox';
import { getMenuItems } from '../helpers/menu'


const LeftSideBar = ({ hideLogo }) => {
    const dispatch = useDispatch();
    const { sideBarType } = useSelector(state => state.Layout.sideBarType);
    const menuNodeRef = useRef(null);
    const menuItems = getMenuItems();

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


    // const handleHoverMenu = () => {
    //     if (sideBarType === 'hover') {
    //         dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE));
    //     } else if (sideBarType === 'hover-active') {
    //         dispatch(changeSideBarType(SideBarType.LEFT_SIDEBAR_TYPE_HOVER));
    //     }
    // };

    return (
        <div className="app-menu" ref={menuNodeRef}>
            {!hideLogo && <LogoBox />}
            <button id="button-hover-toggle" className="absolute top-5 end-2 rounded-full p-1.5 z-50" onClick={handleHoverMenu}>
                <span className="sr-only">Menu Toggle Button</span>
                <i className="ri-checkbox-blank-circle-line text-xl"></i>
            </button>
            <SimpleBar className="scrollbar">
                <AppMenu menuItems={menuItems} />
            </SimpleBar>
        </div>
    );
};

export default LeftSideBar;
