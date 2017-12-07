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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Return null to Prevent Rendering`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>There are situations when you may not want to render a child element. React won't render a component if that component's <code>render()</code> method returns <code>null</code>. This is useful when you don't want to render components based on conditional logic.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has an example similar to the last two challenges. However, the <code>h1</code> element renders in the <code>Child</code> component instead of the top-level <code>Parent</code> component. The <code>display</code> condition is passed as <code>props</code> to the <code>Child</code> component. In the <code>Child</code> component's <code>render()</code> method, check the value of <code>display</code>. If it is <code>true</code>, render an <code>h1</code> element with any text in it, and if it is <code>false</code>, return <code>null</code>.
<br><br>

You have now accomplished the same behavior in three different ways. This should begin to show you the versatility of using JavaScript to write your UIs. React gives you a lot of control over what and how you render your views.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
  }
  toggleDisplay = () => {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <Child display={this.state.display}/>
       </div>
    );
  }
};

class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // change code below this line

  }
}`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
  }
  toggleDisplay = () => {
    this.setState({
      display: !this.state.display
    });
  }
  render() {
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <Child display={this.state.display}/>
       </div>
    );
  }
};

class Child extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // change code below this line
    if (this.props.display) {
      return <h1>Display!</h1>
    } else {
      return null;
    }
  }
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The Parent component should exist and render.';
  const error_2 = 'The Child component should exist and render.';
  const error_3 = 'When display is set to true, a div, button, and h1 should render.';
  const error_4 = 'When display is set to false, only a div and button should render.';
  const error_5 = 'The Child component should return null when passed a falsy value for the display prop, otherwise it should return an h1 element.';

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
  const exportScript = '\n export default Parent'
  const modifiedCode = code.concat(exportScript);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
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
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('Parent').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.find('Child').length, 1, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    mockedComponent.setState({display: true});
    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('h1').length === 1,
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  let displayFalse, displayTrue;

  // test 4:
  try {
    mockedComponent.setState({display: false});
    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('h1').length === 0,
      error_4
    );
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    mockedComponent.setState({display: true});
    displayTrue = mockedComponent.find('Child').find('h1');
    mockedComponent.setState({display: false});
    displayFalse = mockedComponent.find('Child').find('h1');
    assert(
      code.includes('null') === true &&
      displayTrue.length === 1 &&
      displayFalse.length === 0,
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
    const exportScript = '\n export default Parent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
