/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use the Spread Operator on Arrays`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>One solution from ES6 which finds many applications in enforcing state immutability in Redux
is the spread operator <code>...</code>. The spread operator has a variety of applications, one of which is suited well to our previous challenge of producing
a new array from an existing array. Since this is relatively new but commonly used syntax, let's take a look at how it works here. If we have an array <code>myArray</code>
and we write:<br><br>

<code>let newArray = [...myArray]</code><br><br>

<code>newArray</code> is now a clone of <code>myArray</code>. Both still exist separately in memory. If we perform a mutation like <code>newArray.push(5)</code>,
<code>myArray</code> will not be effectively. The <code>...</code> effectively <i>spreads</i> out the values in <code>myArray</code> into a new array. To clone
an array but add additional values in new array you could write <code>[...myArray, 'new value']</code> which would return a new array composed of the values in
<code>myArray</code> and the string <code>'new value'</code>. The spread syntax can be use multiple times in array composition like this, but it's important to note
that it only makes a shallow copy of the array. That is to say, it only provides immutable array operations for one-dimensional arrays.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Use the spread operator to return a new copy of state when a to-do is added.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const immutableReducer = (state = ['Do not mutate state!'], action) => {
	switch(action.type) {
		case 'ADD_TO_DO':
			return // don't mutate state here
			
		default:
			return state;
	}
};

const addToDo = (todo) => {
	return {
		type: 'ADD_TO_DO',
		todo
	}
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const immutableReducer = (state = ['Do not mutate state!'], action) => {
	switch(action.type) {
		case 'ADD_TO_DO':
			return [...state, action.todo];
		default:
			return state;
	}
};

const addToDo = (todo) => {
	return {
		type: 'ADD_TO_DO',
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
	const error_4 = 'The spread operator is used to return new state.';

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
		console.log(err);
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
		console.log(err);
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
		console.log(err);
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
		console.log(err);
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
		console.log(err);
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert.strictEqual(code.includes('...state'), true, error_4);
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
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
