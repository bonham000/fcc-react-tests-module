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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Connect Redux to React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you've written both the <code>mapStateToProps()</code> and the <code>mapDispatchToProps()</code> functions, you can use them to map <code>state</code> and <code>dispatch</code> to the <code>props</code> of one of your React components. The <code>connect</code> method from React Redux can handle this task. This method takes two optional arguments, <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>. They are optional because you may have a component that only needs access to <code>state</code> but doesn't need to dispatch any actions, or vice versa.
<br><br>

To use this method, pass in the functions as arguments, and immediately call the result with your component. This syntax is a little unusual and looks like:
<br><br>

<code>connect(mapStateToProps, mapDispatchToProps)(MyComponent)</code>
<br><br>

<strong>Note:</strong>&nbsp;If you want to omit one of the arguments to the <code>connect</code> method, you pass <code>null</code> in its place.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has the <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code> functions and a new React component called <code>Presentational</code>. Connect this component to Redux with the <code>connect</code> method from the <code>ReactRedux</code> global object, and call it immediately on the <code>Presentational</code> component. Assign the result to a new <code>const</code> called <code>ConnectedComponent</code> that represents the connected component. That's it, now you're connected to Redux! Try changing either of <code>connect</code>'s arguments to <code>null</code> and observe the test results.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// change code below this line

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational)`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The Presentational component should render.';
  const error_2 = 'The Presentational component should receive a prop \'messages\' via connect.';
  const error_3 = 'The Presentational component should receive a prop \'submitNewMessage\' via connect.';

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

  let es5, mockedComponent, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests

  const exportScript = `\n
    const store = Redux.createStore(
      (state = '__INITIAL__STATE__', action) => state
    );

    class AppWrapper extends React.Component {
      render() {
        return (
          <ReactRedux.Provider store = {store}>
            <ConnectedComponent/>
          </ReactRedux.Provider>
        );
      }
    }; export default AppWrapper;`
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
    assert.strictEqual(mockedComponent.find('Presentational').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  let props;

  // test 2:
  try {
    props = mockedComponent.find('Presentational').node.props;
    assert.strictEqual(props.messages, '__INITIAL__STATE__', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(typeof props.submitNewMessage, 'function', error_3);
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
  const exportScript = `\n
    const store = Redux.createStore(
      (state = '__INITIAL__STATE__', action) => state
    );

    class AppWrapper extends React.Component {
      render() {
        return (
          <ReactRedux.Provider store = {store}>
            <ConnectedComponent/>
          </ReactRedux.Provider>
        );
      }
    }; export default AppWrapper;`
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
