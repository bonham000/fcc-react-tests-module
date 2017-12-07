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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Controlled Form`

export const challengeText = `<span class = 'default'>Intro: </span>The last challenge showed that React can control the internal state for certain elements like <code>input</code> and <code>textarea</code>, which makes them controlled components. This applies to other form elements as well,
including the regular HTML <code>form</code> element.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The <code>MyForm</code> component is set up with an empty <code>form</code> with a submit handler. The submit handler will be called when the formed is submitted.
We've added a button which submits the form. You can see it has the <code>type</code> set to <code>submit</code> indicating it is the button controlling the form. Add the <code>input</code> element in the <code>form</code>
and set its <code>value</code> and <code>onChange()</code> attributes like the last challenge. You should then complete the <code>handleSubmit</code> method
so that it sets the component state property <code>submit</code> to the current input value in the local <code>state</code>.

<br><br>

<strong>Note:</strong>&nbsp; You also must call <code>event.preventDefault()</code> in the submit handler, to prevent the default form submit behavior which
will refresh the web page.

<br><br>

Finally, create an <code>h1</code> tag after the <code>form</code> which renders the <code>submit</code> value from the component's <code>state</code>. You can then type in the form and click the button (or press enter), and you should see your input rendered to the page.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
  }
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit = (event) => {
    // change code below this line

    // change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          { /* change code below this line */ }

          { /* change code above this line */ }
          <button type='submit'>Submit!</button>
        </form>
        { /* change code below this line */ }

        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
  }
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      submit: this.state.input
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.input}
            onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyForm should return a div element which contains a form and an h1 tag. The form should include an input and a button.';
  const error_2 = 'The state of MyForm should initialize with input and submit properties, both set to empty strings.';
  const error_3 = 'Typing in the input element should update the input property in the state.';
  const error_4 = 'Submitting the form should run handleSubmit which should set the submit property in state equal to the current input.';
  const error_5 = 'The h1 element should render the value of the submit field from the component\'s state.';

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

  const exportScript = '\n export default MyForm'
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
      mockedComponent.find('div').children().find('form').length === 1,
      mockedComponent.find('div').children().find('h1').length === 1,
      mockedComponent.find('form').children().find('input').length === 1 &&
      mockedComponent.find('form').children().find('button').length === 1 &&
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert(
      mockedComponent.state('input') === '' &&
      mockedComponent.state('submit') === '',
      error_2
    );
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

  //test 4:
  try {

    mockedComponent.setState({input: ''});
    mockedComponent.setState({submit: ''});
    mockedComponent.find('input').simulate('change', {target: {value: 'SubmitInput'}});
    const submitBefore = mockedComponent.state('submit');
    mockedComponent.find('form').simulate('submit');
    const submitAfter = mockedComponent.state('submit');

    assert.strictEqual(submitBefore === '' && submitAfter === 'SubmitInput', true, error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  //test 5:
  try {

    mockedComponent.setState({input: ''});
    mockedComponent.setState({submit: ''});

    mockedComponent.find('input').simulate('change', {target: {value: 'TestInput'}});
    const h1Before = mockedComponent.find('h1').node.innerText;

    mockedComponent.find('form').simulate('submit');
    const h1After = mockedComponent.find('h1').node.innerText;

    assert.strictEqual(h1Before === '' && h1After === 'TestInput', true, error_5);
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
    const exportScript = '\n export default MyForm'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
