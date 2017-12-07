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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Component with Composition`

export const challengeText = `<span class = 'default'>Intro: </span>Now we will look at how we can compose multiple React components together. Imagine you are building an App and have created three components, a <code>Navbar</code>, <code>Dashboard</code>, and <code>Footer</code>.
To compose these components together, you could create an <code>App</code> <i>parent</i> component which renders each of these three components as <i>children</i>. To render a component as a child in a React component, you include the component name written as a custom HTML tag in the JSX. For example, in the <code>render</code> method you could write:

<pre>
<code class="codeBlock">return (
 &lt;App&gt;
  &lt;Navbar /&gt;
  &lt;Dashboard /&gt;
  &lt;Footer /&gt;
 &lt;/App&gt;
)</code>
</pre>

When React encounters a custom HTML tag that references another component (a component name wrapped in <code>&lt; /&gt;</code> like in this example), it renders the markup for that component in the location of the tag. This should illustrate the parent/child relationship between the <code>App</code> component and the <code>Navbar</code>, <code>Dashboard</code>, and <code>Footer</code>.`

export const challengeInstructions = `
<span class = 'default'>Instructions: </span>In the code editor, there is a simple functional component called <code>ChildComponent</code> and a React component called <code>ParentComponent</code>. Compose the two together by rendering the <code>ChildComponent</code> within the <code>ParentComponent</code>. Make sure to close the <code>ChildComponent</code> tag with a forward slash.

<br /><br />

<strong>Note:</strong>&nbsp;<code>ChildComponent</code> is defined with an ES6 arrow function because this is a very common practice when using React. However, know that this is just a function. If you aren't familiar with the arrow function syntax, please refer to the JavaScript section.`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* change code below this line */ }


        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* change code below this line */ }
        <ChildComponent />
        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  let es5, mockedComponent, shallowRender, passed = true;

  const error_1 = 'The React component should return a single div element.';
  const error_2 = 'The component should return two nested elements.';
  const error_3 = 'The component should return the ChildComponent as its second child.';

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
    }
  ];

  const exportScript = '\n export default ParentComponent'
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
    shallowRender = shallow(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(shallowRender.type(), 'div', error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  //test 2:
  try {
    assert.strictEqual(shallowRender.children().length, 2, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(shallowRender.node.props.children[1].type.name, 'ChildComponent', error_3);
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
    const exportScript = '\n export default ParentComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
