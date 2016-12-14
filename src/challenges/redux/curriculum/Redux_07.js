/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use a Switch Statement to Handle Multiple Actions`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now let's see how we can handle multiple action types.
Let's say we are managing user authentication in our Redux store. Minimally, we want to have a state representation for when
users are logged in and when they are logged out. We can represent this with a single state object with property
<code>authenticated</code>. We will also need action creators that can create actions corresponding to user login and
user logout, along with the action objects themselves.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've written a store, actions, action creators, and
the scaffold of our reducer again for you. We just have to fill in our <code>reducer</code> to handle multiple authentication
actions now. Here we will use a JavaScript <code>switch</code> statement in our <code>reducer</code> to respond to different
action events. This is a standard pattern in writing Redux reducers. Write a switch statement that switches over
<code>action.type</code> and returns the appropriate authentication state.<br><br>

Note: At this point lets not worry about state immutability because our state is small and simple. For each action, you can just
return a new object, for example <code>{authenticated: true}</code>. Also, don't forget to write a <code>default</code> case in your
switch statement which just returns the current <code>state</code>. This is important because once your app has multiple reducers
they will all be run whenever an action dispatch is made, even when the action doesn't pertain to that reducer, so you want to ensure
that in cases like this you are still returning the current <code>state</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const defaultState = {
	authenticated: false
};

const authReducer = (state = defaultState, action) => {
	// change code below this line

	// change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
	return {
		type: 'LOGIN'
	}
};

const logoutUser = () => {
	return {
		type: 'LOGOUT'
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const defaultState = {
	authenticated: false
};

const authReducer = (state = defaultState, action) => {

	switch (action.type) {

		case 'LOGIN':
			return {
				authenticated: true
			}

		case 'LOGOUT':
			return {
				authenticated: false
			}

		default:
			return state;

	}

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
	return {
		type: 'LOGIN'
	}
};

const logoutUser = () => {
	return {
		type: 'LOGOUT'
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code was transpiled successfully.';
	const error_1 = 'Calling the function loginUser returns an object with type property set to the string \'LOGIN\'.';
	const error_2 = 'Calling the function logoutUser returns an object with type property set to the string \'LOGOUT\'.';
	const error_3 = 'The store is initialized with an object with property login set to false.';
	const error_4 = 'Dispatching loginUser updates the login property in the store\'s state to true.';
	const error_5 = 'Dispatching logoutUser updates the login property in the store\'s state to false.';
	const error_6 = 'The authReducer function handles multiple action types with a switch statement.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		},
		{
			test: 4,
			status: false,
			condition: error_4
		},
		{
			test: 5,
			status: false,
			condition: error_5
		},
		{
			test: 6,
			status: false,
			condition: error_6
		}
	];

	let es5, reduxCode, store, loginUser, logoutUser, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return {store, loginUser, logoutUser} })()`
	const modifiedCode = prepend.concat(code).concat(apend);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// save the store from redux to test here
	// now you can access the redux store methods
	try {
		reduxCode = eval(es5)
		store = reduxCode.store;
		loginUser = reduxCode.loginUser;
		logoutUser = reduxCode.logoutUser;		
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(loginUser().type, 'LOGIN', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}	

	// test 2:
	try {
		assert.strictEqual(logoutUser().type, 'LOGOUT', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}	
	
	// test 3:
	try {
		assert.strictEqual(store.getState().authenticated, false, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {

		const initialState = store.getState();
		store.dispatch(loginUser());
		const afterLogin = store.getState();

		assert(
			initialState.authenticated === false &&
			afterLogin.authenticated === true,
			error_4
		);

		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {

		store.dispatch(loginUser());
		const loggedIn = store.getState();
		store.dispatch(logoutUser());
		const afterLogout = store.getState();

		assert(
			loggedIn.authenticated === true &&
			afterLogout.authenticated === false,
			error_5
		);

		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;		
	}

	// test 6:
	try {
		assert(
			code.toString().includes('switch') &&
			code.toString().includes('case') &&
			code.toString().includes('default'),
			error_6);
		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}	

	return {
		passed,
		testResults
	}
	
}

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => {

	// this code modifies the user input to return all
	// console.log statements as a message array to be
	// displayed on the client UI
	const prepend = `
	(function() { 
		let log = []
		const message = (msg) => log.push(msg);
	`
	const apend = `;\n return log })();`
	const consoleReplaced = code.replace(/console.log/g, 'message');
	const hijackedCode = prepend.concat(consoleReplaced).concat(apend);
	
	let evaluatedCode;
	try {
		evaluatedCode = eval(hijackedCode);
	} catch (err) {
		console.log(err);
	}

	return evaluatedCode;

}
