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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Provider to Connect Redux to React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>In the last challenge, you created a Redux store to handle the messages array and created an action for adding new messages. The next step is to provide React access to the Redux store and the actions it needs to dispatch updates. React Redux provides its <code>react-redux</code> package to help accomplish these tasks.
<br><br>

React Redux provides a small API with two key features: <code>Provider</code> and <code>connect</code>. Another challenge covers <code>connect</code>. The <code>Provider</code> is a wrapper component from React Redux that wraps your React app. This wrapper then allows you to access the Redux <code>store</code> and <code>dispatch</code> functions throughout your component tree. <code>Provider</code> takes two props, the Redux store and the child components of your app. Defining the <code>Provider</code> for an App component might look like this:<br>

<pre>
<code class="codeBlock">&lt;Provider store={store}&gt;
  &lt;App/&gt;
&lt;/Provider&gt;</code>
</pre>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor now shows all your Redux and React code from the past several challenges. It includes the Redux store, actions, and the <code>DisplayMessages</code> component. The only new piece is the <code>AppWrapper</code> component at the bottom. Use this top level component to render the <code>Provider</code> from <code>ReactRedux</code>, and pass the Redux store as a prop. Then render the <code>DisplayMessages</code> component as a child. Once you are
finished, you should see your React component rendered to the page.
<br><br>

<strong>Note:</strong>&nbsp;React Redux is available as a global variable here, so you can access the Provider with dot notation. The code in the editor takes advantage of this and sets it to a constant <code>Provider</code> for you to use in the <code>AppWrapper</code> render method.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
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
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // render the Provider here

  // change code above this line
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
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
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // change code below this line
  render() {
    return (
      <Provider store = {store}>
        <DisplayMessages/>
      </Provider>
    );
  }
  // change code above this line
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The AppWrapper should render.';
  const error_2 = 'The Provider wrapper component should have a prop of store passed to it, equal to the Redux store.';
  const error_3 = 'DisplayMessages should render as a child of AppWrapper.';
  const error_4 = 'The DisplayMessages component should render an h2, input, button, and ul element.';

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

  const exportScript = '\n export default AppWrapper'
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
    assert.strictEqual(mockedComponent.find('AppWrapper').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    const noWhiteSpace = code.replace(/\s/g,'');
    assert.strictEqual(noWhiteSpace.includes('<Providerstore={store}>'), true, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    let parent = mockedComponent.find('DisplayMessages').root.node._reactInternalInstance._currentElement.type.name;
    assert(
      mockedComponent.find('DisplayMessages').length === 1 &&
      parent === 'AppWrapper',
      error_3
    );

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h2').length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('ul').length === 1,
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
    const exportScript = '\n export default AppWrapper'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
