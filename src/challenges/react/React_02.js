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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Complex JSX Element`
export const challengeText = `<span class = 'default'>Intro: </span>

The last challenge was a simple example of JSX, but JSX can represent more complex HTML as well.
One important thing to know about nested JSX is that it must return a single element.
This one parent element would wrap all of the other levels of nested elements.
For instance, several JSX elements written as siblings with no parent wrapper element will not transpile.
Here's an example:

<br><br>

<b>Valid JSX:</b>
<pre>
<code class="codeBlock">&lt;div&gt;
  &lt;p&gt;Paragraph One&lt;/p&gt;
  &lt;p&gt;Paragraph Two&lt;/p&gt;
  &lt;p&gt;Paragraph Three&lt;/p&gt;
&lt;/div&gt;</code>
</pre>

<br>

<b>Invalid JSX:</b>
<pre>
<code class="codeBlock">&lt;p&gt;Paragraph One&lt;/p&gt;
&lt;p&gt;Paragraph Two&lt;/p&gt;
&lt;p&gt;Paragraph Three&lt;/p&gt;
</code>
</pre>`

//<code><blockquote>const JSXValid = (<br>&lt;section&gt;<br>&nbsp;&nbsp;&lt;article&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;First article&lt;/p&gt;<br>&nbsp;&nbsp;&lt;/article&gt;<br>&nbsp;&nbsp;&lt;article&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;Second article&lt;/p&gt;<br>&nbsp;&nbsp;&lt;/article&gt;<br>&lt;/section&gt;);const JSXNotValid = (<br>&lt;article&gt;<br>&nbsp;&nbsp;&lt;p&gt;First article&lt;/p&gt;<br>&lt;/article&gt;<br>&lt;article&gt;<br>&nbsp;&nbsp;&lt;p&gt;Second article&lt;/p&gt;<br>&lt;/article&gt;);</blockquote></code>
// ^^Multi-line code example follows current FCC formatting once the code tags (wrapping the blockquote) are removed

export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Define a new constant <code>JSX</code> that renders a <code>div</code> which contains the following elements in order:
An <code>h1</code>, a <code>p</code>, and an unordered list that contains three <code>li</code> items. You can include any text you want within each element.<br><br>

<strong>Note:</strong>&nbsp;When rendering multiple elements like this, you can wrap them all in parentheses, but it's not strictly required. Also notice this challenge uses a <code>div</code> tag to wrap all the child elements within a single parent element. If you remove the <code>div</code>, the JSX will no longer transpile. Keep this in mind, since it will also apply when you return JSX elements in React components.`


// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `// write your code here
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
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
      condition: 'The div should contain a ul tag as the third element.'
    },
    {
      test: 5,
      status: false,
      condition: 'The ul should contain three li elements.'
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
    assert.strictEqual(jsx.props.children[2].type, 'ul', 'The div should contain a ul tag as the third element.');
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    assert.strictEqual(jsx.props.children[2].props.children.length, 3, 'The ul should contain three li elements.');
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
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
    // console.log('Live rendering failure.');
  }

}
