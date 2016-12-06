/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Combine Multiple Reducers`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Lets see what happens when the state of our app
begins to grow more complex. Instead of trying to divide our state into multiple pieces, we remember the first
principle of Redux: all app state is held in a single state object in the store. Therefore, Redux provides the solution
of reducer composition to deal with a complex state model. We define multiple reducers to handle different slices of
our application's state and then we compose these reducers together into one root reducer which we feed into the Redux
<code>createStore()</code> method.<br><br>

Redux provides the method <code>combineReducers()</code> just for this purpose. Typically, it is a good practice to create
a reducer for each piece of application state which is distinct or unique in some way. For instance, in a note-taking app
with user authentication, one reducer could handle authentication while another handles the text and notes that the user is
submitting.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we've provided a <code>counterReducer()</code>
and an <code>authReducer()</code>, along with a Redux store. We've started the <code>rootReducer()</code> for you, it's your job
to finish it! The <code>combineReducers()</code> method, available on the Redux object, requires an object as an argument in which you
pass reducers mapped to property names. The names of these properties will become the names of the keys in the <code>state</code>
object for the state managed by that reducer. Lets assign our <code>counterReducer</code> to a key called <code>count</code>
and our <code>authReducer</code> to a key called <code>auth</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
	switch(action.type) {
		case INCREMENT:
			return state + 1;
		case DECREMENT:
			return state - 1;
		default:
			return state;
	}
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
	switch(action.type) {
		case LOGIN:
			return {
				authenticated: true
			}
		case LOGOUT:
			return {
				authenticated: false
			}
		default:
			return state;
	}
};

const rootReducer = // define the root reducer here

const store = Redux.createStore(rootReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
	switch(action.type) {
		case INCREMENT:
			return state + 1;
		case DECREMENT:
			return state - 1;
		default:
			return state;
	}
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
	switch(action.type) {
		case LOGIN:
			return {
				authenticated: true
			}
		case LOGOUT:
			return {
				authenticated: false
			}
		default:
			return state;
	}
};

const rootReducer = Redux.combineReducers({
	count: counterReducer,
	auth: authReducer
});

const store = Redux.createStore(rootReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The counterReducer can increment and decrement the state.';
	const error_2 = 'The authReducer can toggle the state of authenticated between true and false.';
	const error_3 = 'The store state has two keys: count which holds a number and auth which holds an object with a property of authenticated which holds a boolean.';
	const error_4 = 'The rootReducer is a function that combines the counterReducer and the authReducer.';

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
		}
	];

	let es5, reduxCode, passed = true;
	let store, rootReducer, INCREMENT, DECREMENT, LOGIN, LOGOUT;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { store, rootReducer, INCREMENT, DECREMENT, LOGIN, LOGOUT } })()`
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
		reduxCode = eval(es5);
		
		store = reduxCode.store;
		rootReducer = reduxCode.rootReducer;
		INCREMENT = reduxCode.INCREMENT;
		DECREMENT = reduxCode.DECREMENT;
		LOGIN = reduxCode.LOGIN;
		LOGOUT = reduxCode.LOGOUT;

	} catch (err) {
		passed = false;
	}

	// test 1:
	try {

		const initalState = store.getState().count;
		store.dispatch({type: INCREMENT});
		store.dispatch({type: INCREMENT});
		const firstState = store.getState().count;
		store.dispatch({type: DECREMENT});
		const secondState = store.getState().count;

		assert(
			firstState === initalState + 2 &&
			secondState === firstState - 1,
			error_1
		);

		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {

		store.dispatch({type: LOGIN});
		const loggedIn = store.getState().auth.authenticated;
		store.dispatch({type: LOGOUT});
		const loggedOut = store.getState().auth.authenticated;

		assert(
			loggedIn === true &&
			loggedOut === false,
			error_2
		);

		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {

		const state = store.getState();

		assert(
			typeof state.auth === 'object' &&
			typeof state.auth.authenticated === 'boolean' &&
			typeof state.count === 'number',
			error_3
		);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {

		const noWhiteSpace = code.replace(/\s/g,'');

		assert(
			typeof rootReducer === 'function' &&
			noWhiteSpace.includes('Redux.combineReducers'),
			error_4
		);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
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
		let __Custom__Log = []
		const message = (msg) => __Custom__Log.push(msg);
	`
	const apend = `;\n return __Custom__Log })();`
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
