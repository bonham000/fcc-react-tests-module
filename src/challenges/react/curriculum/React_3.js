import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Add Comments in JSX`
export const challengeText = `<span class = 'default'>Intro: </span>
JSX is a syntax, that gets compiled to JS. But it is a syntax nonetheless.
Sometimes, for readability, we might need to add comments to our code.<br><br>

We can put comments inside JSX using the syntax <code>{/* */}</code> to wrap around the comment text.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
We've provided a JSX element similiar to what you just wrote. Add a comment after the <code>h1</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const JSX = (
<div>
	<h1>This is a block of JSX</h1>
	<p>Here's a subtitle</p>
</div>);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div>
	<h1>This is a block of JSX</h1>
	{ /* this is a JSX comment */ }
	<p>Here's a subtitle</p>
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
			condition: 'The div contains an h1 tag as the second element.'
		},
		{
			test: 3,
			status: false,
			condition: 'The div contains an p tag as the second element.'
		},
		{
			test: 4,
			status: false,
			condition: 'The JSX includes a comment.'
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
		assert.strictEqual(jsx.props.children[0].type, 'h1', 'The div contains an h1 tag as the first element.');
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(jsx.props.children[1].type, 'p', 'The div contains an p tag as the second element.');
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert.strictEqual(modifiedCode.includes('/*'), true, 'The JSX includes a comment.');
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[4].status = false;
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