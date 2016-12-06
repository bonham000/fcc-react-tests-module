/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Controlled Input`

export const challengeText = `<span class = 'default'>Intro: </span>Let's take a look at a more complex
interaction between <code>state</code> and our rendered UI. Here we are going to create a controlled input
with React. Normally, text input elements such as <code>&lt;input/&gt;</code> and <code>&lt;textarea/&gt;</code> maintain
their own state in the DOM as the user types. With React, we can move this mutatable state into a React component's
<code>state</code>.<br><br>

This will allow our user's input to become part of application <code>state</code>.
Typically, if you are creating any input the user can type in with React, it will be a controlled input form.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've given you the skeleton of a
component called <code>ControlledInput</code> in which we want to create a controlled <code>&lt;input/&gt;</code> element. We've already
initialized it with an <code>&lt;input/&gt;</code> property in the state set to an empty string. This value will represent
our input text. Now, we need to create a method to handle changes to our input element and create the element itself.

We'll call the our method <code>handleInput()</code>. It will receive an <code>event</code> object which will contain
a string of text from the input element you can access through <code>event.target.value</code>. When you define the 
method you will need to pass this <code>event</code> object in.<br><br>

Next, we have to define our actual <code>&lt;input/&gt;</code> element. In the render method, above the <code>&lt;p/&gt;</code> tag,
create a normal HTML <code>&lt;input/&gt;</code> element. We need to set some attributes on this input so it is connected to React.
Set a <code>value</code> attribute which is equal to the <code>&lt;input/&gt;</code> property of the component's <code>state</code>,
and also assign an <code>onChange()</code> handler which is set to the <code>handleInput()</code> method you just wrote.<br><br>

Now, when you type in the input box the text you are typing will be processed by the <code>handleInput()</code> method, set
as the <code>&lt;input/&gt;</code> property in the local <code>state</code>, and then rendered as the value in the
<code>input</code> box and on the page. This leaves component <code>state</code> as the single source of truth regarding
the input data, and you've just created your first controlled input element with React!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class ControlledInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
	}
	// change code below this line

	// change code above this line
	render() {
  	return (
	    <div>
        { /* change code below this line */}


      	{ /* change code above this line */}
        <p>Input: {this.state.input}</p>
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class ControlledInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
	}
	handleInput = (event) => {
		this.setState({
			input: event.target.value
		});
	}
	render() {
  	return (
	    <div>
        <input
        	value={this.state.input}
        	onChange={this.handleInput} />
        <p>Input: {this.state.input}</p>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent returns a div element which contains an input and a p tag';
	const error_2 = 'The state of MyComponent is initialized with an input property set to an empty string.';
	const error_3 = 'Typing in the input element updates the state';

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

	let es5, shallowRender, mockedComponent, passed = true;

	const exportScript = '\n export default ControlledInput'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert(
			mockedComponent.find('div').children().find('input').length === 1
			&& mockedComponent.find('div').children().find('p').length === 1,
			error_1
		);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.state('input'), '', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	//test 3:
	try {

		mockedComponent.setState({input: ''});
		const before = mockedComponent.state('input');
		mockedComponent.find('input').simulate('change', {target: {value: 'TestInput'}});
		const after = mockedComponent.state('input');

		assert.strictEqual(before === '' && after === 'TestInput', true, error_3);
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
		const exportScript = '\n export default ControlledInput'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}