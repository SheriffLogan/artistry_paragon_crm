import { useDispatch, useSelector } from 'react-redux'
import { changeLayoutDirection, changeLayoutPosition, changeLayoutTheme, changeLayoutWidth, changeSideBarTheme, changeSideBarType, changeTopBarTheme } from '../../redux/actions'

// constants
import * as layoutConstants from '../../constants/layout'
import LayoutTheme from './LayoutTheme'
import LayoutDirection from './LayoutDirection'
import LayoutWidth from './LayoutWidth'
import SideBarType from './SideBarType'
import SideBarTheme from './SideBarTheme'
import TopBarTheme from './TopBarTheme'
import LayoutPosition from './LayoutPosition'
import SimpleBar from 'simplebar-react'

const ThemeCustomizer = ({ handleRightSideBar, rightBarNodeRef }) => {
    const dispatch = useDispatch()

    const { layoutTheme, layoutDirection, layoutWidth, topBarTheme, sideBarTheme, sideBarType, layoutPosition } = useSelector((state) => ({
        layoutTheme: state.Layout.layoutTheme,
        layoutDirection: state.Layout.layoutDirection,
        layoutWidth: state.Layout.layoutWidth,
        topBarTheme: state.Layout.topBarTheme,
        sideBarTheme: state.Layout.sideBarTheme,
        sideBarType: state.Layout.sideBarType,
        layoutPosition: state.Layout.layoutPosition,
        isOpenRightSideBar: state.Layout.isOpenRightSideBar,
    }))

    const handleChangeLayoutTheme = (value) => {
        switch (value) {
            case 'dark':
                dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_DARK))
                break
            default:
                dispatch(changeLayoutTheme(layoutConstants.LayoutTheme.THEME_LIGHT))
                break
        }
    }

    const handleChangeLayoutDirection = (value) => {
        switch (value) {
            case 'rtl':
                dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.RIGHT_TO_LEFT))
                break
            default:
                dispatch(changeLayoutDirection(layoutConstants.LayoutDirection.LEFT_TO_RIGHT))
                break
        }
    }

    const handleChangeLayoutWidth = (value) => {
        switch (value) {
            case 'boxed':
                dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_BOXED))
                break
            default:
                dispatch(changeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID))
                break
        }
    }

    const handleChangeTopBarTheme = (value) => {
        switch (value) {
            case 'dark':
                dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_DARK))
                break
            case 'brand':
                dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_BRAND))
                break
            default:
                dispatch(changeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_LIGHT))
                break
        }
    }

    const handleChangeSideBarTheme = (value) => {
        switch (value) {
            case 'dark':
                dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK))
                break
            case 'brand':
                dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_BRAND))
                break
            default:
                dispatch(changeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT))
                break
        }
    }

    const handleChangeSideBarType = (value) => {
        switch (value) {
            case 'hover':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVER))
                break
            case 'hover-active':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HOVERACTIVE))
                break
            case 'sm':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_SMALL))
                break
            case 'md':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_COMPACT))
                break
            case 'mobile':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_MOBILE))
                break
            case 'hidden':
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_HIDDEN))
                break
            default:
                dispatch(changeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT))
                break
        }
    }

    const handleChangeLayoutPosition = (value) => {
        switch (value) {
            case 'scrollable':
                dispatch(changeLayoutPosition(layoutConstants.LayoutPosition.POSITION_SCROLLABLE))
                break
            default:
                dispatch(changeLayoutPosition(layoutConstants.LayoutPosition.POSITION_FIXED))
                break
        }
    }

    const reset = () => {
        handleChangeLayoutTheme(layoutConstants.LayoutTheme.THEME_LIGHT)
        handleChangeLayoutDirection(layoutConstants.LayoutDirection.LEFT_TO_RIGHT)
        handleChangeLayoutWidth(layoutConstants.LayoutWidth.LAYOUT_WIDTH_FLUID)
        handleChangeSideBarType(layoutConstants.SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT)
        handleChangeSideBarTheme(layoutConstants.SideBarTheme.LEFT_SIDEBAR_THEME_DARK)
        handleChangeTopBarTheme(layoutConstants.TopBarTheme.TOPBAR_LIGHT)
        handleChangeLayoutPosition(layoutConstants.LayoutPosition.POSITION_FIXED)
    }

    return (
        <>
            <div ref={rightBarNodeRef} className="h-[70px] flex items-center text-white bg-primary px-6 gap-3">
                <h5 className="text-base flex-grow">Theme Settings</h5>
                <button type="button" onClick={handleRightSideBar}>
                    <i className="ri-close-line text-xl" />
                </button>
            </div>

            <SimpleBar className="h-[calc(100vh-134px)]">
                <div className="p-5">
                    <LayoutTheme handleChangeLayoutTheme={handleChangeLayoutTheme} layoutTheme={layoutTheme} layoutConstants={layoutConstants.LayoutTheme} />

                    <LayoutDirection handleChangeLayoutDirection={handleChangeLayoutDirection} layoutDirection={layoutDirection} layoutConstants={layoutConstants.LayoutDirection} />

                    <LayoutWidth handleChangeLayoutWidth={handleChangeLayoutWidth} layoutWidth={layoutWidth} layoutConstants={layoutConstants.LayoutWidth} />

                    <SideBarType handleChangeSideBarType={handleChangeSideBarType} sideBarType={sideBarType} layoutConstants={layoutConstants.SideBarType} />

                    <SideBarTheme handleChangeSideBarTheme={handleChangeSideBarTheme} sideBarTheme={sideBarTheme} layoutConstants={layoutConstants.SideBarTheme} />

                    <TopBarTheme handleChangeTopBarTheme={handleChangeTopBarTheme} topBarTheme={topBarTheme} layoutConstants={layoutConstants.TopBarTheme} />

                    <LayoutPosition handleChangeLayoutPosition={handleChangeLayoutPosition} layoutPosition={layoutPosition} layoutConstants={layoutConstants.LayoutPosition} />
                </div>
            </SimpleBar>

            <div className="h-16 p-4 flex items-center gap-4 border-t border-gray-300 dark:border-gray-600 px-6">
                <button type="button" className="btn bg-primary text-white w-1/2" id="reset-layout" onClick={() => reset()}>
                    Reset
                </button>
                <button type="button" className="btn bg-light text-dark dark:text-light dark:bg-opacity-10 w-1/2">
                    Buy Now
                </button>
            </div>
        </>
    )
}

export default ThemeCustomizer
