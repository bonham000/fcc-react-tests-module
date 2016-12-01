import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Complex JSX Element`
export const challengeText = `<span class = 'default'>Intro: </span>
That was pretty simple. But JSX can include complex nested HTML as well. Now let's try to use JSX in this way.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Define a new constant 'JSX' which renders a <code>div</code> which contains, in this order, an <code>h1</code> tag followed by
a <code>p</code> tag followed by an unordered list with three <code>li</code> items. You can include whatever text you want within
each element. When rendering multiple elements like this, you can wrap them all in parathenses but it's not strictly required.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `// write your code here`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const JSX = (
<div>
	<h1>Hello JSX!</h1>
	<p>Some info</p>
	<ul>
		<li>An item</li>
		<li>Another item</li>
		<li>A third item</li>
	</ul>
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
			condition: 'The constant JSX returns an <div> element.'
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
			condition: 'The div contains a ul tag as the third element.'
		},
		{
			test: 5,
			status: false,
			condition: 'The ul contains three li elements.'
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
		assert.strictEqual(jsx.props.children[2].type, 'ul', 'The div contains an h1 tag as the third element.');
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		assert.strictEqual(jsx.props.children[2].props.children.length, 3, 'The ul contains three li elements.');
		testResults[5].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[5].status = false;
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