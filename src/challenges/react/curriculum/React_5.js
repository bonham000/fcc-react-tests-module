import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Define an HTML Class in JSX`
export const challengeText = `<span class = 'default'>Intro: </span>
Now that you're getting comfortable writing JSX you may be wondering if it has any differences from HTML.
So far it seems like you can just write normal HTML, right?<br><br>

One key difference is that you can no longer use the word 'class' to define HTML classes, because 'class' is a
reserverd word in JavaScript. In its place we will use 'className' in JSX.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Apply a class of 'myDiv' to the div provided in the JSX code.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = (
<div>
	<h1>Add a class to this div</h1>
</div>);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const JSX = (
<div className = 'myDiv'>
	<h1>Add a class to this div</h1>
</div>);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, jsx, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The constant JSX returns an <div> element'
		},
		{
			test: 2,
			status: false,
			condition: 'The div has a class of \'myDiv\'.'
		}
	];

	const prepend = `(function() {`
	const apend = `; return JSX })()`
	const modifiedCode = prepend.concat(code).concat(apend);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// shallow render the component with Enzyme
	try {
		jsx = eval(es5);
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(jsx.type, 'div', 'The constant JSX returns an <div> element.');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(jsx.props.className, 'myDiv', 'The div has a class of \'myDiv\'.');
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
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