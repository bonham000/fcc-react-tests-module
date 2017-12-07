/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Combine Multiple Reducers`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>When the state of your app begins to grow more complex, it may be tempting to divide state into multiple pieces. Instead, remember the first principle of Redux: all app state is held in a single state object in the store. Therefore, Redux provides reducer composition as a solution for a complex state model. You define multiple reducers to handle different pieces of your application's state, then compose these reducers together into one root reducer. The root reducer is then passed into the Redux <code>createStore()</code> method.<br><br>

In order to let us combine multiple reducers together, Redux provides the <code>combineReducers()</code> method. This method accepts an object as an argument in which you define properties which associate keys to specific reducer functions. The name you give to the keys will be used by Redux as the name for the associated piece of state.<br><br>

Typically, it is a good practice to create a reducer for each piece of application state when they are distinct or unique in some way. For example, in a note-taking app with user authentication, one reducer could handle authentication while another handles the text and notes that the user is submitting. For such an application, we might write the <code>combineReducers()</code> method like this:

<pre>
<code>const rootReducer = Redux.combineReducers({
   auth: authenticationReducer,
   notes: notesReducer
});</code>
</pre>

Now, the key <code>notes</code> will contain all of the state associated with our notes and handled by our <code>notesReducer</code>. This is how multiple reducers can be composed to manage more complex application state. In this example, the state held in the Redux store would then be a single object containing <code>auth</code> and <code>notes</code> properties.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There are <code>counterReducer()</code> and <code>authReducer()</code> functions provided in the code editor, along with a Redux store. Finish writing the <code>rootReducer()</code> function using the <code>Redux.combineReducers()</code> method. Assign <code>counterReducer</code> to a key called <code>count</code> and <code>authReducer</code> to a key called <code>auth</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
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

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
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

const rootReducer = // define the root reducer here

const store = Redux.createStore(rootReducer);`

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

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
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

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer
});

const store = Redux.createStore(rootReducer);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The counterReducer should increment and decrement the state.';
  const error_2 = 'The authReducer should toggle the state of authenticated between true and false.';
  const error_3 = 'The store state should have two keys: count, which holds a number, and auth, which holds an object. The auth object should have a property of authenticated, which holds a boolean.';
  const error_4 = 'The rootReducer should be a function that combines the counterReducer and the authReducer.';

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
  let store, rootReducer, INCREMENT, DECREMENT, LOGIN, LOGOUT;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { store, rootReducer, INCREMENT, DECREMENT, LOGIN, LOGOUT } })()`
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
    rootReducer = reduxCode.rootReducer;
    INCREMENT = reduxCode.INCREMENT;
    DECREMENT = reduxCode.DECREMENT;
    LOGIN = reduxCode.LOGIN;
    LOGOUT = reduxCode.LOGOUT;

  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {

    const initalState = store.getState().count;
    store.dispatch({type: INCREMENT});
    store.dispatch({type: INCREMENT});
    const firstState = store.getState().count;
    store.dispatch({type: DECREMENT});
    const secondState = store.getState().count;

    assert(
      firstState === initalState + 2 &&
      secondState === firstState - 1,
      error_1
    );

    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {

    store.dispatch({type: LOGIN});
    const loggedIn = store.getState().auth.authenticated;
    store.dispatch({type: LOGOUT});
    const loggedOut = store.getState().auth.authenticated;

    assert(
      loggedIn === true &&
      loggedOut === false,
      error_2
    );

    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    const state = store.getState();

    assert(
      typeof state.auth === 'object' &&
      typeof state.auth.authenticated === 'boolean' &&
      typeof state.count === 'number',
      error_3
    );

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    const noWhiteSpace = code.replace(/\s/g,'');

    assert(
      typeof rootReducer === 'function' &&
      noWhiteSpace.includes('Redux.combineReducers'),
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
