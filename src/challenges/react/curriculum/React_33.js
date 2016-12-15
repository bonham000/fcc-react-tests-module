/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use the Lifecycle Method componentWillMount`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>React components have several special methods
that provide opportunities to perform certain actions at specific points in the lifecycle of a component. These are
called lifecycle methods and allow us to catch components at certain points in time, for instance, before they are rendered,
before they update, before they receive props, before they unmount, and so on. Here is a list of some of the main
lifecycle methods:
<code>componentWillMount()</code>,
<code>componentDidMount()</code>,
<code>componentWillReceiveProps()</code>,
<code>shouldComponentUpdate()</code>,
<code>componentWillUpdate()</code>,
<code>componentDidUpdate()</code>,
<code>componentWillUnmount()</code>.<br><br>

The next few lessons will go over some of the basic use cases for these lifecycle methods. First let's see how we can perform
some action with one of these methods.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span><code>componentWillMount()</code> is called
before the <code>render()</code> method when a component is being mounted to the DOM. We've provided a simple component that renders a
<code>&lt;div/&gt;</code>. Log something to the console within <code>componentWillMount()</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		// change code below this line

		// change code above this line
	}
  render() {
    return <div />
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		// change code below this line
		console.log('Component is mounting...');
		// change code above this line
	}
  render() {
    return <div />
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent renders a div element.';
	const error_2 = 'console.log is called in componentWillMount.';

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
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
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
		const lifecycle = React.createElement(eval(es5)).type.prototype.componentWillMount.toString().replace(/\s/g,'');
		assert.strictEqual(lifecycle.includes('console.log('), true, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
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
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}