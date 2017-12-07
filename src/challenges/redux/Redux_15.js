/* eslint-disable */
import assert from 'assert'
import deepEqual from 'deep-equal';
import deepFreeze from 'deep-freeze';
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use the Spread Operator on Arrays`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>One solution from ES6 to help enforce state immutability in Redux is the spread operator: <code>...</code>. The spread operator has a variety of applications, one of which is well-suited to the previous challenge of producing a new array from an existing array. This is relatively new, but commonly used syntax. For example, if you have an array <code>myArray</code> and write:
<br><br>

<code>let newArray = [...myArray];</code>
<br><br>

<code>newArray</code> is now a clone of <code>myArray</code>. Both arrays still exist separately in memory. If you perform a mutation like <code>newArray.push(5)</code>, <code>myArray</code> doesn't change. The <code>...</code> effectively <i>spreads</i> out the values in <code>myArray</code> into a new array. To clone an array but add additional values in the new array, you could write <code>[...myArray, 'new value']</code>. This would return a new array composed of the values in <code>myArray</code> and the string <code>'new value'</code> as the last value. The spread syntax can be used multiple times in array composition like this, but it's important to note that it only makes a shallow copy of the array. That is to say, it only provides immutable array operations for one-dimensional arrays.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Use the spread operator to return a new copy of state when a to-do is added.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      // don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return [
        ...state,
        action.todo
      ];
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The Redux store should exist and initialize with a state equal to [\'Don\'t mutate state!\']';
  const error_2 = 'addToDo and immutableReducer both should be functions.';
  const error_3 = 'Dispatching an action of type \'ADD_TO_DO\' on the Redux store should add a todo and should NOT mutate state.';
  const error_4 = 'The spread operator should be used to return new state.';

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
  let store, addToDo, immutableReducer;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { store, addToDo, immutableReducer } })()`
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
    addToDo = reduxCode.addToDo;
    immutableReducer = reduxCode.immutableReducer;
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  let initialState, finalState;

  // test 1:
  try {
    initialState = store.getState();
    assert(
      Array.isArray(initialState) === true &&
      initialState[0] === 'Do not mutate state!',
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
      typeof addToDo === 'function' &&
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
    store.dispatch(addToDo('__TEST__TO__DO__'));
    finalState = store.getState();
    const expectedState = [
      'Do not mutate state!',
      '__TEST__TO__DO__'
    ];
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
    assert.strictEqual(code.includes('...state'), true, error_4);
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
