/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Map State to Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>Provider</code> component allows you to provide <code>state</code> and <code>dispatch</code> to your React components, but you must specify exactly what state and actions you want. This way, you make sure that each component only has access to the state it needs. You accomplish this by creating two functions: <code>mapStateToProps()</code> and <code>mapDispatchToProps()</code>.
<br><br>

In these functions, you declare what pieces of state you want to have access to and which action creators you need to be able to dispatch. Once these functions are in place, you'll see how to use the React Redux <code>connect</code> method to connect them to your components in another challenge.
<br><br>

<strong>Note:</strong>&nbsp;Behind the scenes, React Redux uses the <code>store.subscribe()</code> method to implement <code>mapStateToProps()</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Create a function <code>mapStateToProps()</code>. This function should take <code>state</code> as an argument, then return an object which maps that state to specific property names. These properties will become accessible to your component via <code>props</code>. Since this example keeps the entire state of the app in a single array, you can pass that entire state to your component. Create a property <code>messages</code> in the object that's being returned, and set it to <code>state</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const state = [];

// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const state = [];

// change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The const state should be an empty array.';
  const error_2 = 'mapStateToProps should be a function.';
  const error_3 = 'mapStateToProps should return an object.';
  const error_4 = 'Passing an array as state to mapStateToProps should return this array assigned to a key of messages.';

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
  let state, mapStateToProps;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { state, mapStateToProps } })()`
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
    reduxCode = eval(es5);

    state = reduxCode.state;
    mapStateToProps = reduxCode.mapStateToProps;

  } catch (err) {
    passed = false;
  }

  // test 1:
  try {
    assert.strictEqual(state.length, 0, error_1)
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(typeof mapStateToProps, 'function', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    let mapped = mapStateToProps();
    assert.strictEqual(typeof mapped, 'object', error_3);

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    let testState = ['messages'];
    let mappedState = mapStateToProps(testState);
    assert.strictEqual(mappedState.messages[0], 'messages', error_4);

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
