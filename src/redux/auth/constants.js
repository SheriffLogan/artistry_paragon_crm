// src/redux/auth/constants.js
const AuthActionTypes = {
	API_RESPONSE_SUCCESS: '@@auth/API_RESPONSE_SUCCESS',
	API_RESPONSE_ERROR: '@@auth/API_RESPONSE_ERROR',

	LOGIN_USER: '@@auth/LOGIN_USER',
	LOGIN_USER_SUCCESS: '@@auth/LOGIN_USER_SUCCESS', // New action type for successful login
	LOGOUT_USER: '@@auth/LOGOUT_USER',
	SIGNUP_USER: '@@auth/SIGNUP_USER',
	FORGOT_PASSWORD: '@@auth/FORGOT_PASSWORD',
	FORGOT_PASSWORD_CHANGE: '@@auth/FORGOT_PASSWORD_CHANGE',

	// User Management Actions (NEW)
    FETCH_USERS: '@@auth/FETCH_USERS',
    ADD_USER: '@@auth/ADD_USER',
    UPDATE_USER: '@@auth/UPDATE_USER',
    DELETE_USER: '@@auth/DELETE_USER',
    FETCH_ROLES: '@@auth/FETCH_ROLES', // For roles dropdown

	RESET: '@@auth/RESET',
};

export { AuthActionTypes };
