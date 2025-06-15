// src\redux\auth\reducers.js
import { APICore } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

const INIT_STATE = {
	user: api.getLoggedInUser(),
	users: [], // Added users to initial state
	loading: false,
};

const Auth = (state = INIT_STATE, action) => {
	switch (action.type) {
		case AuthActionTypes.API_RESPONSE_SUCCESS:
			switch (action.payload.actionType) {
				case AuthActionTypes.LOGIN_USER:
					return {
						...state,
						user: action.payload.data,
						userLoggedIn: true,
						loading: false,
					};
				case AuthActionTypes.FETCH_USERS: // Added FETCH_USERS case
					return {
						...state,
						users: action.payload.data.data, // Changed to action.payload.data.data
						loading: false,
					};
				case AuthActionTypes.SIGNUP_USER:
					return {
						...state,
						loading: false,
						userSignUp: true,
					};
				case AuthActionTypes.LOGOUT_USER:
					return {
						...state,
						user: null,
						loading: false,
						userLogout: true,
					};
				case AuthActionTypes.FORGOT_PASSWORD:
					return {
						...state,
						resetPasswordSuccess: action.payload.data,
						loading: false,
						passwordReset: true,
					};
				default:
					return { ...state };
			}

		case AuthActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case AuthActionTypes.FETCH_USERS: // Added FETCH_USERS error case
					return {
						...state,
						loading: false,
						fetchUsersError: action.payload.error,
					};
				case AuthActionTypes.LOGIN_USER:
					return {
						...state,
						error: action.payload.error,
						userLoggedIn: false,
						loading: false,
					};
				case AuthActionTypes.SIGNUP_USER:
					return {
						...state,
						registerError: action.payload.error,
						userSignUp: false,
						loading: false,
					};
				case AuthActionTypes.FORGOT_PASSWORD:
					return {
						...state,
						error: action.payload.error,
						loading: false,
						passwordReset: false,
					};
				default:
					return { ...state };
			}

		case AuthActionTypes.FETCH_USERS: // Added FETCH_USERS loading case
			return { ...state, loading: true, fetchUsersError: null };
		case AuthActionTypes.LOGIN_USER:
			return { ...state, loading: true, userLoggedIn: false };
		case AuthActionTypes.LOGOUT_USER: // Corrected: This is for initiating logout
			return { ...state, loading: true, userLogout: false };
		// The API_RESPONSE_ERROR for LOGOUT_USER is handled under the API_RESPONSE_ERROR block correctly.
		// No specific error action type for logout in the original structure, so it would fall to default or a general error.
		case AuthActionTypes.RESET:
			return {
				...state,
				loading: false,
				error: false,
				userSignUp: false,
				userLoggedIn: false,
				passwordReset: false,
				passwordChange: false,
				resetPasswordSuccess: null,
			};
		default:
			return { ...state };
	}
};

export default Auth;
