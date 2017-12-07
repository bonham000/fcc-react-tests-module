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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render State in the User Interface`

export const challengeText = `<span class = 'default'>Intro: </span>Once you define a component's initial state, you can display any part of it in the UI that is rendered. If a component is stateful, it will always have access to the data in <code>state</code> in its <code>render()</code> method. You can access the data with <code>this.state</code>.
<br><br>

If you want to access a state value within the <code>return</code> of the render method, you have to enclose the value in curly braces.
<br><br>

<code>State</code> is one of the most powerful features of components in React. It allows you to track important data in your app and render a UI in response to changes in this data. If your data changes, your UI will change. React uses what is called a virtual DOM, to keep track of changes behind the scenes. When state data updates, it triggers a re-render of the components using that data - including child components that received the data as a prop. React updates the actual DOM, but only where necessary. This means you don't have to worry about changing the DOM. You simply declare what the UI should look like.
<br><br>

Note that if you make a component stateful, no other components are aware of its <code>state</code>. Its <code>state</code> is completely encapsulated, or local to that component, unless you pass state data to a child component as <code>props</code>. This notion of encapsulated <code>state</code> is very important because it allows you to write certain logic, then have that logic contained and isolated in one place in your code.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>In the code editor, <code>MyComponent</code> is already stateful. Define an <code>h1</code> tag in the component's render method which renders the value of <code>name</code> from the component's state.
<br><br>

<strong>Note:</strong>&nbsp;The <code>h1</code> should only render the value from <code>state</code> and nothing else. In JSX, any code you write with curly braces <code>{ }</code> will be treated as JavaScript. So to access the value from <code>state</code> just enclose the reference in curly braces.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Free Code Camp'
    }
  }
  render() {
    return (
      <div>
        { /* change code below this line */ }

        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Free Code Camp'
    }
  }
  render() {
    return (
      <div>
        { /* change code below this line */ }
        <h1>{this.state.name}</h1>
        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should have a key \'name\' with value \'Free Code Camp\' stored in its state.';
  const error_2 = 'MyComponent should render an h1 tag.';
  const error_3 = 'The rendered h1 tag should contain text rendered from the component\'s state.';

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
    }
  ];

  let es5, mockedComponent, passed = true;

  const exportScript = '\n export default MyComponent'
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

  // try to shallow render the component with Enzyme
  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
  }

  // test 1:
  try {
    assert.strictEqual(mockedComponent.state('name'), 'Free Code Camp', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.children().type(), 'h1', error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    mockedComponent.setState({name: 'TestName'});
    assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_3);
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
    const exportScript = '\n export default MyComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
