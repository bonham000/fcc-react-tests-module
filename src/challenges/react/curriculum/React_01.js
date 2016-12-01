/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Simple JSX Element`
export const challengeText = `<span class = 'default'>Intro: </span>
React is an open-source view library created and maintained by Facebook. It's a great tool for rendering out the UI of 
modern web applications.<br><br>

React uses a syntax extension of JavaScript called JSX that allows you to write HTML directly within JavaScript. This is very useful because
it allows you to leverage the full programmatic power of JavaScript within HTML. For the most part, JSX is similar to the HTML that you have
already learned, however there are a few key differences, which we will learn about as we progress through these challenges.<br><br>

Of course, JSX is not valid JavaScript, so JSX code must be compiled down to JavaScript. Babel is the tool of choice for this process, but for 
your convenience it's all happenings behind the scenes here. However, if you happen to write syntactically invalid JSX, you will see the first test
in these challenges fail.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The current code uses JSX to assign a <code>div</code> element to the constant JSX. Replace the <code>div</code> with an <code>h1</code> element
and add then text 'Hello JSX!' inside it.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `const JSX = <div></div>;`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `const JSX = <h1>Hello JSX!</h1>;`

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
			condition: 'The constant JSX returns an <h1> element'
		},
		{
			test: 2,
			status: false,
			condition: 'The <h1> tag includes the text \'Hello JSX!\''
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
		assert.strictEqual(jsx.type, 'h1', 'The constant JSX returns an <h1> element.');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(jsx.props.children, 'Hello JSX!', true, 'The <h1> tag includes the text \'Hello JSX!\'');
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