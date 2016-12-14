/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Stateful Component`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Here we introduce one of the most important topics in React:
<code>state</code>. State consists of any data that can change over time that your app needs to know about. We want our apps to be able to
respond to changing state and present a new UI when state changes. React presents us with a very nice solution for the state management
of modern web applications. Let's see how it works here.<br><br>

We can create state in a React component by declaring a <code>state</code> property on the component class in its
<code>constructor</code>. This will initialize the component with <code>state</code> when it is created. This <code>state</code>
property must be set to a JavaScript <code>object</code>. Declaring it looks like this:<br><br>

<code>this.state = {<br>
&nbsp;&nbsp;&nbsp;// describe your state here<br>
}<br><br>
</code>

We will then have access to this <code>state</code> throughout the life of our component. We can update it, render it in our UI,
and pass it as props to child components. The <code>state</code> object can be as complex or as simple as you need it to be. Note
that you must create a class component by extending <code>React.Component</code> in order to create <code>state</code> like this.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined a component for you that is
trying to render a <code>name</code> property from its <code>state</code> but currently no <code>state</code> exists.
Initialize the component with <code>state</code> in the <code>constructor</code> and assign your name to a property of 
<code>name</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class StatefulComponent extends React.Component {
	constructor(props) {
		super(props);
		// initialize state here
	}
  render() {
    return (
	    <div>
	    	<h1>{this.state.name}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class StatefulComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Free Code Camp!'
		}
	}
  render() {
    return (
	    <div>
	    	<h1>{this.state.name}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'StatefulComponent exists and is rendered.';
	const error_2 = 'StatefulComponent renders a div and h1 element.';
	const error_3 = 'StatefulComponent\' state is initalized with a property \'name\' set to a string.';
	const error_4 = 'The property \'name\' in the state of StatefulComponent is rendered in the h1 element.';

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

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default StatefulComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
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
		assert.strictEqual(mockedComponent.find('StatefulComponent').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('h1').length === 1,
			error_2
		);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	let initialState;

	// test 3:
	try {
		initialState = mockedComponent.state();
		assert(
			typeof initialState === 'object' &&
			typeof initialState.name === 'string',
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert.strictEqual(mockedComponent.find('h1').node.innerText, initialState.name, error_4);
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

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default StatefulComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}