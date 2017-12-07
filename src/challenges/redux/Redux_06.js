/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Handle an Action in the Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>After an action is created and dispatched, the Redux store needs to know how to respond to that action. This is the job of a <code>reducer</code> function. Reducers in Redux are responsible for the state modifications that take place in response to actions. A <code>reducer</code> takes <code>state</code> and <code>action</code> as arguments, and it always returns a new <code>state</code>. It is important to see that this is the <strong>only</strong> role of the reducer. It has no side effects &mdash; it never calls an API endpoint and it never has any hidden surprises. The reducer is simply a pure function that takes state and action, then returns new state.
<br><br>

Another key principle in Redux is that <code>state</code> is read-only. In other words, the <code>reducer</code> function must <strong>always</strong> return a new copy of <code>state</code> and never modify state directly. Redux does not enforce state immutability, however, you are responsible for enforcing it in the code of your reducer functions. You'll practice this in later challenges.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has the previous example as well as the start of a <code>reducer</code> function for you. Fill in the body of the <code>reducer</code> function so that if it receives an action of type <code>'LOGIN'</code> it returns a state object with <code>login</code> set to <code>true</code>. Otherwise, it returns the current <code>state</code>. Note that the current <code>state</code> and the dispatched <code>action</code> are passed to the reducer, so you can access the action's type directly with <code>action.type</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // change code below this line

  // change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {

  if (action.type === 'LOGIN') {
    return {login: true}
  }

  else {
    return state
  }

};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'Calling the function loginAction should return an object with type property set to the string \'LOGIN\'.';
  const error_2 = 'The store should be initialized with an object with property login set to false.';
  const error_3 = 'Dispatching loginAction should update the login property in the store\'s state to true.';
  const error_4 = 'If the action is not of type \'LOGIN\', the store should return the current state.'

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

  let es5, reduxCode, store, loginAction, passed = true;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return {store, loginAction} })()`
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
    reduxCode = eval(es5)
    store = reduxCode.store;
    loginAction = reduxCode.loginAction;
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(loginAction().type, 'LOGIN', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(store.getState().login, false, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    const initialState = store.getState();
    store.dispatch(loginAction());
    const afterState = store.getState();

    assert(
      initialState.login === false &&
      afterState.login === true,
      error_3
    );

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    store.dispatch({type: '__TEST__ACTION__'});
    let afterTest = store.getState();

    assert(
      typeof afterTest === 'object' &&
      afterTest.hasOwnProperty('login'),
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

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => {

  // this code modifies the user input to return all
  // console.log statements as a message array to be
  // displayed on the client UI
  const prepend = `
  (function() {
    let log = []
    const message = (msg) => log.push(msg);
  `
  const append = `;\n return log })();`
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
