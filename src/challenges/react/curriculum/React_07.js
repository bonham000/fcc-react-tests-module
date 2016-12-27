/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Stateless Functional Component`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Components are the core of React. Everything in React is a component and here you will learn how to create one.
<br /><br />

There are two ways to create a React component. The first way is to use a JavaScript function. Defining a component in this way creates a <em>stateless functional component</em>. The concept of state in an application will be covered in later challenges. For now, think of a stateless component as one that can receive data and render it, but does not manage or track changes to that data.
<br /><br />

To create a component with a function, you simply write a JavaScript function that returns either JSX or <code>null</code>. One important thing to note is that React requires your function name to begin with a capital letter. You can optionally pass in an argument called <code>props</code>
to the function. This is an object containing data (also called properties), which can be used and returned in your JSX.
<br /><br />

Here's an example of a stateless functional component:

<pre>
<code class="codeBlock">const DemoComponent = function(props) {
  // Using ES6 to destructure customClass from props
  // After being transpiled, the &lt;div&gt; will have a CSS class of 'wrapperClass'
  const { customClass } = props;
  return (
    &lt;div className={customClass} /&gt;
  );
};
&lt;DemoComponent customClass = 'wrapperClass' /&gt;</code>
</pre>

Because a JSX component represents HTML, you could put several components together to create a more complex HTML page. This is one of the key advantages of the component architecture React provides. It allows you to compose your UI from many separate, isolated components. This makes it easier to build and maintain complex user interfaces.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has a function called <code>MyComponent</code>. Complete this function so it returns a single <code>div</code> element which contains some string of text.
<br /><br />
<strong>Note</strong><br />The text is considered a child of the <code>div</code> element, so you will not be able to use a self-closing tag.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const MyComponent = function(props) {
	// change code below this line



	// change code above this line
}`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const MyComponent = function(props) {
	// change code below this line
	return (
		<div>
			Demo Solution
		</div>
	);
	// change code above this line
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code should transpile successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'MyComponent should be a function.'
		},
		{
			test: 2,
			status: false,
			condition: 'MyComponent should return a React element.'
		},
		{
			test: 3,
			status: false,
			condition: 'MyComponent should return a div element.'
		},
		{
			test: 4,
			status: false,
			condition: 'The div element should contain a string of text.'
		}
	];

	let es5, mockedComponent, jsx, testRender, passed = true;

	const prepend = `(function() {`
	const apend = `;\n return MyComponent })()`
	const modifiedCode = prepend.concat(code).concat(apend);

	// test 0: try to transpile JSX, ES6 code to ES5
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		jsx = eval(es5);
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(typeof jsx, 'function', 'MyComponent should be a function.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		testRender = jsx();
		assert.strictEqual(typeof testRender, 'object', 'MyComponent should return a React element.');
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(testRender.type, 'div', 'MyComponent should return a div element.');
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 3:
	try {
		assert.notStrictEqual(testRender.props.children.length, 0, 'The div element should contain a string of text.');
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	return {
		passed,
		testResults
	}

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = `;\n export default MyComponent`
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
