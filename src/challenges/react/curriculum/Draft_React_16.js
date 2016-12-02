/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Default Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you understand how props work let's
learn about default props. You can assign default props to a component as a property on the component class itself.
This allows you to specify what a prop value should be if no value is explicitly provided. For example, by declaring
<code>MyComponent.defaultProps = { location: 'San Francisco' }</code>
you have defined a location prop which will be set to the string 'San Francisco' unless you specify otherwise.

Default props will be assigned if props are undefined, but if you pass <code>null</code> as the value for a prop, it
will remain null.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We have defined a <code>ShoppingCart</code>
component for you. Define default props on this component which specify a prop 'items' with a value of 0.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
			<div>
				<h1>Shopping Cart Component</h1>
			</div>
    )
  }
};
// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
			<div>
				<h1>Shopping Cart Component</h1>
			</div>
    )
  }
};

// change code below this line
ShoppingCart.defaultProps = {
	items: 0
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The component ShoppingCart is rendered.';
	const error_2 = 'The ShoppingCart component has a default prop of { items: 0 }';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
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

	let es5, mockedComponent, shallowRender, passed = true;

	const exportScript = '\n export default ShoppingCart'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('ShoppingCart').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		mockedComponent.setProps({items: undefined});
		assert.strictEqual(mockedComponent.find('ShoppingCart').props().items, 0, error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
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
		const exportScript = '\n export default ShoppingCart'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}