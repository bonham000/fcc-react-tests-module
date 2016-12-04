/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Handle an Action in the Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now we will learn how to teach the Redux store to respond
to actions. To do this we will have to write a <code>reducer</code> function. Reducers in Redux are responsible for the state
modifications that take place in response to actions. A <code>reducer</code> will take <code>state</code> and <code>action</code>
as arguments and it will always return a new <code>state</code>. It is important to see that this is the <strong>only</strong>
role of the reducer. It has no side effects, it never calls an API endpoint, it never has any hidden surprises, it is simply a
pure function that takes state and action and returns new state.<br><br>

Another key principle in Redux is that <code>state</code> is read-only. In other words, your <code>reducer</code> must
<strong>always</strong> return a new copy of <code>state</code> and never modify state directly. Redux does not enforce state
immutability, however, we must enforce it in the code of our reducer functions. We will see a few techniques to do this as we
move forward.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've modified the previous example and provided
the scaffold of a <code>reducer</code> funciton for you. Remember that when we introduced the <code>createStore()</code> method we mentioned
that it takes a <code>reducer</code>. Here we will write that reducer so it can actually respond to actions and doesn't just return
<code>state</code> everytime like before. Fill in the body of the <code>reducer</code> function so that if it receives an action of
type 'LOGIN' it returns a state object with login set to true, and otherwise it returns the current state. Note that we are passing
in the current <code>state</code> and the dispatched <code>action</code> to the reducer so you can access the action's type directly
like this: <code>action.type</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const defaultState = {
	login: false
};

const reducer = (state = defaultState, action) => {
	// change code below this line

	// change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
	return {
		type: 'LOGIN'
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const defaultState = {
	login: false
};

const reducer = (state = defaultState, action) => {

	if (action.type === 'LOGIN') {
		return {login: true}
	}

	else {
		return state
	}

};

const store = Redux.createStore(reducer);

const loginAction = () => {
	return {
		type: 'LOGIN'
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'Calling the function loginAction returns an object with type property set to the string \'LOGIN\'.';
	const error_2 = 'The store is initialized with an object with property login set to false.';
	const error_3 = 'Dispatching loginAction updates the login property in the store\'s state to true.';

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

	let es5, reduxCode, store, loginAction, passed = true;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return {store, loginAction} })()`
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
		loginAction = reduxCode.loginAction;
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(loginAction().type, 'LOGIN', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}		
	
	// test 2:
	try {
		assert.strictEqual(store.getState().login, false, error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {

		const initialState = store.getState();
		store.dispatch(loginAction());
		const afterState = store.getState();

		assert(
			initialState.login === false &&
			afterState.login === true,
			error_3
		);

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
