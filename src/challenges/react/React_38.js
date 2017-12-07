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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Introducing Inline Styles`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>There are other complex concepts
that add powerful capabilities to your React code. But you may be wondering about the more simple problem of how to style those JSX elements you create in React. You likely know that it won't be exactly the same as working with HTML because of <a target="_blank" href="link to classes challenge"> the way you apply classes to JSX elements</a>.
<br><br>

If you import styles from a stylesheet, it isn't much different at all. You apply a class to your JSX element using the <code>className</code> attribute, and apply styles to the class in your stylesheet. Another option is to apply <strong><em>inline</em></strong> styles, which are very common in ReactJS development.
<br><br>

You apply inline styles to JSX elements similar to how you do it in HTML, but with a few JSX differences. Here's an example of an inline style in HTML:
<br><br>

<code>&lt;div style="color: yellow; font-size: 16px"&gt;Mellow Yellow&lt;/div&gt;</code>
<br><br>

JSX elements use the <code>style</code> attribute, but because of the way JSX is transpiled, you can't set the value to a <code>string</code>. Instead, you set it equal to a JavaScript <code>object</code>. Here's an example:
<br><br>

<code>&lt;div style={{color: "yellow", fontSize: 16}}&gt;Mellow Yellow&lt;/div&gt;</code>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Add a <code>style</code> attribute to the <code>div</code> in the code editor to give the text a color of red and font size of 72px.
Note that you can optionally set the font size to be a number, omitting the units "px", or write it as "72px".`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class Colorful extends React.Component {
  render() {
    return (
      <div>Big Red</div>
    );
  }
};
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class Colorful extends React.Component {
  render() {
    return (
      <div style={{color: "red", fontSize: 72}}>Big Red</div>
    );
  }
};
`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_1 = 'The component should render a div element.';
  const error_2 = 'The div element should have a color of red.';
  const error_3 = 'The div element should have a font size of 72px.';

  let testResults = [
    {
      test: 0,
      status: false,
      condition: 'Your JSX code should transpile successfully.'
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
  ];

  let es5, mockedComponent, testRender, passed = true;
  const exportScript = '\n export default Colorful;'
  const modifiedCode = code.concat(exportScript);

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

  // now we will try to shallow render the component with Enzyme's shallow method
  // you can also use mount to perform a full render to the DOM environment
  // to do this you must import mount above; i.e. import { shallow, mount } from enzyme
  try {
    var React = require('react');
    testRender = shallow(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(testRender.type(), 'div', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(testRender.nodes[0].props.style.color, "red", error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 2:
  try {
    assert(
      testRender.nodes[0].props.style.fontSize === 72 ||
      testRender.nodes[0].props.style.fontSize === '72' ||
      testRender.nodes[0].props.style.fontSize === '72px',
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default Colorful;'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
