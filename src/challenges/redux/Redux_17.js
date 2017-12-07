/* eslint-disable */
import assert from 'assert'
import deepEqual from 'deep-equal';
import deepFreeze from 'deep-freeze';
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Copy an Object with Object.assign`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The last several challenges worked with arrays, but there are ways to help enforce state immutability when state is an <code>object</code>, too. A useful tool for handling objects is the <code>Object.assign()</code> utility. <code>Object.assign()</code> takes a target object and source objects and maps properties from the source objects to the target object. Any matching properties are overwritten by properties in the source objects. This behavior is commonly used to make shallow copies of objects by passing an empty object as the first argument followed by the object(s) you want to copy. Here's an example:
<br><br>

<code>const newObject = Object.assign({}, obj1, obj2);</code>
<br><br>

This creates <code>newObject</code> as a new <code>object</code>, which contains the properties that currently exist in <code>obj1</code> and <code>obj2</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The Redux state and actions were modified to handle an <code>object</code> for the <code>state</code>. Edit the code to return a new <code>state</code> object for actions with type <code>ONLINE</code>, which set the <code>status</code> property to the string <code>online</code>. Try to use <code>Object.assign()</code> to complete the challenge.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      // don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      return Object.assign({}, state, {
        status: 'online'
      });
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The Redux store should exist and initialize with a state that\'s equivalent to the defaultState object declared on line 1.';
  const error_2 = 'wakeUp and immutableReducer both should be functions.';
  const error_3 = 'Dispatching an action of type \'ONLINE\' should update the property \'status\' in state to \'online\' and should NOT mutate state.';
  const error_4 = 'Object.assign should be used to return new state.';

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

  let es5, reduxCode, passed = true;
  let store, wakeUp, defaultState, immutableReducer;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { store, defaultState, wakeUp, immutableReducer } })()`
  const modifiedCode = prepend.concat(code).concat(append);

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

  // save the store from redux to test here
  // now you can access the redux store methods
  try {
    var React = require('react');
    var Redux = require('redux');
    reduxCode = eval(es5);
    store = reduxCode.store;
    defaultState = reduxCode.defaultState;
    wakeUp = reduxCode.wakeUp;
    immutableReducer = reduxCode.immutableReducer;
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  let initialState, finalState;

  // test 1:
  try {
    const expectedState = {
      user: 'CamperBot',
      status: 'offline',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    initialState = store.getState();
    assert.deepEqual(
      expectedState,
      initialState,
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
      typeof wakeUp === 'function' &&
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
    store.dispatch({type: 'ONLINE'});
    finalState = store.getState();
    const expectedState = {
      user: 'CamperBot',
      status: 'online',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    assert(
      isFrozen &&
      deepEqual(finalState, expectedState),
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert.strictEqual(code.includes('Object.assign'), true, error_4);
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
