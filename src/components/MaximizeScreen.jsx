import { useEffect } from 'react';

const MaximizeScreen = () => {
	useEffect(() => {
		const elem = document.querySelector('.maximize-icon');
		if (elem) elem.setAttribute('data-toggle', 'fullscreen');
		return () => {
			if (elem) elem.removeAttribute('data-toggle');
		};
	}, []);

	/*
	 * toggle full screen mode
	 */
	const toggleFullScreen = () => {
		const doc = document;
		const docEl = doc.documentElement;

		const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullscreen || docEl.msRequestFullscreen;
		const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		doc.body.classList.add('fullscreen-enable');

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}

		const exitHandler = () => {
			if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
				doc.body.classList.remove('fullscreen-enable');
			}
		};

		doc.addEventListener('fullscreenchange', exitHandler);
		doc.addEventListener('webkitfullscreenchange', exitHandler);
		doc.addEventListener('mozfullscreenchange', exitHandler);
		doc.addEventListener('msfullscreenchange', exitHandler);
	};

	return (
		<button data-toggle="fullscreen" type="button" className="nav-link p-2" onClick={toggleFullScreen}>
			<span className="sr-only">Fullscreen Mode</span>
			<span className="flex items-center justify-center">
				<i className="ri-fullscreen-line text-2xl"></i>
			</span>
		</button>
	);
};

export default MaximizeScreen;
