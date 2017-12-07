/* eslint-disable */
import React from 'react'
import assert from 'assert'

import { transform } from 'babel-standalone'

import Enzyme from '../Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

export const QA = true;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Define an HTML Class in JSX`
export const challengeText = `<span class = 'default'>Intro: </span>
Now that you're getting comfortable writing JSX, you may be wondering how it differs from HTML.
So far, it may seem that HTML and JSX are exactly the same.<br><br>

One key difference in JSX is that you can no longer use the word <code>class</code> to define HTML classes. This is because <code>class</code> is a reserved word in JavaScript. Instead, JSX uses <code>className</code>.<br><br>

In fact, the naming convention for all HTML attributes and event references in JSX become camelCase. For example, a click event in JSX is <code>onClick</code>, instead of <code>onclick</code>. Likewise, <code>onchange</code> becomes <code>onChange</code>. While this is a subtle difference, it is an important one to keep in mind moving forward.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Apply a class of <code>myDiv</code> to the <code>div</code> provided in the JSX code.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = (
<div>
  <h1>Add a class to this div</h1>
</div>);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div className = 'myDiv'>
  <h1>Add a class to this div</h1>
</div>);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  let es5, mockedComponent, jsx, passed = true;

  let testResults = [
    {
      test: 0,
      status: false,
      condition: 'Your JSX code should transpile successfully.'
    },
    {
      test: 1,
      status: false,
      condition: 'The constant JSX should return a div element.'
    },
    {
      test: 2,
      status: false,
      condition: 'The div has a class of \'myDiv\'.'
    }
  ];

  const prepend = `(function() {`
  const append = `;\n return JSX })()`
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

  // shallow render the component with Enzyme
  try {
    var React = require('react');
    jsx = eval(es5);
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(jsx.type, 'div', 'The constant JSX should return a div element.');
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(jsx.props.className, 'myDiv', 'The div has a class of \'myDiv\'.');
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  return {
    passed,
    testResults,
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = `;\n export default JSX`
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = eval(es5);
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
