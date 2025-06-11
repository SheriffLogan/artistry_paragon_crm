// src/helpers/api/auth.js
import { api } from './apiCore';
import endpoint from '../../config/endpoint';


export function login(params) {
  return api.create(endpoint.auth.login, params);
}

export function signup(params) {
  return api.create(endpoint.auth.register, params);
}

export function refreshToken(token) {
  return api.create(endpoint.auth.refresh, { refreshToken: token });
}

export function getProfile() {
  return api.get(endpoint.auth.profile);
}

/**
 * Send password-reset email
 * @param {{ email: string }} payload
 */
export function forgotPassword(payload) {
  return api.create(endpoint.auth.forgotPassword, payload)
            .then(res => res.data);
}

export function logout() {
  api.setLoggedInUser(null);
  api.setAuthorization(null);
}
