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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Compose React Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
As the challenges continue to use more complex compositions with React components and JSX, there is one important point to note. Rendering ES6 style class components within other components is no different than rendering the simple components you used in the last few challenges. You can render JSX elements, stateless functional components, and ES6 class components within other components.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
In the code editor, the <code>TypesOfFood</code> component is already rendering a component called <code>Vegetables</code>. Also, there is the <code>Fruits</code> component from the last challenge.
Nest two components inside of <code>Fruits</code> &mdash; first <code>NonCitrus</code>, and then <code>Citrus</code>. Both of these components are provided for you in the background. Next, nest the <code>Fruits</code> class component into the the <code>TypesOfFood</code> component, below the <code>h1</code> header and above <code>Vegetables</code>. The result should be a series of nested components, which uses two different component types.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* change code below this line */ }

         { /* change code above this line */ }
      </div>
    );
  }
};

class TypesOfFood extends React.Component {
  constructor(props) {
     super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* change code below this line */ }

        { /* change code above this line */ }
        <Vegetables />
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* change code below this line */ }
        <NonCitrus />
        <Citrus />
        { /* change code above this line */ }
      </div>
    )
  }
}

class TypesOfFood extends React.Component {
  constructor(props) {
     super(props);
  }
    render() {
      return (
        <div>
        <h1>Types of Food:</h1>
          { /* change code below this line */ }
          <Fruits />
          { /* change code above this line */ }
          <Vegetables />
        </div>
      );
    }
};`

// ---------------------------- define challenge tests ----------------------------
//
const prependCode = `
class NonCitrus extends React.Component {
  render() {
    return (
      <div>
        <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      </div>
    );
  }
};
class Citrus extends React.Component {
  render() {
    return (
      <div>
        <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
      </div>
    );
  }
};
class Vegetables extends React.Component {
  render() {
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
     }
};`

export const executeTests = (code, errorSuppression) => {

  const error_1 = 'The TypesOfFood component should return a single div element.';
  const error_2 = 'The TypesOfFood component should return the Fruits component.';
  const error_3 = 'The Fruits component should return the NonCitrus component, followed by the Citrus component.';
  const error_4 = 'The TypesOfFood component should return the Vegetables component below the Fruits component.';

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

  ];

  let es5, mockRender, mockedComponent, passed = true;

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
    mockRender = shallow(React.createElement(eval(es5)));
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockRender.node.type, 'div', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockRender.nodes[0].props.children[1].type.name, 'Fruits', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert(mockedComponent.childAt(1).childAt(1).name() === 'NonCitrus' &&
    mockedComponent.childAt(1).childAt(2).name() === 'Citrus', error_3)
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert.strictEqual(mockRender.nodes[0].props.children[2].type.name, 'Vegetables', error_4);
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
