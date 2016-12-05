/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Connect Redux to React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've written <code>mapStateToProps()</code>
and <code>mapDispatchToProps()</code> all that's left is to use these functions to map <code>state</code> and
<code>dispatch</code> to the <code>props</code> of one of our React components. To do this we will use the
<code>connect</code> method from React Redux that we mentioned earlier. This method takes two optional arguments,
<code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>. They are optional because you may have a component
which only needs access to <code>state</code> but doesn't need to dispatch any actions, or vice versa. Note: to omit one
of these arguments you can simply pass <code>null</code> in its place.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided the
<code>mapStateToProps()</code> and <code>mapDispatchToProps()</code> functions we've just written and created a React
component called Presentational. Let's connect this component to Redux. We've provided the <code>connect</code>
method for you from the <code>ReactRedux</code> global object. To use this method you pass in the functions that map 
<code>state</code> and <code>props</code> as arguments and immediately call the result with your component. This
syntax is a little unusal and looks like:<br><br>

<code>connect(mapStateToProps, mapDispatchToProps)(MyComponent)</code><br><br>

We can assign the result of this to a new variable which represents our connected component. Call <code>connect</code> on
the Presentational component and assign it to a new <code>const</code> called ConnectedComponent. That's it, now we're
connected to Redux! Try changing either of <code>connect</code>'s arguments to <code>null</code> and observe the test results.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const addMessage = (message) => {
	return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
  	messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	submitNewMessage: (message) => {
  		dispatch(addMessage(message));
  	}
  }
};

class Presentational extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div/>
	}
};

const connect = ReactRedux.connect;
// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const addMessage = (message) => {
	return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
  	messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	submitNewMessage: function(message) {
  		dispatch(addMessage(message));
  	}
  }
};

class Presentational extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h3>This is a Presentational Component</h3>
	}
};

const connect = ReactRedux.connect;
// change code below this line

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational)`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The Presentational component is rendered.';
	const error_2 = 'Component receives a prop \'messages\' via connect.';
	const error_3 = 'Component receives a prop \'submitNewMessage\' via connect.';

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

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	
	const exportScript = `\n
		const store = Redux.createStore(
			(state = '__INITIAL__STATE__', action) => state
		);

		class AppWrapper extends React.Component {
			render() {
				return (
					<ReactRedux.Provider store = {store}>
						<ConnectedComponent/>
					</ReactRedux.Provider>
				);
			}
		}; export default AppWrapper;`
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('Presentational').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	let props;

	// test 2:
	try {
		props = mockedComponent.find('Presentational').node.props;
		assert.strictEqual(props.messages, '__INITIAL__STATE__', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(typeof props.submitNewMessage, 'function', error_3);
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

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
	const exportScript = `\n
		const store = Redux.createStore(
			(state = '__INITIAL__STATE__', action) => state
		);

		class AppWrapper extends React.Component {
			render() {
				return (
					<ReactRedux.Provider store = {store}>
						<ConnectedComponent/>
					</ReactRedux.Provider>
				);
			}
		}; export default AppWrapper;`
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}