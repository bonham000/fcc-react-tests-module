import React from 'react'
import expect from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import CodeMirror from 'react-codemirror'
import { transform } from 'babel-standalone'

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Modify an Unordered List`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>This React Component returns a <code>ul</code> of
items. Add a listitem <code>li</code> containing the text "Coffee".`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    <div>
	    	<h1 style = {{ color: 'blue' }}>This is a React Component</h1>
	    	<p>It renders a list of items:</p>
	    	<ul>
	    		<li>Eggs</li>
	    		<li>Bread</li>
	    		<li>Milk</li>
	    	</ul>
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    <div>
	    	<h1 style = {{ color: 'blue' }}>This is a React Component</h1>
	    	<p>It renders a list of items:</p>
	    	<ul>
	    		<li>Eggs</li>
	    		<li>Bread</li>
	    		<li>Milk</li>
	    		<li>Coffee</li>
	    	</ul>
	    </div>
	    // change code above this line
    );
  }
};`

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
			failure: 'The React Component does not return a <div> element.',
			success: 'The React Component returns a <div> element.'
		},
		{
			test: 2,
			status: false,
			failure: 'The component does not return 3 unordered list items.',
			success: 'The component returns 3 unordered list items.'
		},
		{
			test: 3,
			status: false,
			failure: 'The 4th list item does not contain the text "Coffee".',
			success: 'The 4th list item contains the text "Coffee".'
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
	try {
		renderer.render(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	try {	
		mockedComponent = renderer.getRenderOutput();
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
		expect(mockedComponent.props.children[2].props.children.length).toBe(4);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		expect(mockedComponent.props.children[2].props.children[3].props.children).toEqual("Coffee");
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