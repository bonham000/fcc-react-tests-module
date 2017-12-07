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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass an Array as Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
The last challenge demonstrated how to pass information from a parent component to a child component as <code>props</code> or properties. This challenge looks at how arrays can be passed as <code>props</code>.  To pass an array to a JSX element, it must be treated as JavaScript and wrapped in curly braces.

<pre>
<code class="codeBlock">&lt;ParentComponent&gt;
  &lt;ChildComponent colors={["green", "blue", "red"]} /&gt;
 &lt;/ParentComponent&gt;</code>
</pre>

The child component then has access to the array property <code>colors</code>.  Array methods such as <code>join()</code> can be used when accessing the property.<br><br>

<code>const ChildComponent = (props) => &lt;p&gt{props.colors.join(', ')}&lt;/p&gt</code><br><br>

This will join all <code>colors</code> array items into a comma separated string and produce:<br><br>

 <code> &lt;p&gt;green, blue, red&lt;/p&gt;</code><br><br>

Later, we will learn about other common methods to render arrays of data in React.
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There are <code>List</code> and <code>ToDo</code> components in the code editor. When rendering each <code>List</code> from the <code>ToDo</code> component, pass in a <code>tasks</code> property assigned to an array of to-do tasks, for example <code>["walk dog", "workout"]</code>. Then access this <code>tasks</code> array in the <code>List</code> component, showing its value within the <code>p</code> element.  Use <code>join(", ")</code> to display the <code>props.tasks</code>array in the <code>p</code> element as a comma separated list. Today's list should have at least 2 tasks and tomorrow's should have at least 3 tasks.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const List= (props) => {
  { /* change code below this line */ }
  return <p>{}</p>
  { /* change code above this line */ }
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        { /* change code below this line */ }
        <List/>
        <h2>Tomorrow</h2>
        <List/>
        { /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
  `const List= (props) => {
  return <p>{props.tasks.join(', ')}</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        <List tasks={['study', 'exercise']} />
        <h2>Tomorrow</h2>
        <List tasks={['call Sam', 'grocery shopping', 'order tickets']} />
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The ToDo component should return a single outer div.';
  const error_2 = 'The ToDo component\'s third child should be an instance of the List component.';
  const error_3 = 'The ToDo component\'s fifth child should be an instance of the List component.';
  const error_4 = 'Both instances of the List component should have a property called tasks and tasks should be of type array.';
  const error_5 = 'The first List component representing Today\'s tasks should have 2 or more items.';
  const error_6 = 'The second List component representing Tomorrow\'s tasks should have 3 or more items.';
  const error_7 = 'The List component should render the value from the tasks prop in the p tag.'

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
    },
    {
      test: 6,
      status: false,
      condition: error_6
    },
    {
      test: 7,
      status: false,
      condition: error_7
    }
  ];

  let es5, mockedComponent, mockRender, propsObj, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default ToDo'
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

  // now we will try to shallow render the component with Enzyme's shallow method
  // you can also use mount to perform a full render to the DOM environment
  // to do this you must import mount above; i.e. import { shallow, mount } from enzyme
  try {
    var React = require('react');
    mockedComponent = shallow(React.createElement(eval(es5)));
    mockRender = mount(React.createElement(eval(es5)));
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
    assert.strictEqual(mockedComponent.nodes[0].props.children[2].type.name, 'List', error_2)
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(mockedComponent.nodes[0].props.children[2].type.name, 'List', error_3)
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    assert(Array.isArray(mockedComponent.props().children[4].props.tasks) === true, error_4)
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    assert(mockedComponent.props().children[2].props.tasks.length >= 2, error_5)
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {
    assert(mockedComponent.props().children[4].props.tasks.length >= 3, error_6)
    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
  }

  // test 7:
  try {
    assert(mockRender.find("p").nodes[0].innerHTML === mockedComponent.props().children[2].props.tasks.join(", ") || mockRender.find("p").nodes[0].innerHTML === mockedComponent.props().children[2].props.tasks.join(","), error_7)
    testResults[7].status = true;
  } catch (err) {
    passed = false;
    testResults[7].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default ToDo'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
