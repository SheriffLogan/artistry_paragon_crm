import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config';

// ✅ Set default base URL for Axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

const AUTH_SESSION_KEY = 'attex_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
	if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
	else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromCookie = () => {
	const user = sessionStorage.getItem(AUTH_SESSION_KEY);
	return user ? (typeof user === 'object' ? user : JSON.parse(user)) : null;
};

class APICore {
	/**
	 * Fetches data from given URL
	 */
	get = (url, params) => {
		if (params) {
			const queryString = Object.keys(params)
				.map((key) => key + '=' + params[key])
				.join('&');
			return axios.get(`${url}?${queryString}`);
		} else {
			return axios.get(url);
		}
	};

	getFile = (url, params) => {
		if (params) {
			const queryString = Object.keys(params)
				.map((key) => key + '=' + params[key])
				.join('&');
			return axios.get(`${url}?${queryString}`, { responseType: 'blob' });
		} else {
			return axios.get(url, { responseType: 'blob' });
		}
	};

	getMultiple = (urls, params) => {
		const reqs = [];
		let queryString = '';
		if (params) {
			queryString = Object.keys(params)
				.map((key) => key + '=' + params[key])
				.join('&');
		}

		for (const url of urls) {
			reqs.push(axios.get(`${url}?${queryString}`));
		}
		return axios.all(reqs);
	};

	/**
	 * Post given data to URL
	 */
	create = (url, data) => {
		return axios.post(url, data);
	};

	/**
	 * Updates patch data
	 */
	updatePatch = (url, data) => {
		return axios.patch(url, data);
	};

	/**
	 * Updates data
	 */
	update = (url, data) => {
		return axios.put(url, data);
	};

	/**
	 * Deletes data
	 */
	delete = (url) => {
		return axios.delete(url);
	};

	/**
	 * Post given data to URL with file
	 */
	createWithFile = (url, data) => {
		const formData = new FormData();
		for (const k in data) {
			formData.append(k, data[k]);
		}

		const config = {
			headers: {
				...axios.defaults.headers,
				'content-type': 'multipart/form-data',
			},
		};
		return axios.post(url, formData, config);
	};

	/**
	 * Updates data with file upload
	 */
	updateWithFile = (url, data) => {
		const formData = new FormData();
		for (const k in data) {
			formData.append(k, data[k]);
		}

		const config = {
			headers: {
				...axios.defaults.headers,
				'content-type': 'multipart/form-data',
			},
		};
		return axios.patch(url, formData, config);
	};

	isUserAuthenticated = () => {
		const user = this.getLoggedInUser();

		if (!user) {
			return false;
		}
		// const decoded = jwtDecode(user.token);
		// const currentTime = Date.now() / 1000;
		// if (decoded.exp < currentTime) {
		// 	console.warn('Access token expired');
		// 	return false;
		// } else {
		// 	return true;
		// }
		return true;
	};

	setLoggedInUser = (session) => {
		if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
		else {
			sessionStorage.removeItem(AUTH_SESSION_KEY);
		}
	};

	/**
	 * Returns the logged-in user
	 */
	getLoggedInUser = () => {
		return getUserFromCookie();
	};

	setUserInSession = (modifiedUser) => {
		const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
		if (userInfo) {
			const { token, user } = JSON.parse(userInfo);
			this.setLoggedInUser({ token, ...user, ...modifiedUser });
		}
	};
}

/*
✅ Check if token is available in session
*/
const user = getUserFromCookie();
if (user) {
	const { token } = user;
	if (token) {
		setAuthorization(token);
	}
}

export { APICore, setAuthorization };
