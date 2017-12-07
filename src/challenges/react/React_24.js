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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Set State with this.setState`

export const challengeText = `<span class = 'default'>Intro: </span>The previous challenges covered component <code>state</code> and how to initialize state in the <code>constructor</code>. There is also a way to change the component's <code>state</code>. React provides a method for updating component <code>state</code> called <code>setState</code>. You call the <code>setState</code> method within your component class like so: <code>this.setState()</code>, passing in an object with key-value pairs. The keys are your state properties and the values are the updated state data. For instance, if we were storing a <code>username</code> in state and wanted to update it, it would look like this:

<pre>
<code class="codeBlock">this.setState({
 username: 'Lewis'
});</code>
</pre>

React expects you to never modify <code>state</code> directly, instead always use <code>this.setState()</code> when state changes occur. Also, you should note that React may batch multiple state updates in order to improve performance. What this means is that state updates through the <code>setState</code> method can be asynchronous. There is an alternative syntax for the <code>setState</code> method which provides a way around this problem. This is rarely needed but it's good to keep it in mind! Please consult the <a target="_blank" href="https://facebook.github.io/react/docs/state-and-lifecycle.html">React documentation</a> for further details.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There is a <code>button</code> element in the code editor which has an <code>onClick()</code> handler. This handler is triggered when the <code>button</code> receives a click event in the browser, and runs the <code>click</code> method defined on <code>MyComponent</code>. Within the <code>click</code> method, update the component <code>state</code> using <code>this.setState()</code>. Set the
<code>name</code> property in <code>state</code> to equal the string <code>React Rocks!</code>.
<br><br>

Click the button and watch the rendered state update. Don't worry if you don't fully understand how the click handler code works at this point. It's covered in upcoming challenges.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    this.click = this.click.bind(this);
  }
  click() {
    // change code below this line

    // change code above this line
  }
  render() {
    return (
      <div>
        <button onClick = {this.click}>Click Me</button>
        <h1>{this.state.name}</h1>
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
      name: 'Initial State'
    };
    this.click = this.click.bind(this);
  }
  click() {
     // change code below this line
    this.setState({
      name: 'React Rocks!'
    });
    // change code above this line
  }
  render() {
    return (
      <div>
        <button onClick = {this.click}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The state of MyComponent should initialize with the key value pair { name: \'Initial State\' }.';
  const error_2 = 'MyComponent should render an h1 tag.';
  const error_3 = 'The rendered h1 tag should contain text rendered from the component\'s state.';
  const error_4 = 'Calling the click method on MyComponent should set the name property in state to equal \'React Rocks!\'.';

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
  }

  // test 1:
  try {
    assert.strictEqual(mockedComponent.state('name'), 'Initial State', error_1);
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
    mockedComponent.setState({name: 'TestName'});
    assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    mockedComponent.setState({name: 'Before'});
    const before = mockedComponent.state('name');
    // run click method and test state afterwards
    mockedComponent.instance().click();
    const after = mockedComponent.state('name');
    assert.strictEqual(before === 'Before' && after === 'React Rocks!', true, error_4);
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
    const exportScript = '\n export default MyComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
