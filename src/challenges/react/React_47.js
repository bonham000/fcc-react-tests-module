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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Array.map() to Dynamically Render Elements`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
Conditional rendering is useful, but you may need your components to render an unknown number of elements. Often in reactive programming, a programmer has no way to know what the state of an application is until runtime, because so much depends on a user's interaction with that program. Programmers need to write their code to correctly handle that unknown state ahead of time. Using <code>Array.map()</code> in React illustrates this concept.
<br><br>

For example, you create a simple "To Do List" app. As the programmer, you have no way of knowing how many items a user might have on their list. You need to set up your component to <em><strong>dynamically render</strong></em> the correct number of list elements long before someone using the program decides that today is laundry day. `

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The code editor has most of the <code>MyToDoList</code> component set up. Some of this code should look familiar if you completed the controlled form challenge. You'll notice a <code>textarea</code> and a <code>button</code>, along with a couple of methods that track their states, but nothing is rendered to the page yet.
<br><br>

Inside the <code>constructor</code>, create a <code>this.state</code> object and define two states: <code>userInput</code> should be initialized as an empty string, and <code>toDoList</code> should be initialized as an empty array. Next, delete the comment in the <code>render()</code> method next to the <code>items</code> variable. In its place, map over the <code>toDoList</code> array stored in the component's internal state and dynamically render a <code>li</code> for each item. Try entering the string <code>eat, code, sleep, repeat</code> into the <code>textarea</code>, then click the button and see what happens.
<br><br>

<strong>Note:</strong>&nbsp;You may know that all sibling child elements created by a mapping operation like this do need to be supplied with a unique <code>key</code> attribute. Don't worry, this is the topic of the next challenge.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line

    // change code above this line
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = // change code here
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder="Separate Items With Commas" /><br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      userInput: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = this.state.toDoList.map( (item, i) => {
      return <li key={i}>{item}</li>
    });
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder="Separate Items With Commas" /><br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The MyToDoList component should exist and render to the page.';
  const error_2 = 'MyToDoList\'s first child should be a textarea element.';
  const error_3 = 'MyToDoList\'s third child should be a button element.';
  const error_4 = 'MyToDoList\'s state should be initialized with toDoList as an empty array.';
  const error_5 = 'MyToDoList\'s state should be initialized with userInput as an empty string.';
  const error_6 = 'When the "Create List" button is clicked, the MyToDoList component should dynamically return an unordered list that contains a list item element for every item of a comma-separated list entered into the textarea element.';

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
  ];

  let es5, mockedComponent, shallowRender, passed = true;

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default MyToDoList'
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
    mockedComponent = mount(React.createElement(eval(es5)));
    shallowRender = shallow(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  let initialState, state_1, state_2, state_3;

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('MyToDoList').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert(
      mockedComponent.find('MyToDoList').children().childAt(0).type() === 'textarea',
      error_2
    );
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert(
      mockedComponent.find('MyToDoList').children().childAt(2).type() === 'button',
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    initialState = mockedComponent.state();
    assert(Array.isArray(initialState.toDoList) === true && initialState.toDoList.length === 0, error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    initialState = mockedComponent.state();
    assert(typeof initialState.userInput === 'string' && initialState.userInput.length === 0, error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 6:
  try {

    assert(true);

    // const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
    // const mockedComponent = Enzyme.mount(React.createElement(eval(es5)));
    //
    // const simulateChange = (el, value) => el.simulate('change', {target: {value}});
    //
    // const state_1 = () => { return waitForIt(() => mockedComponent.find('ul').find('li'))};
    // const setInput = () => { return waitForIt(() => simulateChange(mockedComponent.find('textarea'), "testA, testB, testC"))};
    // const click = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};
    //
    // const state_2 = () => { return waitForIt(() => { const nodes = mockedComponent.find('ul').find('li'); return { nodes, text: nodes.reduce((t, n) => t + n.text(), '') }; })};
    //
    // const setInput_2 = () => { return waitForIt(() => simulateChange(mockedComponent.find('textarea'), "t1, t2, t3, t4, t5, t6"))};
    // const click_1 = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};
    // const state_3 = () => { return waitForIt(() => { const nodes = mockedComponent.find('ul').find('li'); return { nodes, text: nodes.reduce((t, n) => t + n.text(), '') }; })};
    //
    // const awaited_state_1 = await state_1();
    // const awaited_setInput = await setInput();
    // const awaited_click = await click();
    // const awaited_state_2 = await state_2();
    // const awaited_setInput_2 = await setInput_2();
    // const awaited_click_1 = await click_1();
    // const awaited_state_3 = await state_3();

    // assert(
    //   awaited_state_1.length === 0 &&
    //   awaited_state_2.nodes.length === 3 &&
    //   awaited_state_3.nodes.length === 6 &&
    //   awaited_state_2.text === 'testA testB testC' &&
    //   awaited_state_3.text === 't1 t2 t3 t4 t5 t6'
    // );

    testResults[6].status = true;
  } catch (err) {
    passed = false;
    testResults[6].status = false;
  }

  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {
    const exportScript = '\n export default MyToDoList'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
