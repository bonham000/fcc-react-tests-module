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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Add Comments in JSX`
export const challengeText = `<span class = 'default'>Intro: </span>
JSX is a syntax that gets compiled into valid JavaScript. Sometimes, for readability, you might need to add comments to your code. Like most programming languages, JSX has its own way to do this.<br><br>

To put comments inside JSX, you use the syntax <code>{/* */}</code> to wrap around the comment text.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The code editor has a JSX element similar to what you created in the last challenge. Add a comment somewhere within the provided <code>div</code> element, without
modifying the existing <code>h1</code> or <code>p</code> elements.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = (
<div>
  <h1>This is a block of JSX</h1>
  <p>Here's a subtitle</p>
</div>);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div>
  <h1>This is a block of JSX</h1>
  { /* this is a JSX comment */ }
  <p>Here's a subtitle</p>
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
      condition: 'The div should contain an h1 tag as the first element.'
    },
    {
      test: 3,
      status: false,
      condition: 'The div should contain a p tag as the second element.'
    },
    {
      test: 4,
      status: false,
      condition: 'The JSX should include a comment.'
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
    assert.strictEqual(jsx.props.children[0].type, 'h1', 'The div should contain an h1 tag as the first element.');
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(jsx.props.children[1].type, 'p', 'The div should contain a p tag as the second element.');
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert.strictEqual(modifiedCode.includes('/*'), true, 'The JSX should include a comment.');
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
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
