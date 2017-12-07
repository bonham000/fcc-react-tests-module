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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Simple JSX Element`
export const challengeText = `<span class = 'default'>Intro: </span>
React is an Open Source view library created and maintained by Facebook. It's a great tool to render the User Interface (UI) of modern web applications.<br><br>

React uses a syntax extension of JavaScript called JSX that allows you to write HTML directly within JavaScript. This has several benefits. It lets you use the full programmatic power of JavaScript within HTML, and helps to keep your code readable. For the most part, JSX is similar to the HTML that you have already learned, however there are a few key differences that will be covered throughout these challenges.<br><br>

For instance, because JSX is a syntactic extension of JavaScript, you can actually write JavaScript directly within JSX. To do this, you simply include the code you want to be treated as JavaScript within curly braces: <code>{ 'this is treated as JavaScript code' }</code>. Keep this in mind, since it's used in several future challenges.<br><br>

However, because JSX is not valid JavaScript, JSX code must be compiled into JavaScript. The transpiler Babel is a popular tool for this process. For your convenience, it's already added behind the scenes for these challenges. If you happen to write syntactically invalid JSX,
you will see the first test in these challenges fail.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The current code uses JSX to assign a <code>div</code> element to the constant <code>JSX</code>. Replace the <code>div</code> with an <code>h1</code> element
and add the text <code>Hello JSX!</code> inside it.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `const JSX = <div></div>;`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `const JSX = <h1>Hello JSX!</h1>;`

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
      condition: 'The constant JSX should return an h1 element.'
    },
    {
      test: 2,
      status: false,
      condition: 'The h1 tag should include the text \'Hello JSX!\''
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
    console.log(err);
    passed = false;
  }

  // test 1:
  try {
    assert.strictEqual(jsx.type, 'h1', 'The constant JSX should return an h1 element.');
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 2:
  try {
    assert.strictEqual(jsx.props.children, 'Hello JSX!', true, 'The h1 tag should include the text \'Hello JSX!\'');
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
