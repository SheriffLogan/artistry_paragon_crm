// constants
import { LayoutTheme, LayoutDirection, LayoutWidth, TopBarTheme, SideBarTheme, SideBarType, LayoutPosition } from '../../constants/layout';

const LayoutActionTypes = {
    CHANGE_LAYOUT_THEME: '@@layout/CHANGE_LAYOUT_THEME',
    CHANGE_LAYOUT_DIRECTION: '@@layout/CHANGE_LAYOUT_DIRECTION',
    CHANGE_LAYOUT_WIDTH: '@@layout/CHANGE_LAYOUT_WIDTH',
    CHANGE_TOPBAR_THEME: '@@layout/CHANGE_TOPBAR_THEME',
    CHANGE_SIDEBAR_THEME: '@@layout/CHANGE_SIDEBAR_THEME',
    CHANGE_SIDEBAR_TYPE: '@@layout/CHANGE_SIDEBAR_TYPE',
    CHANGE_LAYOUT_POSITION: '@@layout/CHANGE_LAYOUT_POSITION',
    SHOW_RIGHT_SIDEBAR: '@@layout/SHOW_RIGHT_SIDEBAR',
    HIDE_RIGHT_SIDEBAR: '@@layout/HIDE_RIGHT_SIDEBAR',
};

const LayoutStateTypes = {
    layoutTheme: LayoutTheme.THEME_LIGHT,
    layoutDirection: LayoutDirection.LEFT_TO_RIGHT,
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
    topBarTheme: TopBarTheme.TOPBAR_LIGHT,
    sideBarTheme: SideBarTheme.LEFT_SIDEBAR_THEME_LIGHT,
    sideBarType: SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT,
    layoutPosition: LayoutPosition.POSITION_FIXED,
    isOpenRightSideBar: false
};

export { LayoutActionTypes, LayoutStateTypes };
