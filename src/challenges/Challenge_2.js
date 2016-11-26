import React from 'react'
import expect from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import CodeMirror from 'react-codemirror'
import { transform } from 'babel-standalone'

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge:</span> Use React to Render Nested Components.`
export const challengeInstructions = `
	<span class = 'default'>Instructions:</span> This React Component returns an empty <code>div</code> element at the moment.
	 Render two additional components inside this <code>div</code>. We've provided an <code>Account</code> and <code>UserList</code> component for you.
	 You can include these directly within the React Component's render method.
`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    <div>
	    </div>
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
	    <div>
	    	<Account />
	    	<UserList />
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const prependedCode = `
	const Account = () => <div></div>
	const UserList = () => <div></div>`

	const input = prependedCode.concat(code);

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
			failure: 'The React Component does not return a <div> element.',
			success: 'The React Component returns a <div> element.'
		},
		{
			test: 2,
			status: false,
			failure: 'The Component does not return an Account and UserList within the <div> element.',
			success: 'The Component returns an Account and UserList within the <div> element.'
		}
	]
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(input, { presets: [ 'es2015', 'react' ] }).code;
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
		expect(mockedComponent).toExist();
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect(mockedComponent.type).toBe('div');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		expect(mockedComponent.props.children.length).toBe(2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	return {
		passed,
		testResults
	}
	
}