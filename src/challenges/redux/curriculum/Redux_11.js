/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Send Action Data to the Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>By now we've learned how we can dispatch actions
to our Redux store, but so far these actions have not contained any information other than a <code>type</code>. It's
not hard to send specific data along with your actions. Let's learn how to do that here. In fact, this is very common because
usually actions are originating from some user interaction and tend to carry some data with them. The Redux store will often
need to know about this data.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined a basic <code>notesReducer()</code>
here and an <code>addNoteText()</code> action creator. Finish the body of the <code>addNoteText()</code> function so that it returns
an <code>action</code> object which includes a <code>type</code> like we're used to, but let's also pass in a property of
<code>text</code> set to the <code>note</code> data we pass into the action creator. When we call the action creator, we'll
pass in specific note information that we can access like this.<br><br>

Next, finish writing the <code>switch</code> statement in the <code>notesReducer()</code>. We need to add a case that handles
our <code>addNoteText()</code> actions. This case should be triggered whenever there is an action of type <code>ADD_NOTE</code>
and it should just return the text property on the incoming <code>action</code> as the new <code>state</code>.<br><br>

We've dispatched the action at the bottom of the code. Once you're finished run the code and watch the console. That's it!
That's all it takes to send action-specific data to the store and use it when you update store <code>state</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
	switch(action.type) {
		// change code below this line

		// change code above this line
		default:
			return state;
	}
};

const addNoteText = (note) => {
	// change code below this line

	// change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
	switch(action.type) {
		// change code below this line
		case ADD_NOTE:
			return action.text;
		// change code above this line
		default:
			return state;
	}
};

const addNoteText = (note) => {
	// change code below this line
	return {
		type: ADD_NOTE,
		text: note
	}
	// change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello Redux!'));
console.log(store.getState());`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The action creator addNoteText returns an object with keys \'type\' and \'text\'.';
	const error_2 = 'Dispatching an action of type \'ADD_NOTE\' with the addNoteText action creator updates the state to the string passed to the action creator.';

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

	let es5, reduxCode, passed = true;
	let store, notesReducer, addNoteText, ADD_NOTE;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { store, notesReducer, addNoteText, ADD_NOTE } })()`
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
		notesReducer = reduxCode.notesReducer;
		addNoteText = reduxCode.addNoteText;
		ADD_NOTE = reduxCode.ADD_NOTE;

	} catch (err) {
		passed = false;
	}

	// test 1:
	try {

		const addNoteFn = addNoteText('__TEST__NOTE');

		assert(
			addNoteFn.type === ADD_NOTE &&
			addNoteFn.text === '__TEST__NOTE',
			error_1
		);

		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		const initialState = store.getState();
		store.dispatch(addNoteText('__TEST__NOTE'));
		const newState = store.getState();

		assert(
			initialState !== newState &&
			newState === '__TEST__NOTE',
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
