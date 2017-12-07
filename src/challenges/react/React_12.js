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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render a Class Component to the DOM`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>You may remember using the ReactDOM API in an earlier challenge to render JSX elements to the DOM. The process for rendering React components will look very similar. The past few challenges focused on components and composition, so the rendering was done for you behind the scenes. However, none of the React code you write will render to the DOM without making a call to the ReactDOM API.<br><br>

Here's a refresher on the syntax: <code>ReactDOM.render(componentToRender, targetNode)</code>. The first argument is the React component that you want to render. The second argument is the DOM node that you want to render that component within.<br><br>

React components are passed into <code>ReactDOM.render()</code> a little differently than JSX elements. For JSX elements, you pass in the name of the element that you want to render. However, for React components, you need to use the same syntax as if you were rendering a nested component, for example <code>ReactDOM.render(&lt;ComponentToRender /&gt;, targetNode)</code>. You use this syntax for both ES6 class components and functional components.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Both the <code>Fruits</code> and <code>Vegetables</code> components are defined for you behind the scenes. Render both components as children of the <code>TypesOfFood</code> component,
then render <code>TypesOfFood</code> to the DOM. There is a <code>div</code> with <code>id='challenge-node'</code> available for you to use.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* change code below this line */}

        {/* change code above this line */}
      </div>
    );
  }
};

// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* change code below this line */}
          <Fruits />
           <Vegetables />
         {/* change code above this line */}
      </div>
    );
  }
};

// change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------
const prependCode = `
const Fruits = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
    </div>
  );
};
const Vegetables = () => {
  return (
    <div>
      <h2>Vegetables:</h2>
      <ul>
        <li>Brussel Sprouts</li>
        <li>Broccoli</li>
        <li>Squash</li>
      </ul>
    </div>
  );
};`

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

  // clear the target DOM node before running the tests
  document.getElementById('challenge-node').innerHTML = '';

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The TypesOfFood component should return a single div element.';
  const error_2 = 'The TypesOfFood component should render the Fruits component after the h1 element.';
  const error_3 = 'The TypesOfFood component should render the Vegetables component after Fruits.';
  const error_4 = 'The TypesOfFood component should render to the DOM within the div with the id \'challenge-node\'.';

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
    }
  ];

  let es5, mockedComponent, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default TypesOfFood'
  const modifiedCode = prependCode.concat(code).concat(exportScript);

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
    var ReactDOM = require('react-dom');
    mockedComponent = shallow(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockedComponent.type(), 'div', error_1)
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.props().children[1].type.name,'Fruits', error_2)
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(mockedComponent.props().children[2].type.name, 'Vegetables', error_3)
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert(document.getElementById('challenge-node').childNodes[0].innerHTML ===
    '<div><h2>Fruits:</h2><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul></div><div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div>'
    || '<div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div><div><h2>Fruits:</h2><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul></div>',
    error_4)
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default TypesOfFood'
    const modifiedCode = prependCode.concat(code).concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
