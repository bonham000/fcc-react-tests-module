/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Getting Started with React Redux`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>In these series of challenges we will introduce how we can
use Redux with React. First let's review some key principles we've learned. React is a view library, we provide it with data
and it renders a view for us in a performant, predictable way. Redux is a state management framework, we can use Redux to simplify
the management of our application's state. Typically, in a React Redux app, we will create a single Redux store that can manage
the state of our entire app and our React components will subscribe to only the pieces of data in the store that are relevant to
their role. Then, we can dispatch actions directly from our React components which trigger store updates.<br><br>

Although React components can manage their own state locally, in a complex app it is better to keep the app state in a single location
with Redux. Individual components may still have local state specific only to them, however. Finally, because Redux is not designed
to work with React out of the box, we will have to use the <code>react-redux</code> package which provides a way for us to pass
Redux <code>state</code> and <code>dispatch</code> to our React components as <code>props</code>.<br><br>

Now let's see all of this in action. In this series of challenges, we are going to first create a simple React component which allows you
to input new text messages and have them added to an array which is displayed in the view. This should be a nice review of what you learned
in the React lessons. Next, we are going to create a Redux store and actions which can manage the state of this messages array. Finally, we
will use <code>react-redux</code> to connect our Redux store with our component, thereby extracting our local state into the Redux store.
Let's get started!`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We will start with a <code>DisplayMessages</code> component. Add a
constructor to this component and initialize it with a state of two properties, <code>input</code> which is equal to an empty string
and <code>messages</code> which is equal to an empty array.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`class DisplayMessages extends React.Component {
	// change code below this line

  // change code above this line
  render() {
    return <div />
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  render() {
    return <div/>
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The DisplayMessages component renders an empty div element.';
	const error_2 = 'The DisplayMessages component\'s constructor is called properly with super, passing in props.';
	const error_3 = 'The DisplayMessages component has an initial state equal to {input: \'\', messages: []}';

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
	
	const exportScript = '\n export default DisplayMessages'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('div').node.innerHTML, '', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		const noWhiteSpace = code.replace(/\s/g,'');
		assert(
			noWhiteSpace.includes('constructor(props)') &&
			noWhiteSpace.includes('super(props'),
			error_2
		);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		const initialState = mockedComponent.state();
		assert(
			typeof initialState === 'object' &&
			initialState.input === '' &&
			Array.isArray(initialState.messages) &&
			initialState.messages.length === 0,
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

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default DisplayMessages'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}
