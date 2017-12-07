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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use PropTypes to Define the Props You Expect`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>React provides useful type-checking features to verify that components receive props of the correct type. For example, your application makes an API call to retrieve data that you expect to be in an array, which is then passed to a component as a prop. You can set <code>propTypes</code> on your component to require the data to be of type <code>array</code>. This will throw a useful warning when the data is of any other type.<br><br>

It's considered a best practice to set <code>propTypes</code> when you know the type of a prop ahead of time. You can define a <code>propTypes</code> property for a component in the same way you defined <code>defaultProps</code>. Doing this will check that props of a given key are present with a given type. Here's an example to require the type <code>function</code> for a prop called <code>handleClick</code>:<br><br>

<code>MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }</code><br><br>

In the example above, the <code>PropTypes.func</code> part checks that <code>handleClick</code> is a function. Adding <code>isRequired</code> tells React that <code>handleClick</code> is a required property for that component. You will see a warning if that prop isn't provided. Also notice that <code>func</code> represents <code>function</code>. Among the seven JavaScript primitive types, <code>function</code> and <code>boolean</code> (written as <code>bool</code>) are the only two that use unusual spelling. In addition to the primitive types, there are other types available. For example, you can check that a prop is a React element. Please refer to the documentation for all of the options.<br><br>

<strong>Note:</strong> As of React v15.5.0, <code>PropTypes</code> is imported independently from React, like this:<br><br>

<code>import React, { PropTypes } from 'react';</code>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Define <code>propTypes</code> for the <code>Items</code> component to require <code>quantity</code> as a prop and verify that it is of type <code>number</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// change code below this line

// change code above this line

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

// change code below this line
Items.propTypes = {
  quantity: PropTypes.number.isRequired
};
// change code above this line

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

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The ShoppingCart component should render.';
  const error_2 = 'The Items component should render.';
  const error_3 = 'The Items component should include a propTypes check that requires quantity to be a number.';

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

  const exportScript = '\n export default ShoppingCart';
  const modifiedCode = code.concat(exportScript);

  /* Crude patch to deal with PropTypes deprecation in React v15.5.0 */
  const index = modifiedCode.indexOf('PropTypes.number.isRequired');
  const patchPropTypes = modifiedCode.slice(0, index) + 'React.' + modifiedCode.slice(index);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(patchPropTypes, { presets: [ 'es2015', 'react' ] }).code;
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
    // propTypes unavailable in production and throw warnings anyway
    // this was the only way I could devise to check that propTypes are included
    const noWhiteSpace = modifiedCode.replace(/\s/g, '');
    const verifyPropTypes = 'Items.propTypes={quantity:PropTypes.number.isRequired}';
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
    const exportScript = '\n export default ShoppingCart';
    const modifiedCode = code.concat(exportScript);

    /* Crude patch to deal with PropTypes deprecation in React v15.5.0 */
    const index = modifiedCode.indexOf('PropTypes.number.isRequired');
    const patchPropTypes = modifiedCode.slice(0, index) + 'React.' + modifiedCode.slice(index);

    const es5 = transform(patchPropTypes, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
