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
export const challengeText = `<span class = 'default'>Intro: </span>Components are the core of React. Everything in React is a component and here we
will learn how to create components.
<br /><br />

There are 2 ways to create a React component.
The easiest way to create a React component is with a JavaScript function. Defining a component in this way creates what is called a stateless
functional component. The other method is the topic of the next challenge.
<br /><br />

To create a component with a function you simply write a JavaScript function which returns either JSX or <code>null</code>.
One important thing to note is that React requires your function name to begin with a capital letter. You can optionally pass in <code>props</code>
as an argument to this function which can then be returned in your JSX.
<br /><br />

Below is an example of a stateless functional component. It receives properties from React in the variable <code>props</code>
and returns JSX.

<pre><code>
const DemoComponent = function(props) {
  // Using ES6 to destructure customClass from props
  // After being transpiled the &lt;div&gt; will have a CSS class of 'wrapperClass'
  const { customClass } = props;
  return (
    &lt;div className={customClass} /&gt;
  );
};
&lt;DemoComponent customClass = 'wrapperClass' /&gt;
</code></pre>

Because a JSX component like this represents HTML, you could easily stitch together a more complex HTML page with several JSX components. This
is one of the key advantages of the component architecture React provides: it allows you to compose your UI from many separate, isolated components.
This makes it easier to build and maintain complex user interfaces. We will see this in greater detail moving forward.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided a function called <code>myComponent()</code> for you.
Complete this function so that it returns a JSX element with a single <code>&#60;div /&#62</code> element which contains some string of text. Note: the text
is considered a child of this element, so you will not be able to use a self-closing tag.`

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
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'MyComponent is a function.'
		},
		{
			test: 2,
			status: false,
			condition: 'MyComponent returns a React Element.'
		},
		{
			test: 3,
			status: false,
			condition: 'MyComponent returns a div element.'
		},
		{
			test: 4,
			status: false,
			condition: 'The div element contains a string value.'
		}
	];

	let es5, mockedComponent, jsx, testRender, passed = true;

	const prepend = `(function() {`
	const apend = `; return MyComponent })()`
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
		assert.strictEqual(typeof jsx, 'function', 'MyComponent is a function.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		testRender = jsx();
		assert.strictEqual(typeof testRender, 'object', 'MyComponent returns a React Element.');
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(testRender.type, 'div', 'MyComponent returns a div element.');
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 3:
	try {
		assert.notStrictEqual(testRender.props.children.length, 0, 'The div element contains a string of text.');
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