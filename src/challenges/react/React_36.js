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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Manage Updates with Lifecycle Methods`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Another lifecycle method is
<code>componentWillReceiveProps()</code> which is called whenever a component is receiving new props. This method receives the new props as an argument, which is usually written as <code>nextProps</code>. You can use this argument and compare with <code>this.props</code> and perform actions before the component updates. For example, you may call <code>setState()</code> locally before the update is processed.
<br><br>

Another method is <code>componentDidUpdate()</code>, and is called immediately after a component re-renders. Note that rendering and mounting are considered different things in the component lifecycle. When a page first loads, all components are mounted and this is where methods like <code>componentWillMount()</code> and <code>componentDidMount()</code> are called. After this, as state changes, components re-render themselves. The next challenge covers this in more detail.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The child component <code>Dialog</code> receives <code>message</code> props from its parent, the <code>Controller</code> component. Write the <code>componentWillReceiveProps()</code> method in the <code>Dialog</code> component and have it log <code>this.props</code> and <code>nextProps</code> to the console. You'll need to pass <code>nextProps</code> as an argument to this method and although it's possible to name it anything, name it <code>nextProps</code> here.
<br><br>

Next, add <code>componentDidUpdate()</code> in the <code>Dialog</code> component, and log a statement that says the component has updated. This method works similar to <code>componentWillUpdate()</code>, which is provided for you. Now click the button to change the message and watch your browser console. The order of the console statements show the order the methods are called.

<br /><br />
<strong>Note:</strong>&nbsp;You'll need to write the lifecycle methods as normal functions and not as arrow functions to pass the tests (there is also no advantage to writing lifecycle methods as arrow functions).`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUpdate() {
    console.log('Component is about to update...');
  }
  // change code below this line

  // change code above this line
  render() {
    return <h1>{this.props.message}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'First Message'
    };
  }
  changeMessage = () => {
    this.setState({
      message: 'Second Message'
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.changeMessage}>Update</button>
        <Dialog message={this.state.message}/>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUpdate() {
    console.log('Component is about to update...');
  }
  // change code below this line
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  componentDidUpdate() {
    console.log('Component re-rendered');
  }
  // change code above this line
  render() {
    return <h1>{this.props.message}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'First Message'
    };
  }
  changeMessage = () => {
    this.setState({
      message: 'Second Message'
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.changeMessage}>Update</button>
        <Dialog message={this.state.message}/>
      </div>
    );
  }
};`


// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The Controller component should render the Dialog component as a child.';
  const error_2 = 'The componentWillReceiveProps method in the Dialog component should log this.props to the console.';
  const error_3 = 'The componentWillReceiveProps method in the Dialog component should log nextProps to the console.';
  const error_4 = 'The Dialog component should call the componentDidUpdate method and log a message to the console.';

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

  let es5, mockedComponent, lifecycle, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default Controller'
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
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert(
      mockedComponent.find('Controller').length === 1 &&
      mockedComponent.find('Dialog').length === 1,
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // specifically perform a separate export for the child component
  // here to test for lifecycle methods
  let es5Child, lifecycleChild;

  const exportScriptChild = '\n export default Dialog';
  const modifiedCodeChild = code.concat(exportScriptChild);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5Child = transform(modifiedCodeChild, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    testResults[0].status = true;
    if (!errorSuppression) console.log('No transpilation errors!');
  } catch (err) {
    passed = false;
    testResults[0].status = false;
    if (!errorSuppression) console.error(`Transpilation error: ${err}`);
  }

  // test 2:
  try {
    var React = require('react');
    lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentWillReceiveProps.toString().replace(/\s/g,'');
    assert(
      lifecycleChild.includes('console.log') === true &&
      lifecycleChild.includes('this.props') === true,
      error_2
    );
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    var React = require('react');
    lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentWillReceiveProps.toString().replace(/\s/g,'');
    const nextPropsAsParameterTest = /componentWillReceiveProps(| *?= *?)(\(|)nextProps(\)|)( *?=> *?{| *?{|{)/;
    const nextPropsInConsoleLogTest = /console\.log\(.*?nextProps\b.*?\)/;
    assert(
      lifecycleChild.includes('console.log') === true &&
      nextPropsInConsoleLogTest.test(lifecycleChild) === true &&
      nextPropsAsParameterTest.test(lifecycleChild) === true,
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    var React = require('react');
    lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentDidUpdate.toString().replace(/\s/g,'');
    assert(
      lifecycleChild.length !== 'undefined' &&
      lifecycleChild.includes('console.log') === true,
      error_4
    );
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
    const exportScript = '\n export default Controller'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
