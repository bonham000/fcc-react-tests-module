import React from 'react'
import expect from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import CodeMirror from 'react-codemirror'
import { transform } from 'babel-standalone'

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = ``

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = ``

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			failure: 'Your JSX code could not be transpiled successfully.',
			success: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			failure: '',
			success: ''
		},
		{
			test: 2,
			status: false,
			failure: '',
			success: ''
		},
		{
			test: 3,
			status: false,
			failure: '',
			success: ''
		}
	]
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// render transpiled React code with React test utils
	const renderer = ReactTestUtils.createRenderer();
	renderer.render(React.createElement(eval(es5)));

	try {	
		mockedComponent = renderer.getRenderOutput();
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run challenge-specific tests
	try {
		expect();
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect();
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		expect();
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		expect();
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