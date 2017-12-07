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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Stateful Component`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>One of the most important topics in React is <code>state</code>. State consists of any data your application needs to know about, that can change over time. You want your apps to respond to state changes and present an updated UI when necessary. React offers a nice solution for the state management of modern web applications.
<br><br>

You create state in a React component by declaring a <code>state</code> property on the component class in its <code>constructor</code>. This initializes the component with <code>state</code> when it is created. The <code>state</code> property must be set to a JavaScript <code>object</code>. Declaring it looks like this:<br><br>

<code class="codeBlock">this.state = {<br>
&nbsp;&nbsp;&nbsp;// describe your state here<br>
}</code>
<br><br>

You have access to the <code>state</code> object throughout the life of your component. You can update it, render it in your UI, and pass it as props to child components. The <code>state</code> object can be as complex or as simple as you need it to be. Note that you must create a class component by extending <code>React.Component</code> in order to create <code>state</code> like this.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There is a component in the code editor that is trying to render a <code>name</code> property from its <code>state</code>. However, there is no <code>state</code> defined. Initialize the component with <code>state</code> in the <code>constructor</code> and assign your name to a property of
<code>name</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // initialize state here

  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Free Code Camp!'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'StatefulComponent should exist and render.';
  const error_2 = 'StatefulComponent should render a div and an h1 element.';
  const error_3 = 'StatefulComponent\'s state should be initalized with a property \'name\' set to a string.';
  const error_4 = 'The property \'name\' in the state of StatefulComponent should render in the h1 element.';

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

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default StatefulComponent'
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
    assert.strictEqual(mockedComponent.find('StatefulComponent').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h1').length === 1,
      error_2
    );
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  let initialState;

  // test 3:
  try {
    initialState = mockedComponent.state();
    assert(
      typeof initialState === 'object' &&
      typeof initialState.name === 'string',
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert.strictEqual(mockedComponent.find('h1').node.innerText, initialState.name, error_4);
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
    const exportScript = '\n export default StatefulComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    console.log(err);
  }

}
