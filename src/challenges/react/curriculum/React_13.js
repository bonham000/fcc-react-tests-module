/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Write a React Component from Scratch`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you've learned the basics of JSX and
React Components, let's try to write one from scratch. React components are the core building blocks of React apps
so it's important to become very familiar with writing them. Remember, a typical React component is an ES6
<code>class</code> which extends <code>React.Component</code> and contains a <code>render()</code> method which
returns HTML in the form of JSX. This is the basic form of a React component. Once you understand this well you will
be prepared to start building more complex React projects.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Define a class <code>MyComponent</code>
that extends <code>React.Component</code>. This should return a <code>&lt;div&gt;&lt;/div&gt;</code> which is wrapped around an
<code>&lth1&gt;</code> tag which includes the text: <code>My First React Component!</code>. Be sure to include this exact text and don't
forget to call your component's constructor.<br><br>

Then, render this component to the DOM using <code>ReactDOM.render()</code>, passing in your component and the target DOM node
just like before. We've provided a <code>&lt;div /&gt;</code> with <code>id='challenge-node'</code> again for you to render to.<br><br>

Good luck!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`// change code below this line
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
			<div>
				<h1>My First React Component!</h1>
			</div>
    );
  }
};

ReactDOM.render(<MyComponent />, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	// this will clear the target DOM node before the challenge code
	document.getElementById('challenge-node').innerHTML = '';

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'There is a React component called \'MyComponent\'';
	const error_2 = 'MyComponent contains an h1 tag with text \'My First React Component!\'';
	const error_3 = 'MyComponent is rendered to the DOM.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
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
		mockedComponent = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('div').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.contains(<h1>My First React Component!</h1>), true, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(document.getElementById('challenge-node').childNodes.length, 1, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default MyComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}