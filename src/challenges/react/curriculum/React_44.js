/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
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
		// change code below this line 

		// change code above this line
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value,
			userAge: ''
		});
	}
	submit() {
		this.setState({
			userAge: this.state.input
		});
	}
	render() {
		const buttonText = ["Submit", "You May Enter", "You Shall Not Pass"];
		const button = // change code here
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
			userAge: '',
			input: '',
		}
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({
			input: e.target.value,
			userAge: ''
		});
	}
	submit() {
		this.setState({
			userAge: this.state.input
		});
	}
	render() {
		const buttonText = ["Submit", "You May Enter", "You Shall Not Pass"];
		const button = this.state.userAge === '' ? <button onClick={this.submit}>{buttonText[0]}</button> :
			this.state.userAge >= 18 ? <button>{buttonText[1]}</button> : 
			<button>{buttonText[2]}</button>;
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
	const error_1 = 'The CheckUserAge component exists and is rendered to the page.';
	const error_2 = 'The CheckUserAge component returns a single <input> element.';
	const error_3 = 'The CheckUserAge component returns a single <button> element.';
	const error_4 = 'The CheckUserAge component\'s state is initialized with a property of userAge and a property of input, both set to a value of an empty string.';
	const error_5 = 'When the CheckUserAge component is first rendered to the DOM, the button\'s inner text should read "Submit".';
	const error_6 = 'When a number of less than 18 is entered into the <input> element and the button is clicked, the button\'s inner text should read "You Shall Not Pass".';
	const error_7 = 'When a number greater than or equal to 18 is entered into the <input> element and the button is clicked, the button\'s inner text should read "You May Enter".';
	const error_8 = 'Once a number has been submited, and the value of the input is once again changed, the button should return to reading "Submit".'


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
			test: 3,
			status: false,
			condition: error_4
		},
		{
			test: 3,
			status: false,
			condition: error_5
		},
		{
			test: 3,
			status: false,
			condition: error_6
		},
		{
			test: 3,
			status: false,
			condition: error_7
		},
		{
			test: 3,
			status: false,
			condition: error_8
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
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	console.log(mockedComponent);

	let initialState, state_1, state_2, state_3, state_4;

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('CheckUserAge').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('input').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(mockedComponent.find('button').length, 1, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		initialState = mockedComponent.state();
		assert(initialState.userAge === '' && initialState.input === '', error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		assert.strictEqual(mockedComponent.find('button').nodes[0].innerText, "Submit", error_5);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	// test 6:
	try {
		mockedComponent.find('input').simulate('change', {target: { value: 0 }});
		mockedComponent.find('button').simulate('click');
		state_1 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 10 }});
		mockedComponent.find('button').simulate('click');
		state_2 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 17 }});
		mockedComponent.find('button').simulate('click');
		state_3 = mockedComponent.find('button').nodes[0].innerText;
		assert(
			state_1 === 'You Shall Not Pass' &&
			state_2 === 'You Shall Not Pass' &&
			state_3 === 'You Shall Not Pass',
			error_6
		);
		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}

	// test 7:
	try {
		mockedComponent.find('input').simulate('change', {target: { value: 18 }});
		mockedComponent.find('button').simulate('click');
		state_1 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 25 }});
		mockedComponent.find('button').simulate('click');
		state_2 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 35 }});
		mockedComponent.find('button').simulate('click');
		state_3 = mockedComponent.find('button').nodes[0].innerText;
		assert(
			state_1 === 'You May Enter' &&
			state_2 === 'You May Enter' &&
			state_3 === 'You May Enter',
			error_7
		);
		testResults[7].status = true;
	} catch (err) {
		passed = false;
		testResults[7].status = false;
	}

	// test 8:
	try {
		mockedComponent.find('input').simulate('change', {target: { value: 18 }});
		mockedComponent.find('button').simulate('click');
		state_1 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 1 }});
		state_2 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 10 }});
		mockedComponent.find('button').simulate('click');
		state_3 = mockedComponent.find('button').nodes[0].innerText;
		mockedComponent.find('input').simulate('change', {target: { value: 1 }});
		state_4 = mockedComponent.find('button').nodes[0].innerText;
		assert(
			state_1 === 'You May Enter' &&
			state_2 === 'Submit' &&
			state_3 === 'You Shall Not Pass' &&
			state_4 === 'Submit',
			error_8
		);
		testResults[8].status = true;
	} catch (err) {
		passed = false;
		testResults[8].status = false;
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