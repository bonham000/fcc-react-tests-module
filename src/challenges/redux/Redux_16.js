/* eslint-disable */
import assert from 'assert'
import deepEqual from 'deep-equal';
import deepFreeze from 'deep-freeze';
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Remove an Item from an Array`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Time to practice removing items from an array. The spread operator can be used here as well. Other useful JavaScript methods include <code>slice()</code> and <code>concat()</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The reducer and action creator were modified to remove an item from an array based on the index of the item. Finish writing the reducer so a new state array is returned with the item at the specific index removed.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      // don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The Redux store should exist and initialize with a state equal to [0,1,2,3,4,5]';
  const error_2 = 'removeItem and immutableReducer both should be functions.';
  const error_3 = 'Dispatching the removeItem action creator should remove items from the state and should NOT mutate state.';

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

  let es5, reduxCode, passed = true;
  let store, removeItem, immutableReducer;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { store, removeItem, immutableReducer } })()`
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
    store = reduxCode.store;
    removeItem = reduxCode.removeItem;
    immutableReducer = reduxCode.immutableReducer;
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  let initialState, state_1, state_2, state_3;

  // test 1:
  try {
    initialState = store.getState();
    assert(
      Array.isArray(initialState) === true &&
      deepEqual(initialState, [0, 1, 2, 3, 4, 5]),
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert(
      typeof removeItem === 'function' &&
      typeof immutableReducer === 'function',
      error_2
    );
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    const isFrozen = deepFreeze(initialState);
    store.dispatch(removeItem(3));
    state_1 = store.getState();
    store.dispatch(removeItem(2));
    state_2 = store.getState();
    store.dispatch(removeItem(0));
    store.dispatch(removeItem(0));
    store.dispatch(removeItem(0));
    state_3 = store.getState();
    assert(
      isFrozen &&
      deepEqual(state_1, [0, 1, 2, 4, 5]),
      deepEqual(state_2, [0, 1, 4, 5]),
      deepEqual(state_3, [5]),
      error_3
    );
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
