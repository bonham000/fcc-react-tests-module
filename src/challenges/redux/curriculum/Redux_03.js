/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Define a Redux Action`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now lets learn how to update state in Redux. In Redux, all
state updates are triggered by dispatching actions. An <code>action</code> is simply a JavaScript object which contains information
about what action happened. The Redux store will receive these action objects and then update its state accordingly. Sometimes a Redux
<code>action</code> will also carry a payload of data, for example a username after a user logs in, but they don't have to. What they
must carry however is a <code>type</code> property which specifies the 'type' of action that occurred.<br><br>

Think of Redux actions as messengers that deliver information about events in your app to the Redux store. The store will then
conduct the business of updating state according to the nature of these actions.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we will write our first Redux <code>action</code>.
Its as simple as declaring an object with a type property. Declare an object named 'action' and give it a type property set to the
string 'LOGIN'.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =`// Define an action here:`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const action = {
	type: 'LOGIN'
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'An action object exists.';
	const error_2 = 'The action has a key property \'type\' with value \'LOGIN\'.';

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

	let es5, action, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return action })()`
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
		action = eval(es5)
	} catch (err) {
		console.log(err);
		passed = false;
	}
	
	// test 1:
	try {
		assert.strictEqual(typeof action, 'object', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(action.type, 'LOGIN', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
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
