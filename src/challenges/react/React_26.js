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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Bind 'this' with an ES6 Arrow Function`

export const challengeText = `<span class = 'default'>Intro: </span>There is another way to bind <code>this</code> when writing methods in React component classes. A useful, concise way is to use an ES6 arrow function. It does not assign its own value for <code>this</code>, but instead adopts the value of <code>this</code> from the context surrounding the function when it is written. In other words, an arrow function binds <code>this</code> automatically from its surrounding context.
<br><br>

The use of an arrow function as a class property like this is technically still an experimental feature of JavaScript (ES7 property initializers) but can be enabled through pre-processing. It's very useful because of its conciseness, but keep in mind that it is not part of the official language yet. Using this syntax means you can define a class method as an arrow function and not have to explicitly bind <code>this</code> in the constructor.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Initialize the <code>state</code> of <code>MyComponent</code> so there is a <code>message</code> key with a value of <code>Hello!</code>. The component renders a <code>button</code> that, when clicked, triggers a <code>setMessage()</code> method. Define this method with an ES6 arrow function. It should change the <code>state</code> of <code>message</code> to <code>Goodbye!</code>. Note that to pass the tests the arrow function must be written without any arguments.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line

    // change code above this line
  }
  // change code below this line

  // change code above this line
  render() {
    return (
      <div>
        <button onClick = {this.setMessage}>Click Me</button>
        <h1>{this.state.message}</h1>
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
      message: 'Hello!'
    };
  }
  setMessage = () => {
    this.setState({
      message: 'Goodbye!'
    });
  }
  render() {
    return (
      <div>
        <button onClick = {this.setMessage}>Click Me</button>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should return a div element which wraps two elements, a button and an h1 element, in that order.'
  const error_2 = 'The state of MyComponent should initialize with a message containing the string \'Hello!\'';
  const error_3 = 'Clicking the button element should run the setMessage method and update the message property in the state to say \'Goodbye!\'';
  const error_4 = 'The setMessage method should be defined with a fat arrow function.'

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
    assert(
      mockedComponent.find('div').length === 1
      && mockedComponent.find('div').children().nodes[0].tagName === 'BUTTON'
      && mockedComponent.find('div').children().nodes[1].tagName === 'H1',
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.state('message'), 'Hello!', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  //test 3:
  try {
    mockedComponent.setState({message: 'InitialState!'});
    const before = mockedComponent.state('message');
    mockedComponent.find('button').simulate('click');
    const after = mockedComponent.state('message');
    assert.strictEqual(before === 'InitialState!' && after === 'Goodbye!', true, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    const noWhiteSpace = modifiedCode.replace(/\s/g,'');
    assert.strictEqual(noWhiteSpace.includes('setMessage=()=>{this.setState({message:\'Goodbye!\'})') || noWhiteSpace.includes('setMessage=()=>{this.setState({message:\'Goodbye!\'})') || noWhiteSpace.includes('setMessage=()=>{this.setState({message:"Goodbye!"})') || noWhiteSpace.includes('setMessage=()=>this.setState({message:"Goodbye!"});') || noWhiteSpace.includes('setMessage=()=>this.setState({message:"Goodbye!"})') || noWhiteSpace.includes('setMessage=()=>this.setState({message:\'Goodbye!\'});') || noWhiteSpace.includes('setMessage=()=>this.setState({message:\'Goodbye!\'})'), true, error_4);
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
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
