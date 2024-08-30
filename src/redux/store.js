import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// reducers
import Layout from './layout/reducers';
import Auth from './auth/reducers';

// saga
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// mount it on the store
export const store = configureStore({
	reducer: {
		Auth: Auth,
		Layout: Layout,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

// run the saga
sagaMiddleware.run(rootSaga);
