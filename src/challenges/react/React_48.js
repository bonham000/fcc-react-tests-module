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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Give Sibling Elements a Unique Key Attribute`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
The last challenge showed how the <code>map</code> method is used to dynamically render a number of elements based on user input. However, there was an important piece missing from that example. When you create an array of elements, each one needs a <code>key</code> attribute set to a unique value. React uses these keys to keep track of which items are added, changed, or removed. This helps make the re-rendering process more efficient when the list is modified in any way. Note that keys only need to be unique between sibling elements, they don't need to be globally unique in your application.
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The code editor has an array with some front end frameworks and a stateless functional component named <code>Frameworks()</code>. <code>Frameworks()</code> needs to map the array to an unordered list, much like in the last challenge. Finish writing the <code>map</code> callback to return an <code>li</code> element for each framework in the <code>frontEndFrameworks</code> array. This time, make sure to give each <code>li</code> a <code>key</code> attribute, set to a unique value.
<br><br>

Normally, you want to make the key something that uniquely identifies the element being rendered. As a last resort the array index may be used, but typically you should try to use a unique identification.
`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = // change code here
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map((fw, i) => {
    return <li key={i}>{fw}</li>
  })
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The Frameworks component should exist and render to the page.';
  const error_2 = 'Frameworks should render an h1 element.';
  const error_3 = 'Frameworks should render a ul element.';
  const error_4 = 'The ul tag should render 6 child li elements.';
    const error_5 = 'Each list item element should have a unique key attribute.';

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
    },
    {
      test: 5,
      status: false,
      condition: error_5
    }
  ];

  let es5, mockedComponent, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default Frameworks'
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

  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  let initialState, state_1, state_2, state_3;

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('Frameworks').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.find('h1').length, 1, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(mockedComponent.find('ul').length, 1, error_2);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert(
      mockedComponent.find('ul').node.childNodes.length === 6 &&
      mockedComponent.find('ul').node.childNodes[0].tagName === 'LI' &&
      mockedComponent.find('li').length === 6,
      error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    let li = mockedComponent.find('li');
    let node1 = li.nodes[1].outerHTML;
    let node2 = li.nodes[2].outerHTML;
    let match1 = node1.match(/\$/);
    let match2 = node2.match(/\$/);
    assert(
      code.replace(/\s/g, '').includes('<likey={') &&
      node1[match1.index + 1] !== node2[match2.index + 1],
      error_5
    );
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  return {
    passed,
    testResults
  }

}


// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default Frameworks'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
