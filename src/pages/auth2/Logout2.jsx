import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AuthLayout2 from './AuthLayout2';
import { logoutUser } from '../../redux/actions';

const BottomLink = () => {
	return (
		<div className="text-center justify-center h-14 -mb-12">
			<p className="text-muted">
				Back to{' '}
				<Link to="/auth/login2" className="text-muted ms-1 link-offset-3">
					<b>Log In</b>
				</Link>
			</p>
		</div>
	)
}

const LogoutIcon = () => {
	return (
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 161.2 161.2" enableBackground="new 0 0 161.2 161.2" xmlSpace="preserve">
			{' '}
			<path className="path" fill="none" stroke="#0acf97" strokeMiterlimit="10" d="M425.9,52.1L425.9,52.1c-2.2-2.6-6-2.6-8.3-0.1l-42.7,46.2l-14.3-16.4 c-2.3-2.7-6.2-2.7-8.6-0.1c-1.9,2.1-2,5.6-0.1,7.7l17.6,20.3c0.2,0.3,0.4,0.6,0.6,0.9c1.8,2,4.4,2.5,6.6,1.4l34.3-32.5 C428.3,57.1,427.7,54.2,425.9,52.1z" />
			<circle className="path" fill="none" stroke="#0acf97" strokeWidth="4" strokeMiterlimit="10" cx="80.6" cy="80.6" r="62.1" />
			<polyline className="path" fill="none" stroke="#0acf97" strokeWidth="4" strokeMiterlimit="10" points="113,52.8 74.1,130.4 46.7,97.4 " />
			{' '}
		</svg>
	)
}

const Logout2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLogout } = useSelector((state) => ({
        userLogout: state.Auth.userLogout,
    }));

    useEffect(() => {
        // Dispatch the logout action when the component mounts
        console.log("Logout2.jsx: Dispatching logoutUser action.");
        dispatch(logoutUser());
    }, [dispatch]);

    useEffect(() => {
        // Redirect to login page once logout is confirmed in Redux state
        if (userLogout) {
            console.log("Logout2.jsx: Logout confirmed in Redux state, navigating to login.");
            navigate('/auth/login2', { replace: true });
        }
    }, [userLogout, navigate]);

    return (
        <>
            <AuthLayout2
                title="See You Again !"
                helpText="You are now successfully signed out."
                bottomLinks={<BottomLink />}
            >
                <div className="logout-icon my-4">
                    <LogoutIcon />
                </div>
            </AuthLayout2>
        </>
    );
};

export default Logout2;
