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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Write a React Component from Scratch`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that you've learned the basics of JSX and React components, it's time to write a component on your own. React components are the core building blocks of React applications so it's important to become very familiar with writing them. Remember, a typical React component is an ES6 <code>class</code> which extends <code>React.Component</code>. It has a render method that returns HTML (from JSX) or <code>null</code>. This is the basic form of a React component. Once you understand this well, you will be prepared to start building more complex React projects.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Define a class <code>MyComponent</code> that extends <code>React.Component</code>. Its render method should return a <code>div</code> that contains an <code>h1</code> tag with the text: <code>My First React Component!</code> in it. Use this text exactly, the case and punctuation matter. Make sure to call the constructor for your component, too.<br><br>

Render this component to the DOM using <code>ReactDOM.render()</code>. There is a <code>div</code> with <code>id='challenge-node'</code> available for you to use.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`// change code below this line
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  }
};

ReactDOM.render(<MyComponent />, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------

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

  // this will clear the target DOM node before the challenge code
  document.getElementById('challenge-node').innerHTML = '';

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'There should be a React component called MyComponent';
  const error_2 = 'MyComponent should contain an h1 tag with text \'My First React Component!\' Case and punctuation matter.';
  const error_3 = 'MyComponent should render to the DOM.';

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

  // this applies an export to the user's code so
  // we can access their component here for tests
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
    assert(code.replace(/\s/g, '').includes('classMyComponentextendsReact.Component{'), error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.contains(<h1>My First React Component!</h1>), true, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(document.getElementById('challenge-node').childNodes.length, 1, error_3);
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
    const noWhiteSpace = code.replace(/\s/g, '');
    const modifiedCode = (noWhiteSpace.includes('ReactDOM.render(<MyComponent/>,document.getElementById(\'challenge-node\'))') || noWhiteSpace.includes('ReactDOM.render(<MyComponent/>,document.getElementById("challenge-node"))')) ? code.concat(exportScript) : '';
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
