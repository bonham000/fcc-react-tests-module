/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Conditional Rendering with the Ternary Operator`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>_CHALLENGE_TEXT_`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>_ADD_YOUR_INSTRUCTIONS_HERE_`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const inputStyle = {
	width: 235,
	margin: 5
}

class CheckUserAge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userAge: null,
			input: null,
		}
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value,
			userAge: null
		});
	}
	submit() {
		this.setState({
			userAge: this.state.input
		});
	}
	render() {
		const button = this.state.userAge === null ? <button onClick={this.submit}>Submit</button> :
			this.state.userAge >= 18 ? <button>Enter</button> : 
			<button>You Shall Not Pass</button>;
		return (
			<div>
				<h3>Enter Your Age to Continue</h3>
				<input 
					style={inputStyle}
					type="number"
					value={this.state.input}
					onChange={this.handleChange} /><br />
				{button}
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const inputStyle = {
	width: 235,
	margin: 5
}

class CheckUserAge extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userAge: null,
			input: null,
		}
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value,
			userAge: null
		});
	}
	submit() {
		this.setState({
			userAge: this.state.input
		});
	}
	render() {
		const button = this.state.userAge === null ? <button onClick={this.submit}>Submit</button> :
			this.state.userAge >= 18 ? <button>Enter</button> : 
			<button>You Shall Not Pass</button>;
		return (
			<div>
				<h3>Enter Your Age to Continue</h3>
				<input 
					style={inputStyle}
					type="number"
					value={this.state.input}
					onChange={this.handleChange} /><br />
				{button}
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = '';
	const error_2 = '';
	const error_3 = '';

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
	const exportScript = '\n export default CheckUserAge'
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
		mockedComponent = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	console.log(mockedComponent);

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {

		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {

		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {

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
		const exportScript = '\n export default CheckUserAge'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}