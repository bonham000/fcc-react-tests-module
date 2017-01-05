/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Change Inline CSS Conditionally Based on Component State`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>This is being developed at the moment!`

// ---------------------------- challenge instructions ----------------------------
// export const challengeInstructions = `<span class = 'default'>Instructions: </span>`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class GateKeeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(e) {
		this.setState({ input: event.target.value })
	}
	render() {
		let inputStyle = {
			border: '1px solid black'
		};
		return (
			<div>
				<h3>Gates:</h3>
				<input
					type="text"
					style={inputStyle}
					value={this.state.input}
					onChange={this.handleInput} />
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class GateKeeper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleInput = this.handleInput.bind(this);
	}
	handleInput(e) {
		this.setState({ input: event.target.value })
	}
	render() {
		let inputStyle = {
			border: '1px solid black'
		};
		if (this.state.input.length > 15) {
			inputStyle.border = '5px solid red';
		};
		return (
			<div>
				<h3>Gates:</h3>
				<input
					type="text"
					style={inputStyle}
					value={this.state.input}
					onChange={this.handleInput} />
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The component should render a div element.';
	const error_2 = 'The div element should have a color of red.';
	const error_3 = 'The div element should have a font size of 72px.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code should transpile successfully.'
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
	];

	let es5, mockedComponent, testRender, passed = true;
	const exportScript = '\n export default GateKeeper;'
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
		testRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(testRender.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(testRender.nodes[0].props.style.color, "red", error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(testRender.nodes[0].props.style.fontSize, 72, error_3);
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
		const exportScript = '\n export default GateKeeper;'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
