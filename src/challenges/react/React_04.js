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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render HTML Elements to the DOM`
export const challengeText = `<span class = 'default'>Intro: </span>
So far, you've learned that JSX is a convenient tool to write readable HTML within JavaScript. With React, we can render this JSX directly to the HTML DOM using React's rendering API known as ReactDOM.<br><br>

ReactDOM offers a simple method to render React elements to the DOM which looks like this: <code>ReactDOM.render(componentToRender, targetNode)</code>.

<ul>
<li>The first argument is the React element or component that you want to render.</li>
<li>The second argument is the DOM node that you want to render the component within.</li>
</ul>

As you would expect, <code>ReactDOM.render()</code> must be called after the JSX element declarations, just like how you must declare variables before using them.`

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The code editor has a simple JSX component. Use the <code>ReactDOM.render()</code> method to render this component to the page. You can pass defined JSX elements directly in as the first argument and use <code>document.getElementById()</code>
to select the DOM node to render them to. There is a <code>div</code> with <code>id='challenge-node'</code> available for you to use. Make sure you don't change the <code>JSX</code> constant.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = (
<div>
  <h1>Hello World</h1>
  <p>Lets render this to the DOM</p>
</div>
);
// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div>
  <h1>Hello World</h1>
  <p>Lets render this to the DOM</p>
</div>
);
// change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {
  
  let document;

  if (process.env.NODE_ENV === 'test') {
    const { JSDOM } = require('jsdom');
    // Mock DOM document for ReactDOM.render method
    const jsdom = new JSDOM(`<!doctype html>
      <html>
        <body>
          <div id="challenge-node"></div>
        </body>
      </html>
    `);
    const { window } = jsdom;

    // Mock DOM for ReactDOM tests
    document = window.document;
    global.window = window;
    global.document = window.document;
  };

  // clear the target DOM node before running the tests
  document.getElementById('challenge-node').innerHTML = '';

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
      condition: 'The provided JSX element should render to the DOM node with id \'challenge-node\'.'
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
    var ReactDOM = require('react-dom');
    jsx = eval(es5);
  } catch (err) {
    passed = false;
  }

  // test 1:
  try {
    assert.strictEqual(jsx.type, 'div', 'The constant JSX should return a div element.');
    testResults[1].status = true;
  } catch (err) {
    console.log(err);
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(jsx.props.children[0].type, 'h1', 'The div should contain an h1 tag as the first element.');
    testResults[2].status = true;
  } catch (err) {
    console.log(err);
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(jsx.props.children[1].type, 'p', 'The div should contain a p tag as the second element.');
    testResults[3].status = true;
  } catch (err) {
    console.log(err);
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert.strictEqual(document.getElementById('challenge-node').childNodes[0].innerHTML, '<h1>Hello World</h1><p>Lets render this to the DOM</p>', 'The provided JSX element should render to the DOM node with id \'challenge-node\'.');
    testResults[4].status = true;
  } catch (err) {
    console.log(err);
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
