//src\routes\PrivateRoute.jsx
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { api } from '../helpers/api/apiCore';

const PrivateRoute = ({ element: Component, ...rest }) => {

    const isAuthenticated = api.isUserAuthenticated();
    // In a real app, you'd also get user role from Redux here if roles prop is used

    if (!isAuthenticated) {
        // not logged in so redirect to login page
        return <Navigate to="/auth/login2" replace />;
    }

    // return (
    //     <Route
    //         {...rest}
    //         render={(props) => {
    //             if (api.isUserAuthenticated() === false) {
    //                 // not logged in so redirect to login page with the return url
    //                 return (
    //                     <Navigate
    //                         to={{
    //                             pathname: '/auth2/login2',
    //                         }}
    //                     />
    //                 );
    //             }

                // const loggedInUser = api.getLoggedInUser();

                // // check if route is restricted by role
                // if (roles && roles.indexOf(loggedInUser.role) === -1) {
                //     // role not authorised so redirect to login page
                //     return <Navigate to={{ pathname: '/' }} />;
                // }
                // // authorised so return component


                return <Component {...rest} />;
    //         }}
    //     />
    // );
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    // roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
