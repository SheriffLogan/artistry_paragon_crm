/**
 * Pass ID of Element to Dismiss
 * @param {string} eleId
 */
const handleDismiss = (eleId) => {
	const element = document.getElementById(eleId);
	if (element) {
		element.classList.add('hidden');
	}
}

export default handleDismiss;
