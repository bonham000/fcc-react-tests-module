/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Default Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you understand how props work let's
learn about default props.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>_ADD_YOUR_INSTRUCTIONS_HERE_`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Items extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h1>{this.props.name}</h1>
	}
}

{ /* change code below this line */ }

{ /* change code above this line */ }

export default class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <Items />
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Items extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <h1>Current Quantity of Items in Cart: {this.props.quantity}</h1>
	}
}

{ /* change code below this line */ }
Items.defaultProps = {
	quantity: 0
}
{ /* change code above this line */ }

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

	const error_1 = 'The component ShoppingCart returns the component Items';
	const error_2 = 'The Items component has a default prop of { quantity: 0 }';

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

	console.log(mockedComponent);
	console.log(mockedComponent.find('Items'));

	// test 1:
	try {

		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
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