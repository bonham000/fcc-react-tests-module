/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use the ES6 Spread Operator with Objects`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>Object.assign()</code> method will serve well for most operations on objects
you will encounter in Redux and it has been standardized as a part of es2015. There is another syntax that may become standardized in a future version of
JavaScript which we will introduce here. It is the spread operator applied to objects. This is currently a proposed language feature and we can take advantage
of it through transpilation with Babel. We've enabled it here for you to test out.<br><br>

The object spread operator allows us to spread out object properties much like when we used the spread operator to spread out array values. So let's say we
have the following object:<br><br>

<code>
const user = {<br>
		&nbsp;&nbsp;authenticated: true<br>
		&nbsp;&nbsp;username: Jeff<br>
}<br><br>
</code>

Now if we write the following:<br><br>

<code>
const updatedUser = {<br>
		&nbsp;&nbsp;...user,<br>
		&nbsp;&nbsp;authenticated: false<br>
}<br><br>
</code>

Our <code>updatedUser</code> object will be equal to the following:<br><br>

<code>
{<br>
		&nbsp;&nbsp;username: Jeff<br>
		&nbsp;&nbsp;authenticated: false<br>
}<br><br>
</code>

We've 'spread' the <code>user</code> object properties into a new object and then added our new properties. Similarly to <code>Object.assign()</code>, properities with
matching names will be overwritten. The proposed object spread syntax provides a very concise way to return new objects from existing objects, especially if
we are interested in just modifying a few keys. Note that the ordering of keys in the examples above is not important because
JavaScript objects are unordered collections of properties. This syntax is encounted quite often, so it's good to be familiar with
even if you don't use it yourself.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided the same example from the last lesson. Use the object spread operator to
return a new state object when the <code>ONLINE</code> action is dispatched.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const defaultState = {
	user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'Free Code Camp'
};

const immutableReducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'ONLINE':
			return // don't mutate state here
		default:
			return state;
	}
};

const wakeUp = () => {
	return {
		type: 'ONLINE',
	}
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const defaultState = {
	user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'Free Code Camp'
};

const immutableReducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'ONLINE':
			return { ...state, status: 'online' };
		default:
			return state;
	}
};

const wakeUp = () => {
	return {
		type: 'ONLINE',
	}
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code was transpiled successfully.';
	const error_1 = 'The Redux store exists and is initialized with a state an object with keys \'user\', \'status\', \'friends\', and \'community\'';
	const error_2 = 'wakeUp and immutableReducer are both functions.';
	const error_3 = 'Dispatching an action of type \'ONLINE\' updates the property \'status\' in state to \'online\' and returns a new state object.';

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
