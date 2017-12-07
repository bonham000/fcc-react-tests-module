/* eslint-disable */
import React from 'react'
import assert from 'assert'

import { transform } from 'babel-standalone'

import Enzyme from '../Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

export const QA = true;

// NOTES: For this one (besides re-doing the intro since we will likely have covered most of this already
// by the time we get to this challenge) - still need a way to make sure they've used the styles const rather than
// applying same 3 styles in-line.

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Add Inline Styles in React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>You may have noticed in the last challenge that there were several other syntax differences from HTML inline styles in addition to the <code>style</code> attribute set to a JavaScript object. First, the names of certain CSS style properties use camel case. For example, the last challenge set the size of the font with <code>fontSize</code> instead of <code>font-size</code>. Hyphenated words like <code>font-size</code> are invalid syntax for JavaScript object properties, so React uses camel case. As a rule, any hyphenated style properties are written using camel case in JSX.
<br><br>

All property value length units (like <code>height</code>, <code>width</code>, and <code>fontSize</code>) are assumed to be in <code>px</code> unless otherwise specified. If you want to use <code>em</code>, for example, you wrap the value and the units in quotes, like <code>{fontSize: "4em"}</code>. Other than the length values that default to <code>px</code>, all other property values should be wrapped in quotes.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>If you have a large set of styles, you can assign a style <code>object</code> to a constant to keep your code organized. Uncomment the <code>styles</code> constant and declare an <code>object</code> with three style properties and their values. Give the <code>div</code> a color of <code>"purple"</code>, a font-size of <code>40</code>, and a border of <code>"2px solid purple"</code>. Then set the <code>style</code> attribute equal to the <code>styles</code> constant.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
// const styles =
// change code above this line
class Colorful extends React.Component {
  render() {
    // change code below this line
    return (
      <div style={{color: "yellow", fontSize: 24}}>Style Me!</div>
    );
    // change code above this line
  }
};
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const styles = {
  color: "purple",
  fontSize: 40,
  border: "2px solid purple"
};
// change code above this line
class Colorful extends React.Component {
  render() {
    // change code below this line
    return (
      <div style={styles}>Style Me!</div>
  // change code above this line
    );
  }
};
`
// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_1 = 'The styles variable should be an object with three properties.';
  const error_2 = 'The styles variable should have a color property set to a value of "purple".';
  const error_3 = 'The styles variable should have a fontSize property set to a value of 40.';
  const error_4 = 'The styles variable should have a border property set to a value of "2px solid purple".';
  const error_5 = 'The component should render a div element.';
  const error_6 = 'The div element should have its styles defined by the styles object.';

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
    {
      test: 4,
      status: false,
      condition: error_4
    },
    {
      test: 5,
      status: false,
      condition: error_5
    },
    {
      test: 6,
      status: false,
      condition: error_6
    }
  ];

  let es5, mockedComponent, stylesConst, stylesObj, testRender, passed = true;
  const exportScript = '\n export default Colorful;'
  const modifiedCode =  code.concat(exportScript);

  // for analyzing just the styles const
  const prepend = `(function() {`
  const append = `;\n return styles })()`
  const partialCode = prepend.concat(code).concat(append);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    stylesConst = transform(partialCode, { presets: [ 'es2015', 'react' ] }).code;
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
    stylesConst = eval(stylesConst);
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  try {
    assert.strictEqual(Object.keys(stylesConst).length, 3, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  try {
    assert.strictEqual(stylesConst.color, 'purple', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  try {
    assert.strictEqual(stylesConst.fontSize, 40, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  try {
    assert.strictEqual(stylesConst.border, "2px solid purple", error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  try {
    assert.strictEqual(testRender.type(), 'div', error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  try {
    assert(testRender.nodes[0].props.style.color === "purple" &&
      testRender.nodes[0].props.style.fontSize === 40 &&
      testRender.nodes[0].props.style.border === "2px solid purple", error_6);
    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
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
