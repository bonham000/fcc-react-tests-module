/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Register a Store Listener`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Another method we have access to on the Redux
<code>store</code> object is <code>store.subscribe()</code>. This allows us to subscribe listener functions to the
store which will be called whenever an action is dispatched against the store. One simple use for this method is
to subscribe a function to your store which simply logs out a message everytime an action is received and the
store is updated. Let's do that here.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Write the <code>store.subscribe()</code>
method, passing in a function which logs a message to the console everytime the store receives an action. You'll see that
we are then calling <code>store.dispatch()</code> three times in a row, each time directly passing in an action object.
Set up your listener function and then watch the console as your code runs.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ADD = 'ADD';

const reducer = (state = 0, action) => {
	switch(action.type) {
		case ADD:
			return state + 1;
		default:
			return state;
	}
};

const store = Redux.createStore(reducer);

// change code below this line

// change code above this line

store.dispatch({type: ADD});
store.dispatch({type: ADD});
store.dispatch({type: ADD});`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD = 'ADD';

const reducer = (state = 0, action) => {
	switch(action.type) {
		case ADD:
			return state + 1;
		default:
			return state;
	}
};

const store = Redux.createStore(reducer);

// change code below this line

store.subscribe( () => 
	console.log('Received an action, state updated: ' + store.getState())
);

// change code above this line

store.dispatch({type: ADD});
store.dispatch({type: ADD});
store.dispatch({type: ADD});`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'Dispatching the ADD action on the store increments the state by 1.';
	const error_2 = 'There is a listener function subscribed to the store using store.subscribe().';
	const error_3 = 'An action of type ADD is dispatched three times and a message is logged to the console on each dispatch';

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
		}
	];

	let es5, reduxCode, store, ADD, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { store, ADD } })()`
	const modifiedCode = prepend.concat(code).concat(apend);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	// save the store from redux to test here
	// now you can access the redux store methods
	try {
		reduxCode = eval(es5)
		store = reduxCode.store;
		ADD = reduxCode.ADD
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {

		const initialState = store.getState();
		store.dispatch({type: ADD});
		const newState = store.getState();

		assert.strictEqual(newState, initialState + 1, error_1);

		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {

		const noWhiteSpace = code.replace(/\s/g,'');

		assert.strictEqual(noWhiteSpace.includes('store.subscribe'), true, error_2);

		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {

		const prepend = `
			(function() { 
				let log = []
				const message = (msg) => log.push(msg);
			`
		const apend = `; return log })();`
		const consoleReplaced = code.replace(/console.log/g, 'message');
		const hijackedCode = prepend.concat(consoleReplaced).concat(apend);

		const log = eval(hijackedCode);

		assert.strictEqual(log.length, 3, error_3);

		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;
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
