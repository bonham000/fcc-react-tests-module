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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Controlled Input`

export const challengeText = `<span class = 'default'>Intro: </span>Your application may have more complex interactions between <code>state</code> and the rendered UI. For example, form control elements for text input, such as <code>input</code> and <code>textarea</code>, maintain their own state in the DOM as the user types. With React, you can move this mutatable state into a React component's <code>state</code>. The user's input becomes part of the application <code>state</code>, so React controls the value of that input field. Typically, if you have React components with input fields the user can type into, it will be a controlled input form.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has the skeleton of a component called <code>ControlledInput</code> to create a controlled <code>input</code> element. The component's <code>state</code> is already initialized with an <code>input</code> property that holds an empty string. This value represents the text a user types into the <code>input</code> field.
<br><br>

First, create a method called <code>handleInput()</code> that has a parameter called <code>event</code>. When the method is called, it receives an <code>event</code> object that contains a string of text from the <code>input</code> element. You can access this string with <code>event.target.value</code> inside the method. Update the <code>input</code> property of the component's <code>state</code> with this new string.
<br><br>

In the render method, create the <code>input</code> element above the <code>p</code> tag. Add a <code>value</code> attribute which is equal to the <code>input</code> property of the component's <code>state</code>. Then add an <code>onChange()</code> event handler set to the <code>handleInput()</code> method.
<br><br>

When you type in the input box, that text is processed by the <code>handleInput()</code> method, set as the <code>input</code> property in the local <code>state</code>, and rendered as the value in the <code>input</code> box on the page. The component <code>state</code> is the single source of truth regarding the input data.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }
  // change code below this line

  // change code above this line
  render() {
    return (
      <div>
        { /* change code below this line */}

        { /* change code above this line */}
        <p>Input: {this.state.input}</p>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }
  handleInput = (event) => {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleInput} />
        <p>Input: {this.state.input}</p>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'ControlledInput should return a div element which contains an input and a p tag.';
  const error_2 = 'The state of ControlledInput should initialize with an input property set to an empty string.';
  const error_3 = 'Typing in the input element should update the state and the value of the input element.';

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

  const exportScript = '\n export default ControlledInput'
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
    assert(
      mockedComponent.find('div').children().find('input').length === 1
      && mockedComponent.find('div').children().find('p').length === 1,
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.state('input'), '', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  //test 3:
  try {

    mockedComponent.setState({input: ''});
    const before = mockedComponent.state('input');
    mockedComponent.find('input').simulate('change', {target: {value: 'TestInput'}});
    const after = mockedComponent.state('input');
    const inputText = mockedComponent.find('input').node.value;

    assert.strictEqual(before === '' && after === 'TestInput' && inputText === 'TestInput', true, error_3);
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
    const exportScript = '\n export default ControlledInput'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
