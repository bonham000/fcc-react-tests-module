/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Dispatch an Action Event`

// ---------------------------- challenge text ----------------------------
export const challengeText = `The <code>store.dispatch()</code> method is what you use to dispatch actions to the Redux store. Calling <code>store.dispatch()</code> and passing the value returned from an action creator sends an action back to the store.
<br><br>
Recall that action creators return an object with a type property that specifies the action that has occurred. Then the method dispatches an action object to the Redux store. Based on the previous challenge's example, the following lines are equivalent, and both dispatch the action of type <code>LOGIN</code>:
<br><br>

<code class="codeBlock">store.dispatch(actionCreator());<br>store.dispatch({ type: 'LOGIN' });</code>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The Redux store in the code editor has an initialized state that's an object containing a <code>login</code> property currently set to <code>false</code>. There's also an action creator called <code>loginAction()</code> which returns an action of type <code>LOGIN</code>. Dispatch the <code>LOGIN</code> action to the Redux store by calling the <code>dispatch</code> method, and pass in the action created by <code>loginAction()</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
store.dispatch(loginAction());`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'Calling the function loginAction should return an object with type property set to the string \'LOGIN\'.';
  const error_2 = 'The store should be initialized with an object with property login set to false.';
  const error_3 = 'The store.dispatch() method should be used to dispatch an action of type \'LOGIN\'.';

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

    let noWhiteSpace = code.replace(/\s/g,'');

    assert(
      noWhiteSpace.includes('store.dispatch(loginAction())') ||
      noWhiteSpace.includes('store.dispatch({type:\'LOGIN\'})') === true,
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
