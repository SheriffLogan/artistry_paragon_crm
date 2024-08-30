import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params) {
	const baseUrl = '/login/';
	return api.create(`${baseUrl}`, params);
}

function logout() {
	const baseUrl = '/logout/';
	return api.create(`${baseUrl}`, {});
}

function signup(params) {
	const baseUrl = '/register/';
	return api.create(`${baseUrl}`, params);
}

function forgotPassword(params) {
	const baseUrl = '/forgot-password/';
	return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
