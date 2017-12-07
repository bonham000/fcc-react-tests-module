/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Map Dispatch to Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>mapDispatchToProps()</code> function is used to provide specific action creators to your React components so they can dispatch actions against the Redux store. It's similar in structure to the <code>mapStateToProps()</code> function you wrote in the last challenge. It returns an object that maps dispatch actions to property names, which become component <code>props</code>. However, instead of returning a piece of <code>state</code>, each property returns a function that calls <code>dispatch</code> with an action creator and any relevant action data. You have access to this <code>dispatch</code> because it's passed in to <code>mapDispatchToProps()</code> as a parameter when you define the function, just like you passed <code>state</code> to <code>mapStateToProps()</code>. Behind the scenes, React Redux is using Redux's <code>store.dispatch()</code> to conduct these dispatches with <code>mapDispatchToProps()</code>. This is similar to how it uses <code>store.subscribe()</code> for components that are mapped to <code>state</code>.
<br><br>

For example, you have a <code>loginUser()</code> action creator that takes a <code>username</code> as an action payload. The object returned from <code>mapDispatchToProps()</code> for this action creator would look
something like:
<br>

<pre>
<code class="codeBlock">{
 submitLoginUser: function(username) {
  dispatch(loginUser(username));
 }
}</code>
</pre>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor provides an action creator called <code>addMessage()</code>. Write the function <code>mapDispatchToProps()</code> that takes <code>dispatch</code> as an argument, then returns an object. The object should have a property <code>submitNewMessage</code> set to the dispatch function, which takes a parameter for the new message to add when it dispatches <code>addMessage()</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// change code below this line

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: function(message) {
      dispatch(addMessage(message));
    }
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'addMessage should return an object with keys \'type\' and \'message\'.';
  const error_2 = 'mapDispatchToProps should be a function.';
  const error_3 = 'mapDispatchToProps should return an object.';
  const error_4 = 'Dispatching addMessage with submitNewMessage from mapDispatchToProps should return a message to the dispatch function.';

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
  let addMessage, mapDispatchToProps;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() {`
  const append = `;\n return { addMessage, mapDispatchToProps } })()`
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
    var ReactRedux = require('react-redux');
    
    reduxCode = eval(es5);

    addMessage = reduxCode.addMessage;
    mapDispatchToProps = reduxCode.mapDispatchToProps;

  } catch (err) {
    passed = false;
  }

  // test 1:
  try {

    let addMessageTest = addMessage();
    assert(
      addMessageTest.hasOwnProperty('type') &&
      addMessageTest.hasOwnProperty('message'),
      error_1
    );

    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(typeof mapDispatchToProps, 'function', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {

    let mapDispatchReturn = mapDispatchToProps();
    assert.strictEqual(typeof mapDispatchReturn, 'object', error_3);

    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {

    let testAction;
    const dispatch = (fn) => {
      testAction = fn;
    }
    let dispatchFn = mapDispatchToProps(dispatch);
    dispatchFn.submitNewMessage('__TEST__MESSAGE__');

    assert(
      testAction.type === 'ADD' &&
      testAction.message === '__TEST__MESSAGE__',
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
