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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Optimize Re-Renders with shouldComponentUpdate`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>So far, if any component receives new <code>state</code> or new <code>props</code>, it re-renders itself and all its children. This is usually okay. But React provides a lifecycle method you can call when child components receive new <code>state</code> or <code>props</code>, and declare specifically if the components should update or not. The method is <code>shouldComponentUpdate()</code>, and it takes <code>nextProps</code> and <code>nextState</code> as parameters.<br><br>

This method is a useful way to optimize performance. For example, the default behavior is that your
component re-renders when it receives new <code>props</code>, even if the <code>props</code> haven't changed. You can use <code>shouldComponentUpdate()</code> to prevent this by comparing the <code>props</code>. The method must return a <code>boolean</code> value that tells React whether or not to update the component. You can compare the current props (<code>this.props</code>) to the next props (<code>nextProps</code>) to determine if you need to update or not, and return <code>true</code> or <code>false</code> accordingly.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The <code>shouldComponentUpdate()</code> method is added in a component called <code>OnlyEvens</code>. Currently, this method returns <code>true</code> so <code>OnlyEvens</code> re-renders every time it receives new <code>props</code>. Modify the method so <code>OnlyEvens</code> updates only
if the <code>value</code> of its new props is even. Click the <code>Add</code> button and watch the order of events in your browser's console as the other lifecycle hooks are triggered.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
     // change code below this line
    return true;
     // change code above this line
  }
  componentWillReceiveProps(nextProps) {
    console.log('Receiving new props...');
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  addValue = () => {
    this.setState({
      value: this.state.value + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value}/>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // change code below this line
    return nextProps.value % 2 === 0;
    // change code above this line
  }
  componentWillReceiveProps(nextProps) {
    console.log('Receiving new props...');
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  addValue = () => {
    this.setState({
      value: this.state.value + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value}/>
      </div>
    );
  }
};`


// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The Controller component should render the OnlyEvens component as a child';
  const error_2 = 'The shouldComponentUpdate method should be defined on the OnlyEvens component.';
  const error_3 = 'The OnlyEvens component should return an h1 tag which renders the value of this.props.value.';
  const error_4 = 'OnlyEvens should re-render only when nextProps.value is even.';

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
  const blockConsole = `const console = { log: () => null };`;
  const exportScript = '\n export default Controller'
  const modifiedCode = blockConsole.concat(code.concat(exportScript));

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
      mockedComponent.find('OnlyEvens').length === 1,
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

  const exportScriptChild = '\n export default OnlyEvens'
  const modifiedCodeChild = blockConsole.concat(code.concat(exportScriptChild));

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
    lifecycleChild = React.createElement(eval(es5Child)).type.prototype.shouldComponentUpdate.toString().replace(/\s/g,'');
    assert.notStrictEqual(lifecycleChild, 'undefined', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    mockedComponent.setState({ value: 0 });
    const initial = mockedComponent.find('h1').node.innerText;
    mockedComponent.setState({ value: 6 });
    const after = mockedComponent.find('h1').node.innerText;
    assert.notStrictEqual(initial, after, error_3);

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    mockedComponent.setState({ value: 0 });
    const initial = mockedComponent.find('h1').node.innerText;
    mockedComponent.setState({ value: 1 });
    const odd = mockedComponent.find('h1').node.innerText;
    mockedComponent.setState({ value: 2 });
    const even = mockedComponent.find('h1').node.innerText;

    assert(
      initial === odd &&
      odd !== even,
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
