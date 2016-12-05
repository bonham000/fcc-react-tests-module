/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Get the State of the Redux Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've created our first Redux store 
let's learn how we can retrieve the <code>state</code> of this store object. The Redux store object comes with several
methods that allow us to interact with it. One of these is <code>getState()</code> which simply returns the current state
held in the Redux store.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've re-written the previous example
more concisely. Take a look at the code and see if it makes sense. Once you're comfortable with it, add a new line which
retrieves the <code>state</code> from our <code>store</code> using <code>store.getState()</code>and logs this value
to the console. Try modifying the store's initial state and observe the result.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const store = Redux.createStore(
	(state = 5) => state
);

// Define the store here:`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const store = Redux.createStore(
	(state = 5) => state
);

console.log(store.getState());`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The redux store has a value of 5 for the initial state.';
	const error_2 = 'The console logs a message of the store\'s state using store.getState().';

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
		}
	];

	let es5, store, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return store })()`
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
		store = eval(es5)
	} catch (err) {
		passed = false;
	}
	
	// test 1:
	try {
		assert.strictEqual(store.getState(), 5, 'The redux store has a value of 5 for the state.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}


	try {

		const initialState = store.getState();

		const prepend = `
			(function() { 
				let log = []
				const message = (msg) => log.push(msg);`
		const apend = `;\n return log })();`
		const consoleReplaced = code.replace(/console.log/g, 'message');
		const hijackedCode = prepend.concat(consoleReplaced).concat(apend);

		let log = eval(hijackedCode);

		assert(
			log[0] === initialState &&
			hijackedCode.toString().includes('store.getState'),
			error_2
		);

		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
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
