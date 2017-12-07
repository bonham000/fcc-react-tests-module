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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Manage State Locally First`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Here you'll finish creating the <code>DisplayMessages</code> component.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>First, in the <code>render()</code> method, have the component render an <code>input</code> element, <code>button</code> element, and <code>ul</code> element. When the <code>input</code> element changes, it should trigger a <code>handleChange()</code> method. Also, the <code>input</code> element should render the value of <code>input</code> that's in the component's state. The <code>button</code> element should trigger a <code>submitMessage()</code> method when it's clicked.
<br><br>

Second, write these two methods. The <code>handleChange()</code> method should update the <code>input</code> with what the user is typing. The <code>submitMessage()</code> method should concatenate the current message (stored in <code>input</code>) to the <code>messages</code> array in local state, and clear the value of the <code>input</code>.
<br><br>

Finally, use the <code>ul</code> to map over the array of <code>messages</code> and render it to the screen as a list of <code>li</code> elements.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // add handleChange() and submitMessage() methods here

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* render an input, button, and ul here */ }

        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage = () => {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The DisplayMessages component should initialize with a state equal to {input: \'\', messages: []}';
  const error_2 = 'The DisplayMessages component should render a div containing an h2 element, button element, and ul element.';
  const error_3 = 'The input element should render the value of input in local state.';
  const error_4 = 'Calling the method handleChange should update the input value in state to the user\'s input.';
  const error_5 = 'Clicking the \'Add message\' button should call the method submitMessage which should add the user\'s input to the messages array in state.';
  const error_6 = 'The submitMessage method should clear the user\'s input.';

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
    }
  ];

  let es5, mockedComponent, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests

  const exportScript = '\n export default DisplayMessages'
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

  // now we will try to shallow render the component with Enzyme's shallow method
  // you can also use mount to perform a full render to the DOM environment
  // to do this you must import mount above; i.e. import { shallow, mount } from enzyme
  try {
    var React = require('react');
    var Redux = require('redux');
    var ReactRedux = require('react-redux');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    const initialState = mockedComponent.state();
    assert(
      typeof initialState === 'object' &&
      initialState.input === '' &&
      initialState.messages.length === 0,
      error_3
    );

    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {

    mockedComponent.setState({messages: ['__TEST__MESSAGE']});
    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h2').length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('ul').length === 1 &&
      mockedComponent.find('li').length === 1,
      error_2
    );

    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    mockedComponent.instance().handleChange({target: {value: '__TEST__EVENT__INPUT'}});
    const finalValue = mockedComponent.find('input').node.value;

    assert.strictEqual(finalValue, '__TEST__EVENT__INPUT', error_3);

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    const initialState = mockedComponent.state();
    mockedComponent.instance().handleChange({target: {value: '__TEST__EVENT__MESSAGE'}});
    const afterInput = mockedComponent.state();

    assert(
      initialState.input === '__TEST__EVENT__INPUT' &&
      afterInput.input === '__TEST__EVENT__MESSAGE',
      error_4
    );

    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  let beforeSubmit, afterSubmit

  // test 5:
  try {

    beforeSubmit = mockedComponent.state();
    mockedComponent.find('button').simulate('click');
    afterSubmit = mockedComponent.state();

    assert(
      beforeSubmit.messages.length === 1 &&
      afterSubmit.messages.length === 2 &&
      afterSubmit.messages[1] === '__TEST__EVENT__MESSAGE',
      error_5
    );

    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {

    assert(
      beforeSubmit.input === '__TEST__EVENT__MESSAGE' &&
      afterSubmit.input === '',
      error_6
    );

    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default DisplayMessages'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
