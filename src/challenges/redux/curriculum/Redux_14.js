/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Never Mutate State`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>In these final challenges we will describe several methods of enforcing the key
principle of state immutability in Redux. Immutable state means that we never modify state directly, instead, we always return a new copy of state.
If you took a snapshot of the state of a Redux app over time you would see something like <code>state 1</code>, <code>state 2</code>, <code>state 3</code>
,<code>state 4</code>, <code>...</code> and so on where each state may be similar to the last but each is a distinct piece of data. This immutability, in fact,
is what provides such features as time-travel debugging that you may have heard about.<br><br>

Redux does not actively enforce state immutability in its store or reducers, however, this is up to us. Fortunately, JavaScript, especially es2015,
provides several useful tools we can use to enforce the immutability of our state, whether it is a <code>string</code>, <code>number</code>,
<code>array</code>, or <code>object</code>. We should mention here that strings and numbers are primitive values and are immutable by nature. In other
words, 3 is always 3. You cannot change the value of the number 3. An <code>array</code> or <code>object</code>, however, is mutable, and we will concern
ourselves with these data types here. In practice, your state will probably consist of an <code>array</code> or <code>object</code> as these are useful
data structures for representing many types of information.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've created a <code>store</code> and <code>reducer</code> here for managing
some to-do items. Lets finish writing the <code>ADD_TO_DO</code> case in the reducer to append a new to-do to our state. We can think of a few ways to accomplish
this with standard JavaScript or ES6. See if you can find a way to return a new array with the item from <code>action.todo</code> appended to the end.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ADD_TO_DO = 'ADD_TO_DO';

const immutableReducer = (state = ['Do not mutate state!'], action) => {
	switch(action.type) {
		case ADD_TO_DO:
			return // don't mutate state here
		default:
			return state;
	}
};

const addToDo = (todo) => {
	return {
		type: ADD_TO_DO,
		todo
	}
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD_TO_DO = 'ADD_TO_DO';

const immutableReducer = (state = ['Do not mutate state!'], action) => {
	switch(action.type) {
		case ADD_TO_DO:
			return state.concat(action.todo);
		default:
			return state;
	}
};

const addToDo = (todo) => {
	return {
		type: ADD_TO_DO,
		todo
	}
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The Redux store exists and is initialized with a state equal to [\'Don\'t mutate state!\']';
	const error_2 = 'addToDo and immutableReducer are both functions.';
	const error_3 = 'Dispatching an action of type \'ADD_TO_DO\' on the Redux store adds a todo and returns a new copy of state.';

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
	let store, addToDo, immutableReducer;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { store, addToDo, immutableReducer } })()`
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
		addToDo = reduxCode.addToDo;
		immutableReducer = reduxCode.immutableReducer;
	} catch (err) {
		passed = false;
	}

	let initialState, finalState;

	// test 1:
	try {
		initialState = store.getState();
		assert(
			Array.isArray(initialState) === true &&
			initialState[0] === 'Do not mutate state!',
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
			typeof addToDo === 'function' &&
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
		store.dispatch(addToDo('__TEST__TO__DO__'));
		finalState = store.getState();
		assert(
			initialState.length === 1 &&
			initialState[0] === 'Do not mutate state!' &&
			finalState.length === 2 &&
			finalState[0] === 'Do not mutate state!' &&
			finalState[1] === '__TEST__TO__DO__',
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
