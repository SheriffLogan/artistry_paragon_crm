//src\helpers\api\apiCore.js
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config';
import endpoint from '../../config/endpoint'

// ✅ Set default base URL for Axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL || endpoint.base_url;

const AUTH_SESSION_KEY = 'attex_user';

/**
 * Sets the default authorization header for Axios.
 * @param {string | null} token - The access token string, or null to clear.
 */
export const setAuthorization = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log("APICore: Authorization Header Set. Token prefix: Bearer.");
    } else {
        delete axios.defaults.headers.common['Authorization'];
        console.log("APICore: Authorization Header Cleared.");
    }
};

// Helper to get user data from session storage
const getUserSessionFromStorage = () => { // Renamed for clarity (not just "Cookie")
    try {
        const userString = sessionStorage.getItem(AUTH_SESSION_KEY);
        console.log("APICore (getUserSessionFromStorage): Attempting to get from sessionStorage. Key:", AUTH_SESSION_KEY, "Raw string:", userString ? userString.substring(0, 100) + "..." : "null"); // Log first 100 chars

        if (userString) {
            const parsedSession = JSON.parse(userString);
            console.log("APICore (getUserSessionFromStorage): Parsed session object:", parsedSession);

            // Validate the parsed session object structure
            if (parsedSession && typeof parsedSession === 'object' && parsedSession.accessToken && parsedSession.user) {
                console.log("APICore (getUserSessionFromStorage): Session is valid and complete.");
                return parsedSession; // Return the entire session object { token, user }
            } else {
                console.warn("APICore (getUserSessionFromStorage): Retrieved session data is incomplete or malformed. Clearing sessionStorage.", parsedSession);
                sessionStorage.removeItem(AUTH_SESSION_KEY);
            }
        } else {
            console.log("APICore (getUserSessionFromStorage): No data found for key:", AUTH_SESSION_KEY);
        }
    } catch (e) {
        console.error("APICore (getUserSessionFromStorage): ERROR parsing session data from sessionStorage. Clearing. Error:", e);
        sessionStorage.removeItem(AUTH_SESSION_KEY); // Clear corrupt data
    }
    return null;
};

/**
 * Stores the user session object in sessionStorage.
 * @param {object | null} session - The session object { accessToken: string, refreshToken: string, user: object }. Pass null to clear.
 */
const setUserSessionInStorage = (session) => { // Renamed for clarity
    try {
        console.log("APICore (setUserSessionInStorage): Attempting to set session. Input session:", session);
        if (session && typeof session === 'object' && session.accessToken && session.user) {
            const sessionString = JSON.stringify(session);
            sessionStorage.setItem(AUTH_SESSION_KEY, sessionString);
            console.log("APICore (setUserSessionInStorage): SUCCESS! Session stored. Key:", AUTH_SESSION_KEY, "Value length:", sessionString.length, "Value (truncated):", sessionString.substring(0, 100) + "...");
            const storedValue = sessionStorage.getItem(AUTH_SESSION_KEY);
            console.log("APICore (setUserSessionInStorage): IMMEDIATE CHECK: Stored value exists?", !!storedValue);
        } else if (session === null) {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
            console.log("APICore (setUserSessionInStorage): Session cleared from sessionStorage.");
        } else {
            console.warn("APICore (setUserSessionInStorage): Invalid session data provided. Session NOT stored. Clearing existing if any. Input:", session);
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    } catch (e) {
        console.error("APICore (setUserSessionInStorage): ERROR stringifying or storing session data. Clearing. Error:", e, "Input session:", session);
        sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
};

class APICore {
    constructor() {
        this.initInterceptors();
    }

    // Initialize Axios interceptors
    initInterceptors() {
        // Request interceptor: attach access token before sending request
        axios.interceptors.request.use(
            (reqConfig) => {
                const session = getUserSessionFromStorage();
                if (session && session.accessToken) {
                    reqConfig.headers.Authorization = `Bearer ${session.accessToken}`;
                    console.log(`Axios Interceptor: Attaching token to request for ${reqConfig.url}`);
                }
                return reqConfig;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor: handle token refresh on 401 Unauthorized
        axios.interceptors.response.use(
            (response) => response, // Pass through successful responses
            async (error) => {
                const originalRequest = error.config;
                // If 401 and not already retrying a refresh token request
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true; // Mark request as retried
                    console.warn("Axios Interceptor: 401 Unauthorized detected. Attempting token refresh.");

                    const session = getUserSessionFromStorage();
                    if (session && session.refreshToken) {
                        try {
                            const refreshResponse = await axios.post(endpoint.auth.refresh, { // Use endpoint for refresh
                                refreshToken: session.refreshToken
                            });

                            const newSessionData = refreshResponse.data.data; // Assuming refresh response also has nested 'data'
                            console.log("Axios Interceptor: Token refresh successful. New session data:", newSessionData);

                            // Update session in storage and Axios header
                            setUserSessionInStorage(newSessionData);
                            setAuthorization(newSessionData.accessToken);

                            // Retry original request with new token
                            originalRequest.headers['Authorization'] = `Bearer ${newSessionData.accessToken}`;
                            console.log("Axios Interceptor: Retrying original request with new token.");
                            return axios(originalRequest); // Re-run the original request

                        } catch (refreshError) {
                            console.error("Axios Interceptor: Token refresh failed or backend returned error:", refreshError.response ? refreshError.response.data : refreshError.message);
                            // If refresh fails, log out the user
                            console.log("Axios Interceptor: Refresh failed. Logging out user.");
                            this.setLoggedInUser(null); // Clear session
                            setAuthorization(null); // Clear header
                            window.location.href = '/auth/login2'; // Redirect to login
                            return Promise.reject(refreshError);
                        }
                    } else {
                        console.warn("Axios Interceptor: 401 Unauthorized, but no refresh token available. Logging out user.");
                        this.setLoggedInUser(null);
                        setAuthorization(null);
                        window.location.href = '/auth/login2';
                    }
                }
                return Promise.reject(error); // For other errors, or if refresh failed/was not attempted
            }
        );
    }

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

	// isUserAuthenticated = () => {
	// 	const user = this.getLoggedInUser();

	// 	if (!user) {
	// 		console.log("isUserAuthenticated: User session or token is missing.");
	// 		return false;
	// 	}
	// 	// Optional: JWT token expiration check (if jwt-decode is used)
    //     // try {
    //     //     const decoded = jwtDecode(user.token);
    //     //     const currentTime = Date.now() / 1000;
    //     //     if (decoded.exp < currentTime) {
    //     //         console.warn('Access token expired');
    //     //         return false;
    //     //     }
    //     // } catch (e) {
    //     //     console.error("Error decoding JWT:", e);
    //     //     return false;
    //     // }
	// 	console.log("isUserAuthenticated: User is authenticated.");
	// 	return true;
	// };

	isUserAuthenticated = () => {
        const userSession = getUserSessionFromStorage(); // Get the full session object
        const isAuthenticated = !!(userSession && userSession.accessToken && userSession.user);
        console.log("APICore (isUserAuthenticated): Overall authentication status:", isAuthenticated);
        if (!isAuthenticated) {
            console.log("APICore (isUserAuthenticated): Reason for unauthenticated: Session missing, token missing, or user object missing from session.");
        }
        return isAuthenticated;
    };

    // setLoggedInUser = (session) => {
    //     try {
    //         console.log("APICore (setLoggedInUser): Attempting to set session. Input session:", session);
    //         if (session && typeof session === 'object' && session.accessToken && session.user) {
    //             const sessionString = JSON.stringify(session);
    //             sessionStorage.setItem(AUTH_SESSION_KEY, sessionString);
    //             console.log("APICore (setLoggedInUser): SUCCESS! Session stored. Key:", AUTH_SESSION_KEY, "Value length:", sessionString.length, "Value (truncated):", sessionString.substring(0, 100) + "...");
    //             // IMMEDIATELY CHECK IF IT WAS STORED
    //             const storedValue = sessionStorage.getItem(AUTH_SESSION_KEY);
    //             console.log("APICore (setLoggedInUser): IMMEDIATE CHECK: Stored value exists?", !!storedValue);
    //         } else if (session === null) {
    //             sessionStorage.removeItem(AUTH_SESSION_KEY);
    //             console.log("APICore (setLoggedInUser): Session cleared from sessionStorage.");
    //         } else {
    //             console.warn("APICore (setLoggedInUser): Invalid session data provided. Session NOT stored. Clearing existing if any. Input:", session);
    //             sessionStorage.removeItem(AUTH_SESSION_KEY);
    //         }
    //     } catch (e) {
    //         console.error("APICore (setLoggedInUser): ERROR stringifying or storing session data. Clearing. Error:", e, "Input session:", session);
    //         sessionStorage.removeItem(AUTH_SESSION_KEY);
    //     }
    // };

	setLoggedInUser = (session) => { // This is used by saga to store the initial login session
        setUserSessionInStorage(session); // Delegate to the storage utility
    };
	
	/**
	 * Returns the logged-in user
	 */
	getLoggedInUser = () => {
        const user = getUserSessionFromStorage();
        console.log("getLoggedInUser: Retrieved from session:", user);
        return user;
    };

	// setUserInSession = (modifiedUser) => {
	// 	const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
	// 	if (userInfo) {
	// 		const { token, user } = JSON.parse(userInfo);
	// 		this.setLoggedInUser({ token, ...user, ...modifiedUser });
	// 	}
	// };
	// --- NEW API METHODS FOR USER AND ROLE MANAGEMENT ---

    /**
     * Fetches all users
     */
    fetchUsers = () => {
		console.log(`API Call: GET ${endpoint.users.list}`);
        return this.get(endpoint.users.list);
    };

    /**
     * Fetches a single user by ID
     */
    fetchUserById = (id) => {
		console.log(`API Call: GET <span class="math-inline">\{endpoint\.users\.getOne\}</span>{id}`);
        return this.get(`${endpoint.users.getOne}${id}`);
    };

    /**
     * Creates a new user
     */
    createUser = (userData) => {
		console.log(`API Call: POST ${endpoint.users.create}`, userData);
        return this.create(endpoint.users.create, userData);
    };

    /**
     * Updates an existing user
     */
    updateUser = (id, userData) => {
        console.log(`API Call: PATCH <span class="math-inline">\{endpoint\.users\.update\}</span>{id}`, userData);
        return this.update(`${endpoint.users.update}${id}`, userData);
    };

    /**
     * Deletes a user
     */
    deleteUser = (id) => {
        console.log(`API Call: DELETE <span class="math-inline">\{endpoint\.users\.remove\}</span>{id}`);
        return this.delete(`${endpoint.users.remove}${id}`);
    };

    /**
     * Fetches all roles
     */
    fetchRoles = () => {
        console.log(`API Call: GET ${endpoint.roles.list}`);
        return this.get(endpoint.roles.list);
    };

}

/*
✅ Check if token is available in session
*/
// const user = getUserFromCookie();
// if (user) {
// 	const { token } = user;
// 	if (token) {
// 		setAuthorization(token);
// 	}
// }

// Create and export a single instance of APICore
const api = new APICore();
export { api };
