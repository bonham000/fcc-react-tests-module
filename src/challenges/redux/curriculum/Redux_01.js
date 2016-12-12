/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Redux Store`

export const challengeText = `<span class = 'default'>Intro: </span>Redux is a state management framework which can be used
with React, but it was not designed for use with React. It can be used with other frameworks as well.

In Redux, there is a single state object responsible for the entire state of your application. This means if you had a React app
with ten components and all of these had their own local state the entire state of your app would still be defined only
by a single state object housed in the Redux <code>store</code>. This is the first important principle to understand when learning
Redux: the Redux store is the single source of truth when it comes to application state.<br><br>

This also means that whenever any piece of your app wants to update state it <strong>must</strong> do so through the Redux store.
This unidirectional data flow makes it easier to reason about state management for you app. Here, we will get started by creating
our first Redux store.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The Redux <code>store</code> is an object
which holds and manages application <code>state</code>. Redux provides a method, <code>createStore()</code>, which we can use to
create the Redux <code>store</code>. This method takes a <code>reducer</code> function as a required argument. We'll learn
more about these <code>reducer</code> functions later. Here we have defined this <code>reducer</code> for you.
It simply takes <code>state</code> as an argument and returns <code>state</code>.
Note: We are using ES6 default argument syntax to initialize this state to hold a value of <code>5</code>.<br><br>

Now, declare a <code>store</code> variable and assign it to the <code>createStore()</code> method, passing in the <code>reducer</code>
as an argument.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const reducer = (state = 5) => {
	return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const reducer = (state = 5) => {
	return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:

const store = Redux.createStore(reducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, store, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The redux store exists.'
		},
		{
			test: 2,
			status: false,
			condition: 'The redux store has a value of 5 for the state.'
		}
	]

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
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
	try {
		store = eval(es5)
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(typeof store.getState, 'function', 'The redux store exists.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(store.getState(), 5, 'The redux store has a value of 5 for the state.');
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

// liveRender modifies console.log in user input and returns message data
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

