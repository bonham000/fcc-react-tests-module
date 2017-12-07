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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Bind 'this' to a Class Method`

export const challengeText = `<span class = 'default'>Intro: </span>In addition to setting and updating <code>state</code>, you can also define methods for your component class. A class method typically needs to use the <code>this</code> keyword so it can access properties on the class (such as <code>state</code> and <code>props</code>) inside the scope of the method. There are a few ways to allow your class methods to access <code>this</code>.
<br><br>

One common way is to explicitly bind <code>this</code> in the constructor so <code>this</code> becomes bound to the class methods when the component is initialized. You may have noticed the last challenge used <code>this.click = this.click.bind(this)</code> for its <code>click</code> method in the constructor. Then, when you call a function like <code>this.setState()</code> within your class method, <code>this</code> refers to the class and will not be <code>undefined</code>.
<br><br>

<strong>Note:</strong>&nbsp;The <code>this</code> keyword is one of the most confusing aspects of JavaScript but it plays an important role in React. Although its behavior here is totally normal, these lessons aren't the place for an in-depth review of <code>this</code> so please refer to other lessons if the above is confusing!`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has a component with a <code>state</code> that keeps track of an item count. It also has a method which allows you to increment this item count. However, the method doesn't work because it's using the <code>this</code> keyword that is undefined. Fix it by explicitly binding <code>this</code> to the <code>addItem()</code> method in the component's constructor.
<br><br>

Next, add a click handler to the <code>button</code> element in the render method. It should trigger the <code>addItem()</code> method when the button receives a click event. Remember that the method you pass to the <code>onClick()</code> handler needs curly braces because it should be interpreted directly as JavaScript.
<br><br>

Once you complete the above steps you should be able to click the button and see the item count increment in the HTML.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemCount: 0
    };
    // change code below this line

    // change code above this line
  }
  addItem() {
    this.setState({
      itemCount: this.state.itemCount + 1
    });
  }
  render() {
    return (
      <div>
        { /* change code below this line */ }
        <button>Click Me</button>
        { /* change code above this line */ }
        <h1>Current Item Count: {this.state.itemCount}</h1>
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
      itemCount: 0
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem() {
    this.setState({
      itemCount: this.state.itemCount + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick = {this.addItem}>Click Me</button>
        <h1>Current Item Count: {this.state.itemCount}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should return a div element which wraps two elements, a button and an h1 element, in that order.'
  const error_2 = 'The state of MyComponent should initialize with the key value pair { itemCount: 0}.';
  const error_3 = 'Clicking the button element should run the addItem method and increment the state itemCount by 1.';

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

  let es5, shallowRender, mockedComponent, passed = true;

  const exportScript = '\n export default MyComponent'
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

  // try to shallow render the component with Enzyme
  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 1:
  try {
    assert(
      mockedComponent.find('div').length === 1
      && mockedComponent.find('div').children().nodes[0].tagName === 'BUTTON'
      && mockedComponent.find('div').children().nodes[1].tagName === 'H1',
      error_1
    );
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.state('itemCount'), 0, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  //test 3:
  try {
    mockedComponent.setState({itemCount: 0});
    const before = mockedComponent.state('itemCount');
    mockedComponent.find('button').simulate('click');
    const after = mockedComponent.state('itemCount');
    assert.strictEqual(before === 0 && after === 1, true, error_3);
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
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
