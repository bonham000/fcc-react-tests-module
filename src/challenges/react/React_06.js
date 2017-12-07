/* eslint-disable */
import React from 'react'
import assert from 'assert'

import { transform } from 'babel-standalone'

import Enzyme from '../Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Learn About Self-Closing JSX Tags`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
So far, you’ve seen how JSX differs from HTML in a key way with the use of <code>className</code> vs. <code>class</code> for defining HTML classes.
Another important way in which JSX differs from HTML is in the idea of the self-closing tag.<br><br>

In HTML, almost all tags have both an opening and closing tag: <code>&lt;div&gt;&lt;/div&gt;</code>; the closing tag always has a forward slash before the tag name that you are closing. However, there are special instances in HTML called “self-closing tags”, or tags that don’t require both an opening and closing tag before another tag can start.
For example the line-break tag can be written as <code>&lt;br&gt;</code> or as <code>&lt;br /&gt;</code>, but should never be written as <code>&lt;br&gt;&lt;/br&gt;</code>, since it doesn't contain any content.<br><br>

In JSX, the rules are a little different. Any JSX element can be written with a self-closing tag, and every element must be closed. The line-break tag, for example, must always be written as <code>&lt;br /&gt;</code> in order to be valid JSX that can be transpiled. A <code>&lt;div&gt;</code>, on the other hand, can be written as <code>&lt;div /&gt;</code> or <code>&lt;div&gt;&lt;/div&gt;</code>. The difference is that in the first syntax version there is no way to include anything in the <code>&lt;div /&gt;</code>. You will see in later challenges that this syntax is useful when rendering React components.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Fix the errors in the code editor so that it is valid JSX and successfully transpiles. Make sure you don't change any of the content - you only need to close tags where
they are needed.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const JSX = (
<div>
  {/* change code below this line */}
  <h2>Welcome to React!</h2> <br >
  <p>Be sure to close all tags!</p>
  <hr >
  {/* change code above this line */}
</div>
);

ReactDOM.render(JSX, document.getElementById('challenge-node'));`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div>
  {/* change code below this line */}
  <h2>Welcome to React!</h2> <br />
  <p>Be sure to close all tags!</p>
  <hr />
  {/* change code above this line */}
</div>
);

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
  }

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
      condition: 'The div should contain a br tag.'
    },
    {
      test: 3,
      status: false,
      condition: 'The div should contain an hr tag.'
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

  try {
    var React = require('react');
    var ReactDOM = require('react-dom');
    jsx = eval(es5);
    mockedComponent = shallow(jsx);
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
    assert.strictEqual(mockedComponent.contains(<br/>), true, 'The div should contain a br tag.');
    //assert.strictEqual(jsx.props.children[2].type, 'br', 'The div should contain a br tag.');
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(mockedComponent.contains(<hr/>), true, 'The div should contain an hr tag.');
    //assert.strictEqual(jsx.props.children[4].type, 'hr', 'The div should contain an hr tag.');
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    let testDiv = document.getElementById('challenge-node').childNodes[0].innerHTML.replace(/\s/g,'');
    assert(
      testDiv.includes('<h2>WelcometoReact!</h2>') &&
      testDiv.includes('<p>Besuretoclosealltags!</p>'),
      'The provided JSX element should render as is to the DOM node with id \'challenge-node\'.'
    );
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
