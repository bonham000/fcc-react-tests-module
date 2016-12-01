/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Define a Self-Closing JSX Tag`
export const challengeText = `<span class = 'default'>Intro: </span>
Now let's learn about another difference in JSX. JSX allows you to write self-closing HTML tags for elements that have no children.
For example, if you have a <code>div</code> element with no children you could simply declare <code>&#60;div /&#62</code>.<br><br>

This is a small distinction but will come in handy when defining child components within React, and has other uses as well.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Modify the JSX code that returns a <code>div</code> to instead return a <code>div</code> with a self-closing tag.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = <div></div>;`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `const JSX = <div />;`

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
			condition: 'The div is written with a self-closing tag.'
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
		assert.strictEqual(modifiedCode.includes('<div />'), true, 'The div is written with a self-closing tag.');
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