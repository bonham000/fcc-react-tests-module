/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Write a Counter with Redux`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now you've learned all the core principles of Redux! You've seen how to create actions and action creators, create a Redux store, dispatch your actions against the store, and design state updates with pure reducers. You've even seen how to manage complex state with reducer composition and handle asynchronous actions. These examples are simplistic, but these concepts are the core principles of Redux. If you understand them well, you're ready to start building your own Redux app. The next challenges cover some of the details regarding <code>state</code> immutability, but first, here's a review of everything you've learned so far.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>In this lesson, you'll implement a simple counter with Redux from scratch. The basics are provided in the code editor, but you'll have to fill in the details! Use the names that are provided and define <code>incAction</code> and <code>decAction</code> action creators, the <code>counterReducer()</code>, <code>INCREMENT</code> and <code>DECREMENT</code> action types, and finally the Redux <code>store</code>. Once you're finished you should be able to dispatch <code>INCREMENT</code> or <code>DECREMENT</code> actions to increment or decrement the state held in the <code>store</code>. Good luck building your first Redux app!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const INCREMENT = // define a constant for increment action types
const DECREMENT = // define a constant for decrement action types

const counterReducer = // define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = // define an action creator for incrementing

const decAction = // define an action creator for decrementing

const store = // define the Redux store here, passing in your reducers`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const incAction = () => {
  return {
    type: INCREMENT
  }
};

const decAction = () => {
  return {
    type: DECREMENT
  }
};

const store = Redux.createStore(counterReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The action creator incAction should return an action object with type equal to the value of INCREMENT';
  const error_2 = 'The action creator decAction should return an action object with type equal to the value of DECREMENT';
  const error_3 = 'The Redux store should initialize with a state of 0.';
  const error_4 = 'Dispatching incAction on the Redux store should increment the state by 1.';
  const error_5 = 'Dispatching decAction on the Redux store should decrement the state by 1.';
  const error_6 = 'counterReducer should be a function.';

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
  let INCREMENT, DECREMENT, counterReducer, incAction, decAction, store;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { INCREMENT, DECREMENT, counterReducer, incAction, decAction, store } })()`
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
    reduxCode = eval(es5);

    INCREMENT = reduxCode.INCREMENT;
    DECREMENT = reduxCode.DECREMENT;
    counterReducer = reduxCode.counterReducer;
    incAction = reduxCode.incAction;
    decAction = reduxCode.decAction;
    store = reduxCode.store;

  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(incAction().type, INCREMENT, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(decAction().type, DECREMENT, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(store.getState(), 0, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    const initialState = store.getState();
    store.dispatch(incAction());
    const incState = store.getState();

    assert.strictEqual(initialState + 1, incState, error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    const initialState = store.getState();
    store.dispatch(decAction());
    const decState = store.getState();

    assert.strictEqual(initialState - 1, decState, error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {
    assert.strictEqual(typeof counterReducer, 'function', error_6);
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
  const append = `;\n return __Custom__Log })();`
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
