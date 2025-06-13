// src/layouts/Vertical.jsx
import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useSelector, useDispatch } from 'react-redux';
import { changeHTMLAttribute } from '../utils';
import { changeSideBarType } from '../redux/actions';
import { Preloader } from '../components';
import useViewPort from '../hooks/useViewPort';

// code splitting and lazy loading
const Topbar = React.lazy(() => import('./Topbar'));
const LeftSideBar = React.lazy(() => import('./LeftSideBar'));
const Footer = React.lazy(() => import('./Footer'));
const RightSideBar = React.lazy(() => import('./RightSideBar'));

const loading = () => <div />;

const VerticalLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { width } = useViewPort();

    const { layoutTheme, layoutDirection, layoutWidth, topBarTheme, sideBarTheme, sideBarType, layoutPosition } = useSelector((state) => ({
        layoutType: state.Layout.layoutType,
        layoutDirection: state.Layout.layoutDirection,
        layoutTheme: state.Layout.layoutTheme,
        layoutWidth: state.Layout.layoutWidth,
        topBarTheme: state.Layout.topBarTheme,
        sideBarTheme: state.Layout.sideBarTheme,
        sideBarType: state.Layout.sideBarType,
        layoutPosition: state.Layout.layoutPosition,
        isOpenRightSideBar: state.Layout.isOpenRightSideBar,
    }));

    // Get user role from Redux state for menu filtering
    const userRoleName = useSelector(state => state.Auth.user?.role?.name);
    

    useEffect(() => {
        changeHTMLAttribute('data-mode', layoutTheme);
    }, [layoutTheme]);

    useEffect(() => {
        changeHTMLAttribute('dir', layoutDirection);
    }, [layoutDirection]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-width', layoutWidth);
    }, [layoutWidth]);

    useEffect(() => {
        changeHTMLAttribute('data-topbar-color', topBarTheme);
    }, [topBarTheme]);

    useEffect(() => {
        changeHTMLAttribute('data-menu-color', sideBarTheme);
    }, [sideBarTheme]);

    useEffect(() => {
        changeHTMLAttribute('data-sidenav-view', sideBarType);
    }, [sideBarType]);

    useEffect(() => {
        changeHTMLAttribute('data-layout-position', layoutPosition);
    }, [layoutPosition]);

    useEffect(() => {
        document.getElementsByTagName('html')[0].removeAttribute('data-layout');
    }, []);

    useEffect(() => {
        if (width < 768) {
            dispatch(changeSideBarType('LEFT_SIDEBAR_TYPE_MOBILE'));
        } else if (width < 1140) {
            dispatch(changeSideBarType('LEFT_SIDEBAR_TYPE_SMALL'));
        } else if (width >= 1140) {
            dispatch(changeSideBarType('LEFT_SIDEBAR_TYPE_DEFAULT'));
        }
    }, [width, dispatch]);

    const isCondensed = sideBarType === 'LEFT_SIDEBAR_TYPE_SMALL';
    const isLight = sideBarTheme === 'LEFT_SIDEBAR_THEME_LIGHT';

    
    return (
        <>
            <Suspense fallback={loading()}>
                <div className="flex wrapper">
                    <Suspense fallback={loading()}>
                        <LeftSideBar isCondensed={isCondensed} isLight={isLight} hideUserProfile={true} userRoleName={userRoleName} />
                    </Suspense>

                    <div className="page-content">
                        <Suspense fallback={loading()}>
                            <Topbar />
                        </Suspense>

                        <main className="p-6">
                            <Suspense fallback={<Preloader />}>{children}</Suspense>
                        </main>

                        <Footer />
                    </div>
                </div>

                <Suspense fallback={loading()}>
                    <RightSideBar />
                </Suspense>
            </Suspense>
        </>
    );
};

VerticalLayout.propTypes = {
    children: PropTypes.node,
};

export default VerticalLayout;
