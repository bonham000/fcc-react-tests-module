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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use a Ternary Expression for Conditional Rendering`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Before moving on to dynamic rendering techniques, there's one last way to use built-in JavaScript conditionals to render what you want: the <em><strong>ternary operator</strong></em>. The ternary operator is often utilized as a shortcut for <code>if/else</code> statements in JavaScript. They're not quite as robust as traditional <code>if/else</code> statements, but they are very popular among React developers. One reason for this is because of how JSX is compiled, <code>if/else</code> statements can't be inserted directly into JSX code. You might have noticed this a couple challenges ago &mdash; when an <code>if/else</code> statement was required, it was always <em>outside</em> the <code>return</code> statement. Ternary expressions can be an excellent alternative if you want to implement conditional logic within your JSX. Recall that a ternary operator has three parts, but you can combine several ternary expressions together. Here's the basic syntax:
<br><br>

<code>condition ? expressionIfTrue : expressionIfFalse</code>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has three constants defined within the <code>CheckUserAge</code> component's <code>render()</code> method. They are called <code>buttonOne</code>, <code>buttonTwo</code>, and <code>buttonThree</code>. Each of these is assigned a simple JSX expression representing a button element. First, initialize the state of <code>CheckUserAge</code> with <code>input</code> and <code>userAge</code> both set to
values of an empty string.
<br><br>

Once the component is rendering information to the page, users should have a way to interact with it. Within the component's <code>return</code> statement, set up a ternary expression that implements the following logic: when the page first loads, render the submit button, <code>buttonOne</code>, to the page. Then, when a user enters their age and clicks the button, render a different button based on the age. If a user enters a number less than <code>18</code>, render <code>buttonThree</code>. If a user enters a number greater than or equal to <code>18</code>, render <code>buttonTwo</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const inputStyle = {
  width: 235,
  margin: 5
}

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line

    // change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState({
      userAge: this.state.input
    });
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type="number"
          value={this.state.input}
          onChange={this.handleChange} /><br />
        {
          /* change code here */
        }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const inputStyle = {
  width: 235,
  margin: 5
}

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input: ''
    }
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState({
      userAge: this.state.input
    });
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type="number"
          value={this.state.input}
          onChange={this.handleChange} /><br />
          {
            this.state.userAge === '' ?
            buttonOne :
            this.state.userAge >= 18 ?
            buttonTwo :
            buttonThree
          }
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The CheckUserAge component should exist and render to the page.';
  const error_2 = 'The CheckUserAge component should return a single input element.';
  const error_3 = 'The CheckUserAge component should return a single button element.';
  const error_4 = 'The CheckUserAge component\'s state should be initialized with a property of userAge and a property of input, both set to a value of an empty string.';
  const error_5 = 'When the CheckUserAge component is first rendered to the DOM, the button\'s inner text should read "Submit".';
  const error_6 = 'When a number of less than 18 is entered into the input element and the button is clicked, the button\'s inner text should read "You Shall Not Pass".';
  const error_7 = 'When a number greater than or equal to 18 is entered into the input element and the button is clicked, the button\'s inner text should read "You May Enter".';
  const error_8 = 'Once a number has been submitted, and the value of the input is once again changed, the button should return to reading "Submit".';
  const error_9 = 'Your code should not contain any if/else statements.';


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
    },
    {
      test: 6,
      status: false,
      condition: error_6
    },
    {
      test: 7,
      status: false,
      condition: error_7
    },
    {
      test: 8,
      status: false,
      condition: error_8
    },
    {
      test: 9,
      status: false,
      condition: error_9
    }
  ];

  let es5, mockedComponent, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default CheckUserAge'
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

  let initialState, state_1, state_2, state_3, state_4;

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('CheckUserAge').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.find('input').length, 1, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(mockedComponent.find('button').length, 1, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    initialState = mockedComponent.state();
    assert(initialState.userAge === '' && initialState.input === '', error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    assert.strictEqual(mockedComponent.find('button').nodes[0].innerText, "Submit", error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {
    mockedComponent.find('input').simulate('change', {target: { value: 1 }});
    mockedComponent.find('button').simulate('click');
    state_1 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 10 }});
    mockedComponent.find('button').simulate('click');
    state_2 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 17 }});
    mockedComponent.find('button').simulate('click');
    state_3 = mockedComponent.find('button').nodes[0].innerText;
    assert(
      state_1 === 'You Shall Not Pass' &&
      state_2 === 'You Shall Not Pass' &&
      state_3 === 'You Shall Not Pass',
      error_6
    );
    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
  }

  // test 7:
  try {
    mockedComponent.find('input').simulate('change', {target: { value: 18 }});
    mockedComponent.find('button').simulate('click');
    state_1 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 25 }});
    mockedComponent.find('button').simulate('click');
    state_2 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 35 }});
    mockedComponent.find('button').simulate('click');
    state_3 = mockedComponent.find('button').nodes[0].innerText;
    assert(
      state_1 === 'You May Enter' &&
      state_2 === 'You May Enter' &&
      state_3 === 'You May Enter',
      error_7
    );
    testResults[7].status = true;
  } catch (err) {
    passed = false;
    testResults[7].status = false;
  }

  // test 8:
  try {
    mockedComponent.find('input').simulate('change', {target: { value: 18 }});
    mockedComponent.find('button').simulate('click');
    state_1 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 1 }});
    state_2 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 10 }});
    mockedComponent.find('button').simulate('click');
    state_3 = mockedComponent.find('button').nodes[0].innerText;
    mockedComponent.find('input').simulate('change', {target: { value: 1 }});
    state_4 = mockedComponent.find('button').nodes[0].innerText;
    assert(
      state_1 === 'You May Enter' &&
      state_2 === 'Submit' &&
      state_3 === 'You Shall Not Pass' &&
      state_4 === 'Submit',
      error_8
    );
    testResults[8].status = true;
  } catch (err) {
    passed = false;
    testResults[8].status = false;
  }

  // test 9:
  try {
    assert(
      modifiedCode.includes('if') === false &&
      modifiedCode.includes('else') === false,
      error_9
    );
    testResults[9].status = true;
  } catch (err) {
    passed = false;
    testResults[9].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default CheckUserAge'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
