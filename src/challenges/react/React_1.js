import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>First React Challenge`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Render a simple <code>div</code>
element to the page.`

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
	    <div>
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The component renders a div'
		}
	];

	let es5, mockedComponent, testRender, passed = true;
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
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
		testRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(testRender.type(), 'div', 'The component renders a div')
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}