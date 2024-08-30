import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// All layouts containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from '.';
import { APICore } from '../helpers/api/apiCore';

const AllRoutes = (props) => {
	const { Layout } = useSelector((state) => ({
		Layout: state.Layout,
	}));

	const api = new APICore();

	return (
		<React.Fragment>
			<Routes>
				<Route>
					{publicProtectedFlattenRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<DefaultLayout {...props} layout={Layout}>
									{route.element}
								</DefaultLayout>
							}
							key={idx}
						/>
					))}
					;
				</Route>

				<Route>
					{authProtectedFlattenRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								api.isUserAuthenticated() === false ? (
									<Navigate
										to={{
											pathname: '/auth/login',
											search: 'next=' + route.path,
										}}
									/>
								) : (
									<VerticalLayout {...props}>{route.element}</VerticalLayout>
								)
							}
							key={idx}
						/>
					))}
					;
				</Route>
			</Routes>
		</React.Fragment>
	);
};

export default AllRoutes;
