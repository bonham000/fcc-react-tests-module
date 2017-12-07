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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Write a Simple Counter`

export const challengeText = `<span class = 'default'>Intro: </span>You can design a more complex stateful component by combining the concepts covered so far. These include initializing <code>state</code>, writing methods that set <code>state</code>, and assigning click handlers to trigger these methods.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The <code>Counter</code> component keeps track of a <code>count</code> value in <code>state</code>. There are two buttons which call methods <code>increment()</code> and <code>decrement()</code>. Write these methods so the counter value is incremented or decremented by 1 when the appropriate button is clicked. Also, create a <code>reset()</code> method so when the reset button is clicked, the count is set to 0.
<br><br>

<strong>Note:</strong>&nbsp;Make sure you don't modify the <code>classNames</code> of the buttons.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  // change code below this line

  // change code above this line
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  reset = () => {
    this.setState({
      count: 0
    });
  }
  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }
  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should return a div element which contains three buttons with text content in this order \'Increment!\', \'Decrement!\', \'Reset\'.';
  const error_2 = 'The state of MyComponent should initialize with a count property set to 0.';
  const error_3 = 'Clicking the increment button should increment the count by 1.';
  const error_4 = 'Clicking the decrement button should decrement the count by 1.';
  const error_5 = 'Clicking the reset button should reset the count to 0.';

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
    },
    {
      test: 5,
      status: false,
      condition: error_5
    }
  ];

  let es5, shallowRender, mockedComponent, passed = true;

  const exportScript = '\n export default Counter'
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

    const buttons = mockedComponent.find('button').nodes;

    const incBtn = buttons[0].textContent;
    const decBtn = buttons[1].textContent;
    const resetBtn = buttons[2].textContent;

    assert(
      incBtn === 'Increment!'
      && decBtn === 'Decrement!'
      && resetBtn === 'Reset',
      error_1);

    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.state('count'), 0, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  //test 3:
  try {

    mockedComponent.setState({count: 0});
    const before = mockedComponent.state('count');

    mockedComponent.find('.inc').simulate('click');
    const after = mockedComponent.state('count');

    assert.strictEqual(before === 0 && after === 1, true, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  //test 4:
  try {

    mockedComponent.setState({count: 0});
    const before = mockedComponent.state('count');

    mockedComponent.find('.dec').simulate('click');
    const after = mockedComponent.state('count');

    assert.strictEqual(before === 0 && after === -1, true, error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  //test 5:
  try {
    mockedComponent.setState({count: 0});
    const before = mockedComponent.state('count');

    mockedComponent.find('.inc').simulate('click');
    mockedComponent.find('.inc').simulate('click');
    const after = mockedComponent.state('count');

    mockedComponent.find('.dec').simulate('click');
    const retest = mockedComponent.state('count');

    mockedComponent.find('.reset').simulate('click');
    const reset = mockedComponent.state('count');

    assert.strictEqual(before === 0 && after === 2 && retest === 1 && reset === 0, true, error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default Counter'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
