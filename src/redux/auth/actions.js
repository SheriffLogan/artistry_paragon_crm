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

export const loginUser = (username, password) => ({
	type: AuthActionTypes.LOGIN_USER,
	payload: { username, password },
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
