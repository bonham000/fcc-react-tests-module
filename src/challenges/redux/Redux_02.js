/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Get State from the Redux Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The Redux store object provides several methods that allow you to interact with it. For example, you can retrieve the current <code>state</code> held in the Redux store object with the <code>getState()</code> method.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code from the previous challenge is re-written more concisely in the code editor. Use <code>store.getState()</code> to retrieve the <code>state</code> from the <code>store</code>, and log this value to the console. Try modifying the store's initial <code>state</code> and check the result.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const store = Redux.createStore(
  (state = 5) => state
);

// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const store = Redux.createStore(
  (state = 5) => state
);

// change code below this line
console.log(store.getState());`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The redux store should have a value of 5 for the initial state.';
  const error_2 = 'The console should log a message of the store\'s state using store.getState().';

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
    }
  ];

  let es5, store, passed = true;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() { const console = { log: () => null };`
  const append = `;\n return store })()`
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
    store = eval(es5)
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(store.getState(), 5, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }


  try {

    const initialState = store.getState();

    const prepend = `
      (function() {
        let log = []
        const message = (msg) => log.push(msg);`
    const append = `;\n return log })();`
    const consoleReplaced = code.replace(/console.log/g, 'message');
    const hijackedCode = prepend.concat(consoleReplaced).concat(append);

    let log = eval(hijackedCode);

    assert(
      log[0] === initialState &&
      hijackedCode.toString().includes('store.getState'),
      error_2
    );

    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
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
