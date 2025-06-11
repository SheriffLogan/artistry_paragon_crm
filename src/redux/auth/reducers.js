// src/redux/auth/reducers.js
// apicore
import { api } from '../../helpers/api/apiCore';
import { setAuthorization } from '../../helpers/api/apiCore';

// constants
import { AuthActionTypes } from './constants';


const INIT_STATE = {
	user: null, // This will contain user data including role after login
    accessToken: null, // Extract accessToken
    refreshToken: null, // Extract refreshToken
	loading: false,
	error: null, // General error state
    // Auth specific states
	userLoggedIn: false,
	userSignUp: false,
	userLogout: false,
	resetPasswordSuccess: null,
	passwordReset: false,
    registerError: null,
    // User Management specific states (NEW)
    users: [],
    roles: [],
    usersLoading: false,
    usersError: null,
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
						user: action.payload.data.user, // Assuming login returns user object
                        accessToken: action.payload.data.accessToken, // Store accessToken
                        refreshToken: action.payload.data.refreshToken, // Store refreshToken
						userLoggedIn: true,
						loading: false,
						error: null,
					};
                // ADD THIS NEW CASE
                case AuthActionTypes.LOGIN_USER_SUCCESS: // Handles session hydration from storage
                    if (action.payload) {
                        return {
                            ...state,
                            user: action.payload.user,
                            accessToken: action.payload.accessToken,
                            refreshToken: action.payload.refreshToken,
                            userLoggedIn: true,
                            loading: false,
                            error: null,
                        };
                    } else { // Case for clearing session
                        return {
                            ...state,
                            user: null,
                            accessToken: null,
                            refreshToken: null,
                            userLoggedIn: false,
                            loading: false,
                            error: null,
                        };
                    }
                // END NEW CASE
				case AuthActionTypes.SIGNUP_USER:
					return {
						...state,
						loading: false,
						userSignUp: true,
						error: null,
					};
				case AuthActionTypes.LOGOUT_USER:
					return {
						...state,
						user: null,
						accessToken: null,
                        refreshToken: null,
						loading: false,
						userLogout: true,
						error: null,
					};
				case AuthActionTypes.FORGOT_PASSWORD:
					return {
						...state,
						resetPasswordSuccess: action.payload.data,
						loading: false,
						passwordReset: true,
						error: null,
					};
					// NEW USER MANAGEMENT SUCCESS CASES
                case AuthActionTypes.FETCH_USERS:
                    return {
                        ...state,
                        users: action.payload.data,
                        usersLoading: false,
                        usersError: null,
                    };
                case AuthActionTypes.ADD_USER:
                    return {
                        ...state,
                        usersLoading: false, // Assuming this is a success after add
                        usersError: null,
                        // Optionally add the new user to the list if backend returns it
                        // users: [...state.users, action.payload.data],
                    };
                case AuthActionTypes.UPDATE_USER:
                    return {
                        ...state,
                        usersLoading: false, // Assuming this is a success after update
                        usersError: null,
                        // Optionally update the user in the list
                        // users: state.users.map(u => u.id === action.payload.data.id ? action.payload.data : u),
                    };
                case AuthActionTypes.DELETE_USER:
                    return {
                        ...state,
                        usersLoading: false, // Assuming this is a success after delete
                        usersError: null,
                        // Optionally remove the user from the list
                        // users: state.users.filter(u => u.id !== action.payload.data.id),
                    };
                case AuthActionTypes.FETCH_ROLES:
                    return {
                        ...state,
                        roles: action.payload.data,
                        rolesLoading: false,
                        rolesError: null,
                    };
				default:
					return { ...state };
			}

		case AuthActionTypes.API_RESPONSE_ERROR:
			switch (action.payload.actionType) {
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
				// NEW USER MANAGEMENT ERROR CASES
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
                        usersError: action.payload.error, // Use a specific error state for CRUD ops
                    };
                case AuthActionTypes.FETCH_ROLES:
                    return {
                        ...state,
                        rolesLoading: false,
                        rolesError: action.payload.error,
                    };
				case AuthActionTypes.LOGOUT_USER:
                    // If logout API fails, still clear local session for user experience
                    api.setLoggedInUser(null);
                    setAuthorization(null);
                    return {
                        ...state,
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        loading: false,
                        userLogout: true,
                        userLoggedIn: false,
                        error: action.payload.error,
                    };
				default:
					return { ...state };
			}

		// --- Loading actions ---
        case AuthActionTypes.LOGIN_USER:
            return { ...state, loading: true, userLoggedIn: false, error: null };
        case AuthActionTypes.LOGOUT_USER:
            return { ...state, loading: true, userLogout: false, error: null };
        case AuthActionTypes.SIGNUP_USER:
            return { ...state, loading: true, userSignUp: false, registerError: null };
        case AuthActionTypes.FORGOT_PASSWORD:
            return { ...state, loading: true, passwordReset: false, resetPasswordSuccess: null, error: null };

        // NEW USER MANAGEMENT REQUEST CASES
        case AuthActionTypes.FETCH_USERS:
            return { ...state, usersLoading: true, usersError: null };
        case AuthActionTypes.ADD_USER:
        case AuthActionTypes.UPDATE_USER:
        case AuthActionTypes.DELETE_USER:
            return { ...state, usersLoading: true, usersError: null }; // Use a loading state for CRUD ops
        case AuthActionTypes.FETCH_ROLES:
            return { ...state, rolesLoading: true, rolesError: null };

		// case AuthActionTypes.RESET:
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		userLoggedIn: false,
		// 		userSignUp: false,
		// 		userLogout: false,
		// 		resetPasswordSuccess: null,
		// 		passwordReset: false,
        //         error: null,
        //         registerError: null,
        //         usersLoading: false,
        //         usersError: null,
        //         rolesLoading: false,
        //         rolesError: null,
		// 	};
		case AuthActionTypes.RESET:
            return { ...INIT_STATE, user: null, accessToken: null, refreshToken: null, userLoggedIn: false };
		default:
			return { ...state };
	}
};

export default Auth;
