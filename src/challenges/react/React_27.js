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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use State to Toggle an Element`

export const challengeText = `<span class = 'default'>Intro: </span>You can use <code>state</code> in React applications in more complex ways than what you've seen so far. One example is to monitor the status of a value, then render the UI conditionally based on this value. There are several different ways to accomplish this, and the code editor shows one method.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span><code>MyComponent</code> has a <code>visibility</code> property which is initialized to <code>false</code>. The render method returns one view if the value of <code>visibility</code> is true, and a different view if it is false.
<br><br>

Currently, there is no way of updating the <code>visibility</code> property in the component's <code>state</code>. The value should toggle back and forth between true and false. There is a click handler on the button which triggers a class method called <code>toggleVisibility()</code>. Define this method so the <code>state</code> of <code>visibility</code> toggles to the opposite value when the method is called. If <code>visibility</code> is <code>false</code>, the method sets it to <code>true</code>, and vice versa.
<br><br>

Finally, click the button to see the conditional rendering of the component based on its <code>state</code>.<br><br>

<strong>Hint:</strong>&nbsp;Make sure to either explicitly bind the <code>this</code> keyword to the method, or use an ES6 arrow function.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
  }
  // change code below this line

  // change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick = {this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick = {this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
  }
  toggleVisibility = () => {
    this.setState({
      visibility: !this.state.visibility
    });
  }
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick = {this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick = {this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should return a div element which contains a button.'
  const error_2 = 'The state of MyComponent should initialize with a visibility property set to false.';
  const error_3 = 'Clicking the button element should toggle the visibility property in state between true and false.';

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

  let es5, shallowRender, mockedComponent, passed = true;

  const exportScript = '\n export default MyComponent'
  const modifiedCode = code.concat(exportScript);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
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
    assert.strictEqual(mockedComponent.find('div').find('button').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.state('visibility'), false, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  //test 3:
  try {
    mockedComponent.setState({visibility: false});
    const before = mockedComponent.state('visibility');
    mockedComponent.find('button').simulate('click');
    const after = mockedComponent.state('visibility');
    mockedComponent.find('button').simulate('click');
    const retest = mockedComponent.state('visibility');
    assert.strictEqual(before === false && after === true && retest === false, true, error_3);
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
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
