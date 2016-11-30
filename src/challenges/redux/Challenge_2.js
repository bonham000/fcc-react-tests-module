import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Counter with Redux`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Create a simple counter
tool using Redux. The counter should begin with an initial state of 0 and you should be able to increment
or decrement the counter with actions called 'add' and 'subtract'. Dispatching these actions against the
Redux store should increment or decrement the country, respectively. Write one reducer to handle these actions
called counterReducer`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`// Redux methods are available from a Redux object
// For example: Redux.createStore()`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

const add = () => {
	return {
      type: ADD
    }
}

const subtract = () => {
  return {
    type: SUBTRACT
  }
}

const counterReducer = (state = 0, action) => {
	switch(action.type) {
    
      case ADD:
        return state + 1;
        
      case SUBTRACT:
        return state - 1;
        
      default:
        return state;
        
    }
}

const store = Redux.createStore(
	counterReducer
)`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'There is a function with name \'add\'.'
		},
		{
			test: 2,
			status: false,
			condition: 'There is a function with name \'subtract\'.'
		},
		{
			test: 3,
			status: false,
			condition: 'The store is initialized with a state of 0.'
		},
		{
			test: 4,
			status: false,
			condition: 'Dispatching an action of type \'ADD\' against the store increments the state by 1.'
		},
		{
			test: 5,
			status: false,
			condition: 'Dispatching an action of type \'SUBTRACT\' against the store decrements the state by 1.'
		}
	];

	let es5, reduxCodeObject, passed = true;

	// this hijacks the client code to return an object
	// containing the redux store and action functions
	// to then be tested here
	const prepend = `(function() {`
	const apend = `; 
		return { add, subtract, store }})()`
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

	// evaluate Redux Code:
	try {
		reduxCodeObject = eval(es5);
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	// test 1:
	try {
		assert.strictEqual(typeof reduxCodeObject.add, 'function', 'There is a function with name \'add\'.');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(typeof reduxCodeObject.subtract, 'function', 'There is a function with name \'subtract\'.');
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}


	// test 3:
	try {
		assert.strictEqual(reduxCodeObject.store.getState(), 0, 'The store is initialized with a state of 0.');
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		reduxCodeObject.store.dispatch({ type: 'ADD' });
		assert.strictEqual(reduxCodeObject.store.getState(), 1, 'Dispatching an action of type \'ADD\' against the store increments the state by 1.');
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		reduxCodeObject.store.dispatch({ type: 'SUBTRACT' });
		assert.strictEqual(reduxCodeObject.store.getState(), 0, 'Dispatching an action of type \'SUBTRACT\' against the store decrements the state by 1.');
		testResults[5].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[5].status = false;
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
		const message = (msg) => log[log.length] = msg;
	`
	const apend = `; return log })();`
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
