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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a React Component`

export const challengeText = `<span class = 'default'>Intro: </span>The other way to define a React component is with the ES6 <code>class</code> syntax. In the following example, <code>Kitten</code> extends <code>React.Component</code>:

<pre>
<code class="codeBlock">class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      &lt;h1&gt;Hi&lt;/h1&gt;
    );
  }
}</code>
</pre>

This creates an ES6 class <code>Kitten</code> which extends the <code>React.Component</code> class. So the <code>Kitten</code> class now has access to many useful React features, such as local state and lifecycle hooks. Don't worry if you aren't familiar with these terms yet, they will be covered in greater detail in later challenges.
<br><br>

Also notice the <code>Kitten</code> class has a <code>constructor</code> defined within it that calls <code>super()</code>. It uses <code>super()</code> to call the constructor of the parent class, in this case <code>React.Component</code>. The constructor is a special method used during the initialization of objects that are created with the <code>class</code> keyword. It is best practice to call a component's <code>constructor</code> with <code>super</code>, and pass <code>props</code> to both. This makes sure the component is initialized properly. For now, know that it is standard for this code to be included. Soon you will see other uses for the constructor as well as <code>props</code>.`

export const challengeInstructions = `
  <span class = 'default'>Instructions: </span><code>MyComponent</code> is defined in the code editor using class syntax. Finish writing the <code>render</code> method so it returns a <code>div</code> element that contains an <code>h1</code> with the text <code>Hello React!</code>.'
`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // change code below this line



    // change code above this line
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // change code below this line
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    // change code above this line
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  let es5, mockedComponent, shallowRender, passed = true;

  let testResults = [
    {
      test: 0,
      status: false,
      condition: 'Your JSX code should transpile successfully.'
    },
    {
      test: 1,
      status: false,
      condition: 'The React component should return a div element.'
    },
    {
      test: 2,
      status: false,
      condition: 'The returned div should render an h1 tag within it.'
    },
    {
      test: 3,
      status: false,
      condition: 'The h1 tag should include the string \'Hello React!\''
    }
  ];

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

  // shallow render the component with Enzyme
  try {
    var React = require('react');
    shallowRender = shallow(React.createElement(eval(es5)))
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(shallowRender.type(), 'div', 'The React component should return a <div> element.');
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(shallowRender.children().type(), 'h1', 'The returned div should render an h1 tag within it.');
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(shallowRender.contains(<h1>Hello React!</h1>), true, 'The h1 tag should include the string \'Hello React!\'');
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  return {
    passed,
    testResults,
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
