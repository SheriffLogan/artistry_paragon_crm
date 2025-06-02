import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

// apicore
import { APICore, setAuthorization } from '../../helpers/api/apiCore';

// helpers
import { login as loginApi, logout as logoutApi, signup as signupApi, forgotPassword as forgotPasswordApi } from '../../helpers/api/auth';

// actions
import { authApiResponseSuccess, authApiResponseError } from './actions';

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
	yield all([fork(watchLoginUser), fork(watchLogout), fork(watchSignup), fork(watchForgotPassword)]);
}

export default authSaga;
