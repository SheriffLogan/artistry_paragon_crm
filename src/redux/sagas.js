//src\redux\sagas.js
import { all, fork } from 'redux-saga/effects'

import authSaga from './auth/saga'

export default function* rootSaga() {
	yield all([
		fork(authSaga),
	])
}
