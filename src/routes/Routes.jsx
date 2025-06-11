//src\routes\Routes.jsx
import React, {useEffect} from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// All layouts containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from '.';
import { api } from '../helpers/api/apiCore';

const AllRoutes = (props) => {
    const location = useLocation(); // Get current location
	const { layout } = useSelector((state) => ({
		layout: state.Layout, // Access full layout state for properties
	}));

	const { userLoggedIn, user } = useSelector(state => state.Auth);
    const userRoleName = user?.role?.name; // Get user role from Redux state


    // const userRoleName = useSelector(state => state.Auth.user?.role?.name);

	// const { Layout } = useSelector((state) => ({
	// 	Layout: state.Layout,
	// }));

	// const { user } = useSelector((state) => state.Auth); // Get user from Auth reducer


    useEffect(() => {
        // Log authentication status when component mounts or state changes
        console.log(`Routes.jsx - Current User: ${user ? user.email : 'null'}`);
        console.log(`Routes.jsx - Is Authenticated (Redux): ${userLoggedIn}`);
        console.log(`Routes.jsx - User Role Name: ${userRoleName}`);
    }, [userLoggedIn, user, userRoleName]); // Re-run when these change

	return (
		<React.Fragment>
			<Routes>
				<Route>
					{publicProtectedFlattenRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								userLoggedIn && route.path.startsWith('/auth')
									? <Navigate to="/dashboard/overview" replace />
									: <DefaultLayout {...props} layout={layout}>
										{route.element}
									</DefaultLayout>
							}
							key={idx}
						/>
					))}
					
				</Route>

				<Route>
					{authProtectedFlattenRoutes.map((route, idx) => {
						// Check if user is authenticated
						const isAuthenticated = userLoggedIn;
						const isAuthorized = route.roles ? route.roles.includes(userRoleName) : true; // No roles means accessible to all authenticated

						console.log(`Routes.jsx: Checking route: ${route.path}`);
						console.log(`Routes.jsx:   - IsAuthenticated: ${isAuthenticated}`);
						console.log(`Routes.jsx:   - User Role: ${userRoleName}`);
						console.log(`Routes.jsx:   - Required Roles: ${route.roles ? route.roles.join(', ') : 'None'}`);
						console.log(`Routes.jsx:   - IsAuthorized: ${isAuthorized}`);

						let element;
						if (isAuthenticated && isAuthorized) {
							element = <VerticalLayout {...props}>{route.element}</VerticalLayout>;
							console.log(`Routes.jsx: Access granted for ${route.path} (Authenticated, Role Matched)`);
						} else if (isAuthenticated && !isAuthorized) {
							// Authenticated but not authorized for this specific route
							console.log(`Routes.jsx: Redirecting to /auth/login2 from ${route.path} (Authenticated but Unauthorized)`);
							element = <Navigate to="/auth/login2" replace />; // Redirect to login, or a 403 page
						} else {
							// Not authenticated
							console.log(`Routes.jsx: Redirecting to /auth/login2 from ${route.path} (Not Authenticated)`);
							element = <Navigate to="/auth/login2" replace state={{ from: location.pathname }} />;
						}

						return (
							<Route
								key={idx}
								path={route.path}
								element={element}
							/>
						);
					})}
				</Route>
			</Routes>
		</React.Fragment>
	);
};

export default AllRoutes;
