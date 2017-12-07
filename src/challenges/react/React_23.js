/* eslint-disable */
import React from 'react'
import assert from 'assert'

import { transform } from 'babel-standalone'

import Enzyme from '../Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render State in the User Interface Another Way`

export const challengeText = `<span class = 'default'>Intro: </span>There is another way to access <code>state</code> in a component. In the <code>render()</code> method, before the <code>return</code> statement, you can write JavaScript directly. For example, you could declare functions, access data from <code>state</code> or <code>props</code>, perform computations on this
data, and so on. Then, you can assign any data to variables, which you have access to in the <code>return</code> statement.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>In the <code>MyComponent</code> render method, define a <code>const</code> called <code>name</code> and set it equal to the name value in the component's <code>state</code>. Because you can write JavaScript directly in this part of the code, you don't have to enclose this reference in curly braces.
Next, in the return statement, render this value in an <code>h1</code> tag using the variable <code>name</code>. Remember, you need to use the JSX syntax (curly braces for JavaScript) in the return statement.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Free Code Camp'
    }
  }
  render() {
    // change code below this line

    // change code above this line
    return (
      <div>
        { /* change code below this line */ }

        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Free Code Camp'
    }
  }
  render() {
    // change code below this line
    const name = this.state.name;
    // change code above this line
    return (
      <div>
        { /* change code below this line */ }
        <h1>{name}</h1>
        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

	const error_0 = 'Your JSX code should transpile successfully.';
	const error_1 = 'MyComponent should have a key \'name\' with value \'Free Code Camp\' stored in its state.';
	const error_2 = 'MyComponent should render an h1 tag.';
	const error_3 = 'The rendered h1 tag should include a reference to {name}.';
	const error_4 = 'The rendered h1 tag should contain text rendered from the component\'s state.';

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
		},
		{
			test: 4,
			status: false,
			condition: error_4
		}
	];

	let es5, mockedComponent, passed = true;

	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
		if (!errorSuppression) console.log('No transpilation errors!');
	} catch (err) {
		passed = false;
		testResults[0].status = false;
		if (!errorSuppression) console.error(`Transpilation error: ${err}`);
	}

	// try to shallow render the component with Enzyme
	try {
		var React = require('react');
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
		if (!errorSuppression) console.error(`Invalid React code: ${err}`);
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.state('name'), 'Free Code Camp', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.children().type(), 'h1', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert(
			modifiedCode.includes('<h1>') &&
			modifiedCode.includes('</h1>') &&
			modifiedCode.includes('{name}'), error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		mockedComponent.setState({name: 'TestName'});
		assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_4);
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
    const exportScript = '\n export default MyComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
