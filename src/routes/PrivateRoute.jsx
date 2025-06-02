import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const api = new APICore();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (api.isUserAuthenticated() === false) {
                    // not logged in so redirect to login page with the return url
                    return (
                        <Navigate
                            to={{
                                pathname: '/auth2/login2',
                            }}
                        />
                    );
                }

                const loggedInUser = api.getLoggedInUser();

                // check if route is restricted by role
                if (roles && roles.indexOf(loggedInUser.role) === -1) {
                    // role not authorised so redirect to login page
                    return <Navigate to={{ pathname: '/' }} />;
                }
                // authorised so return component
                return <Component {...props} />;
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
