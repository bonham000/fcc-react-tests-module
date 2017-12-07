/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Redux Store`

export const challengeText = `<span class = 'default'>Intro: </span>Redux is a state management framework that can be used with a number of different web technologies, including React.
<br><br>

In Redux, there is a single state object that's responsible for the entire state of your application. This means if you had a React app with ten components, and each component had its own local state, the entire state of your app would be defined by a single state object housed in the Redux <code>store</code>. This is the first important principle to understand when learning Redux: the Redux store is the single source of truth when it comes to application state.
<br><br>

This also means that any time any piece of your app wants to update state, it <strong>must</strong> do so through the Redux store. The unidirectional data flow makes it easier to track state management in your app.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The Redux <code>store</code> is an object which holds and manages application <code>state</code>. There is a method called <code>createStore()</code> on the Redux object, which you use to create the Redux <code>store</code>. This method takes a <code>reducer</code> function as a required argument. The <code>reducer</code> function is covered in a later challenge, and is already defined for you in the code editor. It simply takes <code>state</code> as an argument and returns <code>state</code>.
<br><br>

Declare a <code>store</code> variable and assign it to the <code>createStore()</code> method, passing in the <code>reducer</code> as an argument.
<br><br>

<strong>Note:</strong>&nbsp;The code in the editor uses ES6 default argument syntax to initialize this state to hold a value of <code>5</code>. If you're not familiar with default arguments, you can refer to the <a target="_blank" href="http://beta.freecodecamp.com/en/challenges/es6/set-default-parameters-for-your-functions">ES6 section in the Beta Curriculum</a> which covers this topic.
`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:

`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:

const store = Redux.createStore(reducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  let es5, store, passed = true;

  let testResults = [
    {
      test: 0,
      status: false,
      condition: 'Your code should transpile successfully.'
    },
    {
      test: 1,
      status: false,
      condition: 'The redux store should exist.'
    },
    {
      test: 2,
      status: false,
      condition: 'The redux store should have a value of 5 for the state.'
    }
  ]

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  const prepend = `(function() {`
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
    assert.strictEqual(typeof store.getState, 'function', 'The redux store exists.');
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(store.getState(), 5, 'The redux store has a value of 5 for the state.');
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

// liveRender modifies console.log in user input and returns message data
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
