/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Send Action Data to the Store`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>By now you've learned how to dispatch actions to the Redux store, but so far these actions have not contained any information other than a <code>type</code>. You can also send specific data along with your actions. In fact, this is very common because actions usually originate from some user interaction and tend to carry some data with them. The Redux store often needs to know about this data.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There's a basic <code>notesReducer()</code> and an <code>addNoteText()</code> action creator defined in the code editor. Finish the body of the <code>addNoteText()</code> function so that it returns an <code>action</code> object. The object should include a <code>type</code> property with a value of <code>ADD_NOTE</code>, and also a <code>text</code> property set to the <code>note</code> data that's passed into the action creator. When you call the action creator, you'll pass in specific note information that you can access for the object.
<br><br>

Next, finish writing the <code>switch</code> statement in the <code>notesReducer()</code>. You need to add a case that handles the <code>addNoteText()</code> actions. This case should be triggered whenever there is an action of type <code>ADD_NOTE</code> and it should return the <code>text</code> property on the incoming <code>action</code> as the new <code>state</code>.
<br><br>

The action is dispatched at the bottom of the code. Once you're finished, run the code and watch the console. That's all it takes to send action-specific data to the store and use it when you update store <code>state</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // change code below this line

    // change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // change code below this line

  // change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // change code below this line
    case ADD_NOTE:
      return action.text;
    // change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // change code below this line
  return {
    type: ADD_NOTE,
    text: note
  }
  // change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello Redux!'));
console.log(store.getState());`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your code should transpile successfully.';
  const error_1 = 'The action creator addNoteText should return an object with keys \'type\' and \'text\'.';
  const error_2 = 'Dispatching an action of type \'ADD_NOTE\' with the addNoteText action creator should update the state to the string passed to the action creator.';

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

  let es5, reduxCode, passed = true;
  let store, notesReducer, addNoteText, ADD_NOTE;

  // this code hijacks the user input to create an IIFE
  // which returns the store from Redux as an object
  // or whatever you need from the client code
  const prepend = `(function() { const console = { log: () => null };`
  const append = `;\n return { store, notesReducer, addNoteText, ADD_NOTE } })()`
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
    notesReducer = reduxCode.notesReducer;
    addNoteText = reduxCode.addNoteText;
    ADD_NOTE = reduxCode.ADD_NOTE;

  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Code evaluation error: ${err}`);
  }

  // test 1:
  try {

    const addNoteFn = addNoteText('__TEST__NOTE');

    assert(
      addNoteFn.type === ADD_NOTE &&
      addNoteFn.text === '__TEST__NOTE',
      error_1
    );

    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    const initialState = store.getState();
    store.dispatch(addNoteText('__TEST__NOTE'));
    const newState = store.getState();

    assert(
      initialState !== newState &&
      newState === '__TEST__NOTE',
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
