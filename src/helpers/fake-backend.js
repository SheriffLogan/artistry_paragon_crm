import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"; // Change this if needed

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


// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// const mock = new MockAdapter(axios);

// export function configureFakeBackend() {
// 	const users = [
// 		{
// 			id: 1,
// 			username: 'attex@coderthemes.com',
// 			password: 'attex',
// 			firstName: 'attex',
// 			lastName: 'coderthemes',
// 			role: 'Admin',
// 			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
// 		},
// 		{
// 			id: 2,
// 			username: 'test',
// 			password: 'test',
// 			firstName: 'Test',
// 			lastName: 'User',
// 			role: 'Admin',
// 			token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
// 		},
// 	];

// 	mock.onPost('/login/').reply(function (config) {
// 		return new Promise(function (resolve) {
// 			setTimeout(function () {
// 				// get parameters from post request
// 				const params = JSON.parse(config.data);

// 				// find if any user matches login credentials
// 				const filteredUsers = users.filter((user) => {
// 					return user.username === params.username && user.password === params.password;
// 				});

// 				if (filteredUsers.length) {
// 					// if login details are valid return user details and fake jwt token
// 					const user = filteredUsers[0];
// 					resolve([200, user]);
// 				} else {
// 					// else return error
// 					resolve([401, { message: 'Username or password is incorrect' }]);
// 				}
// 			}, 1000);
// 		});
// 	});

// 	mock.onPost('/register/').reply(function (config) {
// 		return new Promise(function (resolve) {
// 			setTimeout(function () {
// 				// get parameters from post request
// 				const params = JSON.parse(config.data);

// 				// add new users
// 				const [firstName, lastName] = params.fullname.split(' ');
// 				const newUser = {
// 					id: users.length + 1,
// 					username: firstName,
// 					password: params.password,
// 					firstName: firstName,
// 					lastName: lastName,
// 					role: 'Admin',
// 					token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
// 				};
// 				users.push(newUser);

// 				resolve([200, newUser]);
// 			}, 1000);
// 		});
// 	});

// 	mock.onPost('/forgot-password/').reply(function (config) {
// 		return new Promise(function (resolve) {
// 			setTimeout(function () {
// 				// get parameters from post request
// 				const params = JSON.parse(config.data);

// 				// find if any user matches login credentials
// 				const filteredUsers = users.filter((user) => {
// 					return user.username === params.username;
// 				});

// 				if (filteredUsers.length) {
// 					// if login details are valid return user details and fake jwt token
// 					const responseJson = {
// 						message: "We've sent you a link to reset password to your registered email.",
// 					};
// 					resolve([200, responseJson]);
// 				} else {
// 					// else return error
// 					resolve([
// 						401,
// 						{
// 							message: 'Sorry, we could not find any registered user with entered username',
// 						},
// 					]);
// 				}
// 			}, 1000);
// 		});
// 	});
// }
