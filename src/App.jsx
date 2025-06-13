//src\App.jsx
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'; // Keep useDispatch if used for initial auth check

import AllRoutes from './routes/Routes'

// Your authentication actions (ensure correct path based on your setup)
import { authApiResponseSuccess } from './redux/auth/actions';
import { AuthActionTypes } from './redux/auth/constants';
import { api, setAuthorization } from './helpers/api/apiCore'; // Assuming api instance is exported here
import { loginUserSuccess } from './redux/auth/actions';


// styles
import 'gridjs/dist/theme/mermaid.min.css'
import './index.scss'

// This component (AppContent) is just for the initial auth check
// and renders your main routing logic.
const App = () => {
    const dispatch = useDispatch();
    const { userLoggedIn, user, accessToken, refreshToken } = useSelector(state => state.Auth);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // This useEffect runs once on mount to check initial auth status
        const session = api.getLoggedInUser(); // Get the full session from storage

        if (session && session.user && session.accessToken) {
            // If session found in storage, update Redux state to reflect logged-in status
            // This is crucial for Redux to be in sync with sessionStorage on page load/refresh
            console.log("App.jsx: Session found in storage. Updating Redux state.");
            dispatch(loginUserSuccess(session)); // Assuming loginUserSuccess action updates user, accessToken, refreshToken, and sets userLoggedIn: true
            setAuthorization(session.accessToken); // Ensure Axios default header is set
        } else {
            console.log("App.jsx: No valid session found in storage.");
            // Ensure Redux state is cleared if no valid session
            // This might be redundant if reducer's INIT_STATE handles it, but good for clarity
            dispatch(loginUserSuccess(null)); // Or a specific action to clear auth state
        }
        setIsAuthReady(true); // Mark authentication system as ready

    }, [dispatch]); // Depend only on dispatch

    if (!isAuthReady) {
        // Show a loading spinner or splash screen while auth status is being determined
        console.log("App.jsx: Auth not ready, rendering preloader...");
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center text-gray-700 dark:text-gray-300">
                    <p className="text-xl font-semibold">Loading Application...</p>
                    {/* You can add a more visually appealing spinner here */}
                    <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            {/* Pass the auth ready state to Routes if needed, though Routes will check api.isUserAuthenticated() */}
            <AllRoutes isAuthReady={isAuthReady} />
        </React.Fragment>
    );
};


// const App = () => {
// 	return (
// 	<React.Fragment>
//       <AppContent />
//     </React.Fragment>
// 	)
// }

export default App
