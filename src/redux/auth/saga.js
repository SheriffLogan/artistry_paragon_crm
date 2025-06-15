import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi } from '../../helpers/api/auth';

// actions
import { authApiResponseSuccess, authApiResponseError, fetchUsers } from './actions'; // Added fetchUsers

// constants
import { AuthActionTypes } from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */

function* login({ payload: { email, password } }) {
  try {
    // call your new backend endpoint
    const response = yield call(loginApi, { email, password });
    // response.data = { user, accessToken, refreshToken }
    const { user, accessToken } = response.data;

    // store in session & axios header
    api.setLoggedInUser({ token: accessToken, user });
    setAuthorization(accessToken);

    // dispatch success with full payload
    yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, response.data));

  } catch (error) {
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
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
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
	}
}

function* signup({ payload: { fullname, email, password } }) {
	try {
		const response = yield call(signupApi, { fullname, email, password });
		const user = response.data;
		// api.setLoggedInUser(user);
		// setAuthorization(user['token']);
		yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
		api.setLoggedInUser(null);
		setAuthorization(null);
	}
}

function* forgotPassword({ payload: { username } }) {
	try {
		const response = yield call(forgotPasswordApi, { username });
		yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
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

function* authSaga() {
	yield all([
		fork(watchLoginUser),
		fork(watchLogout),
		fork(watchSignup),
		fork(watchForgotPassword),
		// User Management watchers
		fork(watchFetchUsers),
		fork(watchAddUser),
		fork(watchUpdateUser),
		fork(watchDeleteUser),
		fork(watchFetchRoles),
	]);
}

// Saga functions for User Management
function* fetchUsersSaga() {
	try {
		const response = yield call(api.get, '/users'); // Assuming api.get can be used directly if api.fetchUsers doesn't exist
		// console.log("Saga (FetchUsers): API Response:", response.data); // Original response.data
		yield put(authApiResponseSuccess(AuthActionTypes.FETCH_USERS, response.data)); // Pass response.data as per user's reducer structure
	} catch (error) {
		// console.error("Saga (FetchUsers): Failed to fetch users:", error.response ? error.response.data : error.message);
		yield put(authApiResponseError(AuthActionTypes.FETCH_USERS, error));
	}
}

function* addUserSaga({ payload: { userData } }) {
	try {
		const response = yield call(api.create, '/users', userData); // Assuming api.create for POST
		yield put(authApiResponseSuccess(AuthActionTypes.ADD_USER, response.data));
		yield put(fetchUsers());
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.ADD_USER, error));
	}
}

function* updateUserSaga({ payload: { userId, userData } }) {
	try {
		const response = yield call(api.update, `/users/${userId}`, userData); // Assuming api.update for PUT
		yield put(authApiResponseSuccess(AuthActionTypes.UPDATE_USER, response.data));
		yield put(fetchUsers());
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.UPDATE_USER, error));
	}
}

function* deleteUserSaga({ payload: { userId } }) {
	try {
		yield call(api.delete, `/users/${userId}`); // Assuming api.delete
		yield put(authApiResponseSuccess(AuthActionTypes.DELETE_USER, { userId }));
		yield put(fetchUsers());
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.DELETE_USER, error));
	}
}

function* fetchRolesSaga() {
	try {
		const response = yield call(api.get, '/roles'); // Assuming api.get for /roles
		// console.log("Saga (FetchRoles): API Response:", response.data); // Original response.data for roles
		yield put(authApiResponseSuccess(AuthActionTypes.FETCH_ROLES, response.data)); // Pass response.data, reducer expects .data.data
	} catch (error) {
		yield put(authApiResponseError(AuthActionTypes.FETCH_ROLES, error));
	}
}

// Watcher sagas for User Management
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

export default authSaga;
