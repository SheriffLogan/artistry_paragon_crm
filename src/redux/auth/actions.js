// src/redux/auth/actions.js
// constants
import { AuthActionTypes } from './constants';

// common success
export const authApiResponseSuccess = (actionType, data) => ({
	type: AuthActionTypes.API_RESPONSE_SUCCESS,
	payload: { actionType, data },
});

// common error
export const authApiResponseError = (actionType, error) => ({
	type: AuthActionTypes.API_RESPONSE_ERROR,
	payload: {
		actionType,
		error: {
			message: error.message,
			code: error.code,
			status: error.response ? error.response.status : null,
			data: error.response ? error.response.data : null,
		},
	},
});

export const loginUser = (email, password) => ({
	type: AuthActionTypes.LOGIN_USER,
	payload: { email, password },
});

// Action to set user session data after successful login or hydration from storage
export const loginUserSuccess = (sessionData) => ({
    type: AuthActionTypes.LOGIN_USER_SUCCESS, // New action type
    payload: sessionData, // Payload will be {user, accessToken, refreshToken}
});

export const logoutUser = () => ({
	type: AuthActionTypes.LOGOUT_USER,
	payload: {},
});

export const signupUser = (fullname, email, password) => ({
	type: AuthActionTypes.SIGNUP_USER,
	payload: { fullname, email, password },
});

export const forgotPassword = (username) => ({
	type: AuthActionTypes.FORGOT_PASSWORD,
	payload: { username },
});

export const resetAuth = () => ({
	type: AuthActionTypes.RESET,
	payload: {},
});

// --- NEW USER MANAGEMENT ACTIONS ---

export const fetchUsers = () => ({
    type: AuthActionTypes.FETCH_USERS,
});

export const addUser = (userData) => ({
    type: AuthActionTypes.ADD_USER,
    payload: { userData },
});

export const updateUser = (userId, userData) => ({
    type: AuthActionTypes.UPDATE_USER,
    payload: { userId, userData },
});

export const deleteUser = (userId) => ({
    type: AuthActionTypes.DELETE_USER,
    payload: { userId },
});

export const fetchRoles = () => ({
    type: AuthActionTypes.FETCH_ROLES,
});
