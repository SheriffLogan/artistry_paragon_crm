import axios from 'axios';

// const API_URL = "https://hootmonk-backend.vercel.app"; // Change this if needed
const API_URL = "http://localhost:3000"; // Change this if needed

const users = [
    {
        id: 1,
        username: 'attex@coderthemes.com',
        password: 'attex',
        firstName: 'attex',
        lastName: 'coderthemes',
        role: 'Admin',
        token: 'dummy-jwt-token-1',
    },
    {
        id: 2,
        username: 'test',
        password: 'test',
        firstName: 'Test',
        lastName: 'User',
        role: 'Admin',
        token: 'dummy-jwt-token-2',
    },
];

/**
 * Configures the fake backend.
 * This function is used to initialize the backend logic with in-memory users.
 */
export function configureFakeBackend() {
    console.log("Fake backend configured.");
}

/**
 * Login function
 */
export const loginUser = async (username, password) => {
    try {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            return { status: 200, data: user };
        } else {
            return { status: 401, data: { message: 'Username or password is incorrect' } };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
};

/**
 * Register function
 */
export const registerUser = async (fullname, password) => {
    try {
        const [firstName, lastName] = fullname.split(' ');
        const newUser = {
            id: users.length + 1,
            username: firstName,
            password,
            firstName,
            lastName,
            role: 'Admin',
            token: 'dummy-jwt-token-' + (users.length + 1),
        };

        users.push(newUser);
        return { status: 200, data: newUser };
    } catch (error) {
        console.error('Register error:', error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
};

/**
 * Forgot Password function
 */
export const forgotPassword = async (username) => {
    try {
        const user = users.find(user => user.username === username);
        if (user) {
            return { status: 200, data: { message: "We've sent you a link to reset password to your registered email." } };
        } else {
            return { status: 401, data: { message: 'Sorry, we could not find any registered user with entered username' } };
        }
    } catch (error) {
        console.error('Forgot Password error:', error);
        return { status: 500, data: { message: 'Internal Server Error' } };
    }
};