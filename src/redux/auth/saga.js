import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

// apicore
import { api, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi } from '../../helpers/api/auth';

// actions
import { authApiResponseSuccess, authApiResponseError, fetchUsers as fetchUsersAction } from './actions';

// constants
import { AuthActionTypes } from './constants';


/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { email, password } }) {
  try {
    console.log("Saga (Login): Attempting login for email:", email);
    const response = yield call(loginApi, { email, password });
    console.log("Saga (Login): Login API Response (full):", response); // Log full response for debugging
    console.log("Saga (Login): Login API Response (data):", response.data);

    // Call setLoggedInUser with the full response.data object
    console.log("Saga (Login): Calling api.setLoggedInUser with response.data...");
    const sessionData = response.data.data;
    api.setLoggedInUser(sessionData);
    console.log("Saga (Login): api.setLoggedInUser call completed.");

    // Set the Authorization header with the accessToken
    setAuthorization(sessionData.accessToken);

    // Dispatch success to update Redux state
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, sessionData));
    console.log("Saga (Login): Login successful, Redux state dispatch initiated.");

  } catch (error) {
    console.error("Saga (Login): Login failed. Error details:", error.response ? error.response.data : error.message);
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null); // Clear session on login failure
    setAuthorization(null);
  }
}


/**
 * Logout the user
 */
function* logout() {
	try {
		yield call(logoutApi);
		api.setLoggedInUser(null);
		setAuthorization(null);
		 yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
        console.log("Saga (Logout): Logout successful. Session cleared locally.");
    } catch (error) {
        console.error("Saga (Logout): Logout failed (even if local clear worked):", error);
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { fullname, email, password } }) {
    try {
        console.log("Saga (Signup): Attempting signup...");
        const response = yield call(signupApi, { fullname, email, password });
        console.log("Saga (Signup): Signup API Response:", response.data);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, response.data));
        console.log("Saga (Signup): Signup successful.");
    } catch (error) {
        console.error("Saga (Signup): Signup failed:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    }
}

function* forgotPassword({ payload: { username } }) {
    try {
        console.log("Saga (Forgot Password): Sending reset email for:", username);
        const response = yield call(forgotPasswordApi, { username });
        console.log("Saga (Forgot Password): API Response:", response.data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
        console.log("Saga (Forgot Password): Reset email sent.");
    } catch (error) {
        console.error("Saga (Forgot Password): Failed to send reset email:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

// --- NEW USER MANAGEMENT SAGAS ---

function* fetchUsersSaga() {
    try {
        console.log("Saga (FetchUsers): Calling api.fetchUsers...");
        const response = yield call(api.fetchUsers);
        console.log("Saga (FetchUsers): API Response:", response.data.data);
        yield put(authApiResponseSuccess(AuthActionTypes.FETCH_USERS, response.data));
        console.log("Saga (FetchUsers): Successfully fetched users.");
    } catch (error) {
        console.error("Saga (FetchUsers): Failed to fetch users:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.FETCH_USERS, error));
    }
}

function* addUserSaga({ payload: { userData } }) {
    try {
        console.log("Saga (AddUser): Calling api.createUser with payload:", userData);
        const response = yield call(api.createUser, userData);
        console.log("Saga (AddUser): API Response:", response.data.data);
        yield put(authApiResponseSuccess(AuthActionTypes.ADD_USER, response.data));
        yield put(fetchUsersAction()); // Refresh the user list after adding
        console.log("Saga (AddUser): Successfully added user. Refreshing list.");
    } catch (error) {
        console.error("Saga (AddUser): Failed to add user:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.ADD_USER, error));
    }
}

function* updateUserSaga({ payload: { userId, userData } }) {
    try {
        console.log("Saga (UpdateUser): Calling api.updateUser for ID:", userId, "with payload:", userData);
        const response = yield call(api.updateUser, userId, userData);
        console.log("Saga (UpdateUser): API Response:", response.data);
        yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_USER, response.data));
        yield put(fetchUsersAction()); // Refresh the user list after updating
        console.log("Saga (UpdateUser): Successfully updated user. Refreshing list.");
    } catch (error) {
        console.error("Saga (UpdateUser): Failed to update user:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.UPDATE_USER, error));
    }
}

function* deleteUserSaga({ payload: { userId } }) {
    try {
        console.log("Saga (DeleteUser): Calling api.deleteUser for ID:", userId);
        yield call(api.deleteUser, userId);
        yield put(authApiResponseSuccess(AuthActionTypes.DELETE_USER, userId)); // Pass ID for confirmation
        yield put(fetchUsersAction()); // Refresh the user list after deleting
        console.log("Saga (DeleteUser): Successfully deleted user. Refreshing list.");
    } catch (error) {
        console.error("Saga (DeleteUser): Failed to delete user:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.DELETE_USER, error));
    }
}

function* fetchRolesSaga() {
    try {
        console.log("Saga (FetchRoles): Calling api.fetchRoles...");
        const response = yield call(api.fetchRoles);
        console.log("Saga (FetchRoles): API Response:", response.data.data);
        yield put(authApiResponseSuccess(AuthActionTypes.FETCH_ROLES, response.data.data));
        console.log("Saga (FetchRoles): Successfully fetched roles.");
    } catch (error) {
        console.error("Saga (FetchRoles): Failed to fetch roles:", error.response ? error.response.data : error.message);
        yield put(authApiResponseError(AuthActionTypes.FETCH_ROLES, error));
    }
}

export function* watchLoginUser() {
	yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
	yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup() {
	yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword() {
	yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

// --- NEW USER MANAGEMENT WATCHERS ---
export function* watchFetchUsers() {
    yield takeEvery(AuthActionTypes.FETCH_USERS, fetchUsersSaga);
}

export function* watchAddUser() {
    yield takeEvery(AuthActionTypes.ADD_USER, addUserSaga);
}

export function* watchUpdateUser() {
    yield takeEvery(AuthActionTypes.UPDATE_USER, updateUserSaga);
}

export function* watchDeleteUser() {
    yield takeEvery(AuthActionTypes.DELETE_USER, deleteUserSaga);
}

export function* watchFetchRoles() {
    yield takeEvery(AuthActionTypes.FETCH_ROLES, fetchRolesSaga);
}

function* authSaga() {
	yield all([
		fork(watchLoginUser),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchForgotPassword),
        // Fork new user management watchers
        fork(watchFetchUsers),
        fork(watchAddUser),
        fork(watchUpdateUser),
        fork(watchDeleteUser),
        fork(watchFetchRoles),
	]);
}

export default authSaga;
