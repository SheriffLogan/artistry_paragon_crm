// src\redux\auth\reducers.js
import { APICore } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

const INIT_STATE = {
	user: api.getLoggedInUser(),
	loading: false, // General loading for auth actions like login/signup
	// User Management specific states
	users: [],
	usersLoading: false,
	usersError: null,
	// Role Management specific states
	roles: [],
	rolesLoading: false,
	rolesError: null,
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
						loading: false, // Refers to login loading
					};
				case AuthActionTypes.FETCH_USERS:
					return {
						...state,
						users: action.payload.data.data,
						usersLoading: false,
						usersError: null,
					};
				case AuthActionTypes.ADD_USER:
					return {
						...state,
						// users: [...state.users, action.payload.data], // Or refetch users
						usersLoading: false,
						usersError: null,
					};
				case AuthActionTypes.UPDATE_USER:
					return {
						...state,
						// users: state.users.map(user => user.id === action.payload.userId ? action.payload.data : user), // Or refetch users
						usersLoading: false,
						usersError: null,
					};
				case AuthActionTypes.DELETE_USER:
					return {
						...state,
						// users: state.users.filter(user => user.id !== action.payload.userId), // Or refetch users
						usersLoading: false,
						usersError: null,
					};
				case AuthActionTypes.FETCH_ROLES:
					return {
						...state,
						roles: action.payload.data.data, // Assuming roles are also nested in data.data
						rolesLoading: false,
						rolesError: null,
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
						loading: false, // Refers to signup loading
						passwordReset: true,
					};
				default:
					return { ...state };
			}

		case AuthActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
				case AuthActionTypes.FETCH_USERS:
					return {
						...state,
						usersLoading: false,
						usersError: action.payload.error,
					};
				case AuthActionTypes.ADD_USER:
				case AuthActionTypes.UPDATE_USER:
				case AuthActionTypes.DELETE_USER:
					return {
						...state,
						usersLoading: false,
						usersError: action.payload.error,
					};
				case AuthActionTypes.FETCH_ROLES:
					return {
						...state,
						rolesLoading: false,
						rolesError: action.payload.error,
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
						loading: false, // Refers to login loading
						passwordReset: false,
					};
				default:
					return { ...state };
			}

		case AuthActionTypes.FETCH_USERS:
			return { ...state, usersLoading: true, usersError: null };
		case AuthActionTypes.ADD_USER:
		case AuthActionTypes.UPDATE_USER:
		case AuthActionTypes.DELETE_USER:
			return { ...state, usersLoading: true, usersError: null };
		case AuthActionTypes.FETCH_ROLES:
			return { ...state, rolesLoading: true, rolesError: null };
		case AuthActionTypes.LOGIN_USER:
			return { ...state, loading: true, userLoggedIn: false }; // Refers to login loading
		case AuthActionTypes.LOGOUT_USER:
			return { ...state, loading: true, userLogout: false }; // Refers to logout loading
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
