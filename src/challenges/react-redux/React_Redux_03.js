/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'
import deepFreeze from 'deep-freeze';

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Extract State Logic to Redux`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you finished the React component, you need to move the logic it's performing locally in its <code>state</code> into Redux. This is the first step to connect the simple React app to Redux. The only functionality your app has is to add new messages from the user to an unordered list. The example is simple in order to demonstrate how React and Redux work together.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>First, define an action type 'ADD' and set it to a const <code>ADD</code>. Next, define an action creator <code>addMessage()</code> which creates the action to add a message. You'll need
to pass a <code>message</code> to this action creator and include the message in the returned <code>action</code>.
<br><br>

Then create a reducer called <code>messageReducer()</code> that handles the state for the messages. The initial state should equal an empty array. This reducer should add a message to the array of messages held in state, or return the current state. Finally, create your Redux store and pass it the reducer.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`// define ADD, addMessage(), messageReducer(), and store here:
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD = 'ADD';

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

const store = Redux.createStore(messageReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The const ADD should exist and hold a value equal to the string \'ADD\'';
  const error_2 = 'The action creator addMessage should return an object with type equal to ADD and message equal to the message that is passed in.';
  const error_3 = 'messageReducer should be a function.';
  const error_4 = 'The store should exist and have an initial state set to an empty array.';
  const error_5 = 'Dispatching addMessage against the store should immutably add a new message to the array of messages held in state.';
  const error_6 = 'The messageReducer should return the current state if called with any other actions.';

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

  let es5, reduxCode, passed = true;
  let ADD, addMessage, messageReducer, store;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { ADD, addMessage, messageReducer, store } })()`
  const modifiedCode = prepend.concat(code).concat(append);

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

  // save the store from redux to test here
  // now you can access the redux store methods
  try {

    var React = require('react');
    var Redux = require('redux');
    var ReactRedux = require('react-redux');

    reduxCode = eval(es5);

    ADD = reduxCode.ADD;
    addMessage = reduxCode.addMessage;
    messageReducer = reduxCode.messageReducer;
    store = reduxCode.store;

  } catch (err) {
    passed = false;
  }


  // test 1:
  try {
    assert.strictEqual(ADD, 'ADD', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {

    const addAction = addMessage('__TEST__MESSAGE');
    assert(
      addAction.type === ADD &&
      addAction.message === '__TEST__MESSAGE',
      error_2
    );

    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(typeof messageReducer, 'function', error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  let initialState, addState, testState;

  // test 4:
  try {

    initialState = store.getState();

    assert(
      typeof store === 'object' &&
      initialState.length === 0,
      error_4
    );

    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    const isFrozen = deepFreeze(initialState);
    store.dispatch(addMessage('__A__TEST__MESSAGE'));
    addState = store.getState();
    assert(isFrozen && addState[0] === '__A__TEST__MESSAGE', error_5);

    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {

    store.dispatch({type: 'FAKE_ACTION'});
    testState = store.getState();
    assert.strictEqual(addState, testState, error_6);

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

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => {

  // this code modifies the user input to return all
  // console.log statements as a message array to be
  // displayed on the client UI
  const prepend = `
  (function() {
    let __Custom__Log = []
    const message = (msg) => __Custom__Log.push(msg);
  `
  const append = `; return __Custom__Log })();`
  const consoleReplaced = code.replace(/console.log/g, 'message');
  const hijackedCode = prepend.concat(consoleReplaced).concat(append);

  let evaluatedCode;
  try {
    evaluatedCode = eval(hijackedCode);
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

  return evaluatedCode;

}
