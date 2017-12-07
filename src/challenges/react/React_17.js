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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Override Default Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The ability to set default props is a useful feature in React. The way to override the default props is to explicitly set the prop values for a component.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The <code>ShoppingCart</code> component now renders a child component <code>Items</code>. This <code>Items</code> component has a default prop <code>quantity</code> set to the integer <code>0</code>. Override the default prop by passing in a value of <code>10</code> for <code>quantity</code>.<br><br>

<strong>Note:</strong>&nbsp;Remember that the syntax to add a prop to a component looks similar to how you add HTML attributes. However, since the value for <code>quantity</code> is an integer, it won't go in quotes but it should be wrapped in curly braces. For example, <code>{100}</code>. This syntax tells JSX to interpret the value within the braces directly as JavaScript.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    { /* change code below this line */ }
    return <Items />
    { /* change code above this line */ }
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    { /* change code below this line */ }
    return <Items quantity = {10} />
    { /* change code above this line */ }
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_1 = 'The component ShoppingCart should render.';
  const error_2 = 'The component Items should render.';
  const error_3 = 'The Items component should have a prop of { quantity: 10 } passed from the ShoppingCart component.';

  let testResults = [
    {
      test: 0,
      status: false,
      condition: 'Your JSX code should transpile successfully.'
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
    if (!errorSuppression) console.log('No transpilation errors!');
  } catch (err) {
    passed = false;
    testResults[0].status = false;
    if (!errorSuppression) console.error(`Transpilation error: ${err}`);
  }

  // now we will try to shallow render the component with Enzyme's shallow method
  // you can also use mount to perform a full render to the DOM environment
  // to do this you must import mount above; i.e. import { shallow, mount } from enzyme
  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
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
    assert(
      mockedComponent.find('Items').props().quantity == 10 &&
      code.replace(/\s/g,'').includes('<Itemsquantity={10}/>'),
      error_3
    );
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
    // console.log(`Live rendering failure: ${err}`);
  }

}
