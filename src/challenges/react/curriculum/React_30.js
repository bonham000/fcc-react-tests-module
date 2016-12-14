/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Controlled Form`

export const challengeText = `<span class = 'default'>Intro: </span>Here we will expand on our previous example
of controlled inputs.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided a <code>MyForm</code> component
which is already prepared to handle changes on an <code>&lt;input/&gt;</code> element. Define this <code>&lt;input/&gt;</code>
element in the <code>return</code> of the <code>MyForm</code> component, setting its <code>value</code> and <code>onChange()</code> attributes
like before. Then, define a <code>&lt;button/&gt;</code> that you can use to submit the input value. Of course, we're not really
submitting the form anywhere, this is just serving as a simulation. The <code>&lt;button/&gt;</code> should have an <code>onClick()</code> handler which
runs a method called <code>handleSubmit()</code> which you can define on the <code>MyForm</code> class. This method should take whatever value
is currently in the input and set it to the <code>submit</code> property in local <code>state</code>.<br><br>

Finally, create an <code>&lt;h1/&gt;</code> tag below the <code>&lt;button/&gt;</code> which renders out the <code>submit</code> value
from the component's <code>state</code>. Once you're finished and you type in the form and click the button, you should
see your input rendered to the page!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			submit: ''
		};
	}
	handleChange = (event) => {
		this.setState({
			input: event.target.value
		});
	}
	// change code below this line

	// change code above this line
	render() {
  	return (
	    <div>
        { /* change code below this line */ }

        { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			submit: ''
		};
	}
	handleChange = (event) => {
		this.setState({
			input: event.target.value
		});
	}
	handleSubmit = () => {
		this.setState({
			submit: this.state.input
		});
	}
	render() {
  	return (
	    <div>
        <input
        	value={this.state.input}
        	onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit!</button>
        <h1>{this.state.submit}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyForm returns a div element which contains an input, a button, and an h1 tag.';
	const error_2 = 'The state of MyForm is initialized with input and submit properties set to an empty strings.';
	const error_3 = 'Typing in the input element updates the input property in the state.';
	const error_4 = 'Clicking the button runs handleSubmit which sets the submit property in state equal to the current input.';

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

	let es5, shallowRender, mockedComponent, passed = true;

	const exportScript = '\n export default MyForm'
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
			mockedComponent.find('div').children().find('input').length === 1 && 
			mockedComponent.find('div').children().find('button').length === 1 && 
			mockedComponent.find('div').children().find('h1').length === 1,
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
			mockedComponent.state('input') === '' &&
			mockedComponent.state('submit') === '',
			error_2
		);
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

	//test 4:
	try {

		mockedComponent.setState({input: ''});
		mockedComponent.setState({submit: ''});
		mockedComponent.find('input').simulate('change', {target: {value: 'SubmitInput'}});
		const submitBefore = mockedComponent.state('submit');
		mockedComponent.find('button').simulate('click');
		const submitAfter = mockedComponent.state('submit');

		assert.strictEqual(submitBefore === '' && submitAfter === 'SubmitInput', true, error_4);
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
		const exportScript = '\n export default MyForm'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}