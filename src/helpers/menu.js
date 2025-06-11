//src\helpers\menu.js
import { MENU_ITEMS } from '../constants/menu';

const getMenuItems = () => {
	// NOTE - You can fetch from server and return here as well
	return MENU_ITEMS;
};

/**
 * Finds a menu item by its URL or key.
 * @param {Array} menuItems - The array of menu items.
 * @param {string} urlToMatch - The URL to match.
 * @returns {string | null} The key of the matching menu item or null.
 */
 const findMenuItem = (menuItems, urlToMatch) => {
    if (!menuItems || typeof urlToMatch !== 'string') return null;

    // Normalize the URL to match by removing trailing slash if not root
    const normalizedUrlToMatch = urlToMatch.endsWith('/') && urlToMatch !== '/'
                                 ? urlToMatch.slice(0, -1)
                                 : urlToMatch;

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        // Normalize the item's URL for comparison
        const normalizedItemUrl = item.url && item.url.endsWith('/') && item.url !== '/'
                                  ? item.url.slice(0, -1)
                                  : item.url;

        if (normalizedItemUrl === normalizedUrlToMatch) {
            return item; // Return the full item object
        }
        if (item.children) {
            const foundInChild = findMenuItem(item.children, urlToMatch);
            if (foundInChild) {
                return foundInChild; // Return the found child item
            }
        }
    }
    return null;
};

/**
 * Finds all parent keys for a given menu item.
 * @param {Array} menuItems - The array of all menu items.
 * @param {object} menuItem - The actual menu item object (returned by findMenuItem).
 * @param {Array} parents - Accumulator for parent keys (internal).
 * @returns {Array} An array of parent keys.
 */
const findAllParent = (allMenuItems, menuItemOrKey, parents = []) => {
        // If menuItemOrKey is a string, find the actual menu item object first
    const menuItem = typeof menuItemOrKey === 'string'
                     ? findMenuItemByKey(allMenuItems, menuItemOrKey) // Use findMenuItemByKey
                     : menuItemOrKey;

    if (!allMenuItems || !menuItem || !menuItem.parentKey) {
        return parents;
    }

    // Find the actual parent menu item object using its key from the ENTIRE menu structure
    const parent = allMenuItems.find(i => i.key === menuItem.parentKey);

    if (parent) {
        parents.push(parent.key); // Add the parent's key to the list
        // Recursively find the parent's parents
        return findAllParent(allMenuItems, parent, parents);
    }
    return parents;
};

const findMenuItemByKey = (menuItems, keyToMatch) => {
    if (!menuItems || typeof keyToMatch !== 'string') return null;

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        if (item.key === keyToMatch) {
            return item;
        }
        if (item.children) {
            const foundInChild = findMenuItemByKey(item.children, keyToMatch);
            if (foundInChild) {
                return foundInChild;
            }
        }
    }
    return null;
};


export { getMenuItems, findAllParent, findMenuItem, findMenuItemByKey };
