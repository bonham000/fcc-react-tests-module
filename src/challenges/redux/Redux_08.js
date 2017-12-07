/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use const for Action Types`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>A common practice when working with Redux is to assign action types as read-only constants, then reference these constants wherever they are used. You can refactor the code you're working with to write the action types as <code>const</code> declarations.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Declare <code>LOGIN</code> and <code>LOGOUT</code> as <code>const</code> values and assign them to the strings <code>'LOGIN'</code> and <code>'LOGOUT'</code>, respectively. Then, edit the <code>authReducer()</code> and the action creators to reference these constants instead of string values.
<br><br>

<strong>Note:</strong>&nbsp;It's generally a convention to write constants in all uppercase, and this is
standard practice in Redux as well.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`// change code below this line

// change code above this line

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'LOGIN':
      return {
        authenticated: true
      }

    case 'LOGOUT':
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case LOGIN:
      return {
        authenticated: true
      }

    case LOGOUT:
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'Calling the function loginUser should return an object with type property set to the string \'LOGIN\'.';
  const error_2 = 'Calling the function logoutUser should return an object with type property set to the string \'LOGOUT\'.';
  const error_3 = 'The store should be initialized with an object with property login set to false.';
  const error_4 = 'Dispatching loginUser should update the login property in the store\'s state to true.';
  const error_5 = 'Dispatching logoutUser should update the login property in the store\'s state to false.';
  const error_6 = 'The authReducer function should handle multiple action types with a switch statement.';
  const error_7 = 'LOGIN and LOGOUT should be declared as const values and should be assigned strings of \'LOGIN\' and \'LOGOUT\'.';
  const error_8 = 'The action creators and the reducer should reference the LOGIN and LOGOUT constants.';

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
    },
    {
      test: 7,
      status: false,
      condition: error_7
    },
    {
      test: 8,
      status: false,
      condition: error_8
    }
  ];

  let es5, reduxCode, store, login, logout, loginUser, logoutUser, passed = true;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return {store, LOGIN, LOGOUT, loginUser, logoutUser} })()`
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
    login = reduxCode.LOGIN;
    logout = reduxCode.LOGOUT;
    loginUser = reduxCode.loginUser;
    logoutUser = reduxCode.logoutUser;

  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(loginUser().type, 'LOGIN', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(logoutUser().type, 'LOGOUT', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(store.getState().authenticated, false, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    const initialState = store.getState();
    store.dispatch(loginUser());
    const afterLogin = store.getState();

    assert(
      initialState.authenticated === false &&
      afterLogin.authenticated === true,
      error_4
    );

    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {

    store.dispatch(loginUser());
    const loggedIn = store.getState();
    store.dispatch(logoutUser());
    const afterLogout = store.getState();

    assert(
      loggedIn.authenticated === true &&
      afterLogout.authenticated === false,
      error_5
    );

    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {
    assert(
      typeof reduxCode !== 'undefined' &&
      code.toString().includes('switch') &&
      code.toString().includes('case') &&
      code.toString().includes('default'),
      error_6);
    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
  }

  const noWhiteSpace = code.toString().replace(/\s/g,'');

  // test 7:
  try {
    assert(
      (noWhiteSpace.includes('constLOGIN=\'LOGIN\'') || noWhiteSpace.includes('constLOGIN="LOGIN"')) &&
      (noWhiteSpace.includes('constLOGOUT=\'LOGOUT\'') || noWhiteSpace.includes('constLOGOUT="LOGOUT"')),
      error_7);
    testResults[7].status = true;
  } catch (err) {
    passed = false;
    testResults[7].status = false;
  }

  // test 8:
  try {
    assert(
      noWhiteSpace.includes('caseLOGIN:') &&
      noWhiteSpace.includes('caseLOGOUT:') &&
      noWhiteSpace.includes('type:LOGIN') &&
      noWhiteSpace.includes('type:LOGOUT'),
      error_8);
    testResults[8].status = true;
  } catch (err) {
    passed = false;
    testResults[8].status = false;
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
