/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Map Dispatch to Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now we will map dispatch to props with
<code>mapDispatchToProps()</code>. This is how we will provide specific action creators to our React components so they
can dispatch actions against our Redux store. <code>mapDispatchToProps()</code> is very similiar in structure to
<code>mapStateToProps()</code>. It also returns an object where you map dispatch actions to property names which will
become component <code>props</code>. Instead of returning a piece of <code>state</code>, however, we will return a
function which calls <code>dispatch</code> and passes in our action creator and any relevant action data. We have access
to this <code>dispatch</code> because we pass it in to <code>mapDispatchToProps()</code> as a parameter when we define
the function, just like we pass <code>state</code> to <code>mapStateToProps()</code>. Behind the scenes, React-Redux
is using Redux's <code>store.dispatch()</code> to conduct these dispatches with <code>mapDispatchToProps()</code>,
just like it is using <code>store.subscribe()</code> for components that we have mapped <code>state</code> to.<br><br>

To give an example, let's say we have a <code>loginUser()</code> action creator which takes a <code>username</code>
as an action payload. The object returned from <code>mapDispatchToProps()</code> for this action creator would look
something like:<br><br>
<code>
{<br>
	&nbsp; submitLoginUser: function(username) {<br>
		&nbsp;&nbsp;&nbsp; dispatch(loginUser(username));<br>
	&nbsp; }<br>
}<br>
</code>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>To use <code>mapDispatchToProps()</code>
we will need to have our action creator <code>addMessage()</code>. We've provided it here. Write a function
<code>mapDispatchToProps()</code> which takes <code>dispatch</code> as an argument and returns an object where you assign
the dispatch function to a property <code>submitNewMessage</code>. This property will be assigned as the <code>props</code> of our
React component, so we can name it anything. Let's call this one <code>submitNewMessage</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const addMessage = (message) => {
	return {
    type: 'ADD',
    message: message
  }
};

// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const addMessage = (message) => {
	return {
    type: 'ADD',
    message: message
  }
};

// change code below this line

const mapDispatchToProps = (dispatch) => {
  return {
  	submitNewMessage: function(message) {
  		dispatch(addMessage(message));
  	}
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code was transpiled successfully.';
	const error_1 = 'addMessage returns an object with keys \'type\' and \'message\'.';
	const error_2 = 'mapDispatchToProps is a function.';
	const error_3 = 'mapDispatchToProps returns an object.';
	const error_4 = 'Dispatching addMessage with submitNewMessage from mapDispatchToProps returns a message to the dispatch function.';

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
	let addMessage, mapDispatchToProps;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { addMessage, mapDispatchToProps } })()`
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

		addMessage = reduxCode.addMessage;
		mapDispatchToProps = reduxCode.mapDispatchToProps;

	} catch (err) {
		passed = false;
	}

	// test 1:
	try {

		let addMessageTest = addMessage();
		assert(
			addMessageTest.hasOwnProperty('type') &&
			addMessageTest.hasOwnProperty('message'),
			error_1
		);

		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}
	
	// test 2:
	try {
		assert.strictEqual(typeof mapDispatchToProps, 'function', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {

		let mapDispatchReturn = mapDispatchToProps();
		assert.strictEqual(typeof mapDispatchReturn, 'object', error_3);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {

		let testAction;
		const dispatch = (fn) => {
			testAction = fn;
		}
		let dispatchFn = mapDispatchToProps(dispatch);
		dispatchFn.submitNewMessage('__TEST__MESSAGE__');

		assert(
			testAction.type === 'ADD' &&
			testAction.message === '__TEST__MESSAGE__',
			error_4
		);

		testResults[4].status = true;
	} catch (err) {
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
