/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use PropTypes to Define the Props You Expect`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>React provides useful typechecking features
to verify that components are receiving props of the correct type. For instance, let's say you perform some API call
and expect to receive data back as an array which you will then pass to a component as a prop. You can set <code>propTypes</code> on your component such that
this data is required to be of type <code>array</code>. This will throw a useful warning in the event the data is of any other type. Setting
<code>propTypes</code> when you know the type of a prop ahead of time is a best practice. You can define a <code>propTypes</code> property of a component
in the same way you defined <code>defaultProps</code>. Defining a required <code>function</code> prop would look like this:<br><br>

<code>MyComponent.propTypes = { handleClick: React.PropTypes.func.isRequired }</code><br><br>

You may notice <code>func</code> representing <code>function</code>. Among the seven JavaScript primitive types, this is the only unusual
spelling with the exception of <code>boolean</code> which is written as <code>bool</code>.

In addition to the primitive types, there are also other types available, for example you can check that a prop is a React element.
Please refer to the documentation for an exhaustive list.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here is our <code>ShoppingCart</code> example again. Let's define
<code>propTypes</code> for the <code>Items</code> component which declare that <code>quantity</code> is a required prop of type <code>number.</code>`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const Items = (props) => {
	return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

{ /* change code below this line */ }

{ /* change code above this line */ }

Items.defaultProps = {
	quantity: 0
};

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <Items />
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const Items = (props) => {
	return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

{ /* change code below this line */ }
Items.propTypes = {
	quantity: React.PropTypes.number.isRequired
};
{ /* change code above this line */ }

Items.defaultProps = {
	quantity: 0
};

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <Items />
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The component ShoppingCart is rendered.';
	const error_2 = 'The component Items is rendered.';
	const error_3 = 'The Items component includes a propTypes check for quantity as a required number.';

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

	const exportScript = '\n export default ShoppingCart'
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
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('ShoppingCart').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Items').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		// propTypes unavailable in production and throw warnings anyway
		// this was the only way I could devise to check that propTypes are included
		const noWhiteSpace = modifiedCode.replace(/\s/g, '');
		const verifyPropTypes = 'Items.propTypes={quantity:React.PropTypes.number.isRequired}';
		assert.strictEqual(noWhiteSpace.includes(verifyPropTypes), true, error_3);
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
		const exportScript = '\n export default ShoppingCart'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}