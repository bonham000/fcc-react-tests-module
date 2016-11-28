import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use React to Render an h1 Tag`
export const challengeInstructions = `
	<span class = 'default'>Instructions: </span>This React Component returns an empty <code>div</code> element at the moment.
	Modify it to return an <code>h1</code> tag within the <code>div</code> element which includes the text 'Hello React!'
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
	    	<h1>Hello React!</h1>
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, shallowRender, passed = true;

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
			failure: 'The React component does not return a <div> element.',
			success: 'The React component returns a <div> element.'
		},
		{
			test: 2,
			status: false,
			failure: 'There is no <h1> tag rendered within the returned <div>.',
			success: 'There is a <h1> tag rendered within the returned <div>.'
		},
		{
			test: 3,
			status: false,
			failure: 'The <h1> tag does not include the text \'Hello React!\'',
			success: 'The <h1> tag includes the text \'Hello React!\''
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
	
	// shallow render the component with Enzyme
	try {
		shallowRender = shallow(React.createElement(eval(es5)))
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect(shallowRender.type()).toEqual('div');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		expect(shallowRender.children().type()).toEqual('h1');
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		expect(shallowRender.contains(<h1>Hello React!</h1>)).toEqual(true);
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;
	}

	return {
		passed,
		testResults,
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