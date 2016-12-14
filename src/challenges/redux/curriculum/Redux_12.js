/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Middleware to Handle Asynchronous Actions`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>So far we've avoided discussing asynchronous actions
but they are an unavoidable part of web development. Of course we will have to call asynchronous endpoints in our Redux app,
how do we handle these types of requests? Redux provides some middleware designed specifically for this purpose, Redux Thunk
middleware, to be exact. Let's briefly describe how to use this with Redux.<br><br>

To include Redux Thunk middleware, we pass it as an argument to <code>Redux.applyMiddleware()</code>, which we provide as a
second optional parameter to our <code>creatStore()</code> function. Take a look at the code in the editor to see this. Then,
to create an asynchronous action, we return a function in our action creator that takes <code>dispatch</code> as an argument.
Within this function we can dispatch actions and perform asynchronous requests.<br><br>

For instance, in this example we are going to make a pretend asynchronous request with a <code>setTimeout()</code> call.
It's common to dispatch an action before initiating any asynchronous behavior so that your application state knows that
some data is being requested (this state could display a loading icon, for instance). Then, once you receive the data,
you dispatch another action which carries the data as a payload and information that the action is completed.<br><br>

Remember how we said we're passing <code>dispatch</code> as a parameter to this special action creator? This is what we'll
use to dispatch our actions, we simply pass our action directly to dispatch and the middleware takes care of the rest.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>So in this example we just have to write both
dispatches in the <code>handleAsync()</code> action creator. Let's dispatch <code>requestingData()</code> before our
<code>setTimeout()</code> (pretend API call) and then, after we receive our (pretend) data, let's dispatch our
<code>receivedData()</code> action, passing in this data. And that's it! Now you know how to handle asynchronous actions
in Redux. Everything else continues to behave as before.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
	return function(dispatch) {
		// dispatch request action here
		setTimeout(function() {
			let data = {
				users: ['Jeff', 'William', 'Alice']
			}
			// dispatch received data action here
		}, 2500);
	}
};

const defaultState = {
	fetching: false,
	users: []
};

const asyncDataReducer = (state = defaultState, action) => {
	switch(action.type) {
		case REQUESTING_DATA:
			return {
				fetching: true,
				users: []
			}
		case RECEIVED_DATA:
			return {
				fetching: false,
				users: action.users
			}
		default:
			return state;
	}
};

const store = Redux.createStore(
	asyncDataReducer,
	Redux.applyMiddleware(ReduxThunk.default)
);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
	return function(dispatch) {
		dispatch(requestingData());
		setTimeout(function() {
			let data = {
				users: ['Jeff', 'William', 'Alice']
			}
			dispatch(receivedData(data));
		}, 2500);
	}
};

const defaultState = {
	fetching: false,
	users: []
};

const asyncDataReducer = (state = defaultState, action) => {
	switch(action.type) {
		case REQUESTING_DATA:
			return {
				fetching: true,
				users: []
			}
		case RECEIVED_DATA:
			return {
				fetching: false,
				users: action.users
			}
		default:
			return state;
	}
};

const store = Redux.createStore(
	asyncDataReducer,
	Redux.applyMiddleware(ReduxThunk.default)
);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code was transpiled successfully.';
	const error_1 = 'The requestingData action creator returns an object of type equal to the value of REQUESTING_DATA.';
	const error_2 = 'The receivedData action creator returns an object of type equal to the value of RECEIVED_DATA.';
	const error_3 = 'asyncDataReducer is a function.';
	const error_4 = 'Dispatching the requestingData action creator updates the store\'s state property of fetching to true.';
	const error_5 = 'Dispatching handleAsync dispatches the data request action and then dispatches the received data action after a delay.';

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
		}
	];

	let es5, reduxCode, passed = true;
	let REQUESTING_DATA, RECEIVED_DATA, requestingData, receivedData, handleAsync, asyncDataReducer, store;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n
		return { 
			REQUESTING_DATA,
			RECEIVED_DATA,
			requestingData,
			receivedData,
			handleAsync,
			asyncDataReducer,
			store }
		})()`
	const modifiedCode = prepend.concat(code).concat(apend);
	const shortenedTimeout = modifiedCode.replace('2500', '250');
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(shortenedTimeout, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// save the store from redux to test here
	// now you can access the redux store methods
	try {
		reduxCode = eval(es5);
		
		REQUESTING_DATA = reduxCode.REQUESTING_DATA;
		RECEIVED_DATA = reduxCode.RECEIVED_DATA;
		requestingData = reduxCode.requestingData;
		receivedData = reduxCode.receivedData;
		handleAsync = reduxCode.handleAsync;
		asyncDataReducer = reduxCode.asyncDataReducer;
		store = reduxCode.store;

	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(requestingData().type, REQUESTING_DATA, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(receivedData('data').type, RECEIVED_DATA, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(typeof asyncDataReducer, 'function', error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {

		const initialState = store.getState();
		store.dispatch(requestingData());
		const reqState = store.getState();
		
		assert(
			initialState.fetching === false &&
			reqState.fetching === true,
			error_4
		);
		
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {

		const noWhiteSpace = handleAsync.toString().replace(/\s/g,'');

		assert(
			noWhiteSpace.includes('dispatch(requestingData())') === true &&
			noWhiteSpace.includes('dispatch(receivedData(data))') === true,
			error_5
		);
		
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
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
