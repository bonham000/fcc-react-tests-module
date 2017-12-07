/* eslint-disable */
import assert from 'assert'
import deepEqual from 'deep-equal';
import deepFreeze from 'deep-freeze';
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Never Mutate State`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>These final challenges describe several methods of enforcing the key principle of state immutability in Redux. Immutable state means that you never modify state directly, instead, you return a new copy of state.
<br><br>

If you took a snapshot of the state of a Redux app over time, you would see something like <code>state 1</code>, <code>state 2</code>, <code>state 3</code>,<code>state 4</code>, <code>...</code> and so on where each state may be similar to the last, but each is a distinct piece of data. This immutability, in fact, is what provides such features as time-travel debugging that you may have heard about.
<br><br>

Redux does not actively enforce state immutability in its store or reducers, that responsibility falls on the programmer. Fortunately, JavaScript (especially ES6) provides several useful tools you can use to enforce the immutability of your state, whether it is a <code>string</code>, <code>number</code>, <code>array</code>, or <code>object</code>. Note that strings and numbers are primitive values and are immutable by nature. In other words, 3 is always 3. You cannot change the value of the number 3. An <code>array</code> or <code>object</code>, however, is mutable. In practice, your state will probably consist of an <code>array</code> or <code>object</code>, as these are useful data structures for representing many types of information.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There is a <code>store</code> and <code>reducer</code> in the code editor for managing to-do items. Finish writing the <code>ADD_TO_DO</code> case in the reducer to append a new to-do to the state. There are a few ways to accomplish this with standard JavaScript or ES6. See if you can find a way to return a new array with the item from <code>action.todo</code> appended to the end.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      // don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

// an example todo argument would be 'Learn React',
const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return state.concat(action.todo);
    default:
      return state;
  }
};

// an example todo argument would be 'Learn React',
const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The Redux store should exist and initialize with a state equal to the todos array in the code editor.';
  const error_2 = 'addToDo and immutableReducer both should be functions.';
  const error_3 = 'Dispatching an action of type \'ADD_TO_DO\' on the Redux store should add a todo and should NOT mutate state.';

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
    const todos = [
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code',
    ];
    initialState = store.getState();
    assert(
      Array.isArray(initialState) === true &&
      initialState.join(',')  === todos.join(','),
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
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code',
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
