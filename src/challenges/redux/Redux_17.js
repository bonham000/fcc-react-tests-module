/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Copy an Object with Object.assign`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The last several challenges worked with arrays, but there are ways to help enforce state immutability when state is an <code>object</code>, too. A useful tool for handling objects is the <code>Object.assign()</code> utility. <code>Object.assign()</code> takes a target object and source objects and maps properties from the source objects to the target object. Any matching properties are overwritten by properities in the source objects. If you write this method and pass an empty object <code>{}</code> as the first argument, the target is an empty object. Basically, you use the method to assign and return a new object. Just what you need! Here's an example:
<br><br>

<code>const newObject = Object.assign({}, obj1, obj2);</code>
<br><br>

This creates <code>newObject</code> as a new <code>object</code>, which contains the properities that currently exist in <code>obj1</code> and <code>obj2</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The Redux state and actions were modified to handle an <code>object</code> for the <code>state</code>. Edit the code to return a new <code>state</code> object for actions with type <code>ONLINE</code>, which set the <code>status</code> property to the string <code>online</code>. Try to use <code>Object.assign()</code> to complete the challenge.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ONLINE = 'ONLINE';

const defaultState = {
	user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'Free Code Camp'
};

const immutableReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ONLINE:
			return // don't mutate state here
		default:
			return state;
	}
};

const wakeUp = () => {
	return {
		type: ONLINE,
	}
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ONLINE = 'ONLINE';

const defaultState = {
	user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'Free Code Camp'
};

const immutableReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ONLINE:
			return Object.assign(
				{},
				state,
        {status: 'online'}
			);
		default:
			return state;
	}
};

const wakeUp = () => {
	return {
		type: ONLINE,
	}
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code should transpile successfully.';
	const error_1 = 'The Redux store should exist and initialize with a state that\'s an object with keys \'user\', \'status\', \'friends\', and \'community\'';
	const error_2 = 'wakeUp and immutableReducer both should be functions.';
	const error_3 = 'Dispatching an action of type \'ONLINE\' should update the property \'status\' in state to \'online\' and return a new state object.';

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

	let es5, reduxCode, passed = true;
	let store, wakeUp, defaultState, immutableReducer;

	// this code hijacks the user input to create an IIFE
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { store, defaultState, wakeUp, immutableReducer } })()`
	const modifiedCode = prepend.concat(code).concat(apend);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
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
		defaultState = reduxCode.defaultState;
		wakeUp = reduxCode.wakeUp;
		immutableReducer = reduxCode.immutableReducer;
	} catch (err) {
		passed = false;
	}

	let initialState, newState;

	// test 1:
	try {
		initialState = store.getState();
		assert(
			typeof initialState === 'object' &&
			initialState.hasOwnProperty('user') &&
			initialState.hasOwnProperty('status') &&
			initialState.hasOwnProperty('friends') &&
			initialState.hasOwnProperty('community'),
			error_1
		);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert(
			typeof wakeUp === 'function' &&
			typeof immutableReducer === 'function',
			error_2
		);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		store.dispatch({type: 'ONLINE'});
		newState = store.getState();
		assert(
			initialState.status === 'offline' &&
			newState.status === 'online',
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
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
	const apend = `; return __Custom__Log })();`
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
