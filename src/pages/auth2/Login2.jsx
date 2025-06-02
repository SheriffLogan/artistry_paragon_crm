import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout2 from './AuthLayout2';
import { useEffect } from 'react';


// components
import { FormInput, VerticalForm } from '../../components';

// redux
import { loginUser } from '../../redux/actions';

/**
 * Form validator
 */
const schemaResolver = yupResolver(
    yup.object().shape({
        username: yup.string().required('Please enter email address'),
        password: yup.string().required('Please enter Password'),
    })
);

const BottomLink = () => {
    return (
        <footer className="text-center justify-center h-14 -mb-12">
            <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/auth/register2" className="text-gray-500 ms-1">
                    <b>Sign Up</b>
                </Link>
            </p>
        </footer>
    );
};

const Login2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, userLoggedIn } = useSelector((state) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        if (userLoggedIn) {
        navigate('/dashboard/overview', { replace: true });
        }
    }, [userLoggedIn, navigate]);

    /**
     * handle form submission
     */
    const onSubmit = ({ username, password }) => {
        dispatch(loginUser(username, password))
    };

    return (
        <>
            <AuthLayout2 title="Sign In" helpText="Enter your email address and password to access account." hasThirdPartyLogin bottomLinks={<BottomLink />}>
             {error && <div className="text-red-500 mb-4">{error.message}</div>}
                <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{ username: 'admin@paragon.com', password: 'admin123' }}>
                    <FormInput label="Email address" labelClassName="font-semibold text-gray-500" type="email" className="form-input" name="username" placeholder={'Enter your email'} containerClass="mb-6 space-y-2" />

                    <FormInput label={'Password'} type="password" name="password" labelClassName="font-semibold text-gray-500" className="form-input rounded-e-none" placeholder={'Enter your password'} containerClass={'mb-6 space-y-2'} labelContainerClassName="flex justify-between items-center mb-2">
                        <Link to="/auth/recover-password2" className="text-muted text-xs">
                            Forgot your password?
                        </Link>
                    </FormInput>

                    <FormInput label="Remember me" labelClassName="ms-2 text-sm font-medium" type="checkbox" name="checkbox" className="form-checkbox rounded text-primary" containerClass={'mb-6'} labelContainerClassName="flex items-center" />
                    <div className=" text-center">
                        <button className="btn bg-primary text-white w-full" type="submit" disabled={loading}>
                            <i className="ri-login-box-line me-1"></i> Log In{' '}
                        </button>
                    </div>
                </VerticalForm>
            </AuthLayout2>
        </>
    );
};

export default Login2;
