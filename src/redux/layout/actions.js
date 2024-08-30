import { LayoutActionTypes } from './constants';

export const changeLayoutTheme = (theme) => ({
	type: LayoutActionTypes.CHANGE_LAYOUT_THEME,
	payload: theme,
});

export const changeLayoutDirection = (dir) => ({
	type: LayoutActionTypes.CHANGE_LAYOUT_DIRECTION,
	payload: dir,
});

export const changeLayoutWidth = (width) => ({
	type: LayoutActionTypes.CHANGE_LAYOUT_WIDTH,
	payload: width,
});

export const changeTopBarTheme = (theme) => ({
	type: LayoutActionTypes.CHANGE_TOPBAR_THEME,
	payload: theme,
});

export const changeSideBarTheme = (theme) => ({
	type: LayoutActionTypes.CHANGE_SIDEBAR_THEME,
	payload: theme,
});

export const changeSideBarType = (type) => ({
	type: LayoutActionTypes.CHANGE_SIDEBAR_TYPE,
	payload: type,
});

export const changeLayoutPosition = (position) => ({
	type: LayoutActionTypes.CHANGE_LAYOUT_POSITION,
	payload: position,
});

export const showRightSidebar = () => ({
	type: LayoutActionTypes.SHOW_RIGHT_SIDEBAR,
});

export const hideRightSidebar = () => ({
	type: LayoutActionTypes.HIDE_RIGHT_SIDEBAR,
});
