//src\utils\layout.js
import { SideBarType, LayoutWidth } from '../constants/layout';

const getLayoutConfigs = (layoutWidth) => {
	// add property to change in particular layoutWidth
	const config = {
		leftSideBarTypes: SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT,
	};

	switch (layoutWidth) {
		case LayoutWidth.LAYOUT_WIDTH_FLUID:
			config.leftSideBarTypes = SideBarType.LEFT_SIDEBAR_TYPE_DEFAULT;
			break;
		case LayoutWidth.LAYOUT_WIDTH_BOXED:
			config.leftSideBarTypes = SideBarType.LEFT_SIDEBAR_TYPE_SMALL;
			break;
		default:
			return config;
	}
	return config;
};

/**
 * Changes the body attribute
 */
const changeHTMLAttribute = (attribute, value) => {
	if (document.body) document.getElementsByTagName('html')[0].setAttribute(attribute, value);
};

export { getLayoutConfigs, changeHTMLAttribute };
