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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Advanced JavaScript in React Render Method`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
In previous challenges, you learned how to inject JavaScript code into JSX code using curly braces, <code>{ }</code>, for tasks like accessing props, passing props, accessing state, inserting comments into your code, and most recently, styling your components. These are all common use cases to put JavaScript in JSX, but they aren't the only way that you can utilize JavaScript code in your React components.
<br><br>

You can also write JavaScript directly in your <code>render</code> methods, before the <code>return</code> statement, <strong><em>without</em></strong> inserting it inside of curly braces. This is because it is not yet within the JSX code. When you want to use a variable later in the JSX code <em>inside</em> the <code>return</code> statement, you place the variable name inside curly braces.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
In the code provided, the <code>render</code> method has an array that contains 20 phrases to represent the answers found in the classic 1980's Magic Eight Ball toy. The button click event is bound to the <code>ask</code> method, so each time the button is clicked a random number will be generated and stored as the <code>randomIndex</code> in state. On line 38, delete the string <code>"change me!"</code> and reassign the <code>answer</code> const so your code randomly accesses a different index of the <code>possibleAnswers</code> array each time the component updates. Finally, insert the <code>answer</code> const inside the <code>p</code> tags.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const inputStyle = {
  width: 235,
  margin: 5
}

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    }
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    const possibleAnswers = [
      "It is certain", "It is decidedly so", "Without a doubt",
      "Yes, definitely", "You may rely on it", "As I see it, yes",
      "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again",
      "Ask again later", "Better not tell you now", "Cannot predict now",
      "Concentrate and ask again", "Don't count on it", "My reply is no",
      "My sources say no", "Outlook not so good","Very doubtful", "Most likely"
    ];
    const answer = "change me!" // << change code here
    return (
      <div>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle} /><br />
        <button onClick={this.ask}>Ask the Magic Eight Ball!</button><br />
        <h3>Answer:</h3>
        <p>
          { /* change code below this line */ }

          { /* change code above this line */ }
        </p>
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const inputStyle = {
  width: 235,
  margin: 5
}

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    }
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    const possibleAnswers = [
      "It is certain", "It is decidedly so", "Without a doubt",
      "Yes, definitely", "You may rely on it", "As I see it, yes",
      "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again",
      "Ask again later", "Better not tell you now", "Cannot predict now",
      "Concentrate and ask again", "Don't count on it", "My reply is no",
      "My sources say no", "Outlook not so good","Very doubtful", "Most likely"
    ];
    const answer = possibleAnswers[this.state.randomIndex];
    return (
      <div>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle} /><br />
        <button onClick={this.ask}>Ask the Magic Eight Ball!</button><br />
        <h3>Answer:</h3>
        <p>
          {answer}
        </p>
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The MagicEightBall component should exist and should render to the page.';
  const error_2 = 'MagicEightBall\'s first child should be an input element.';
  const error_3 = 'MagicEightBall\'s third child should be a button element.';
  const error_4 = 'MagicEightBall\'s state should be initialized with a property of userInput and a property of randomIndex both set to a value of an empty string.'
  const error_5 = 'When MagicEightBall is first mounted to the DOM, it should return an empty p element.'
  const error_6 = 'When text is entered into the input element and the button is clicked, the MagicEightBall component should return a p element that contains a random element from the possibleAnswers array.';

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
  const exportScript = '\n export default MagicEightBall'
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

  let initialState, state_1, state_2, state_3, state_4, state_5, state_6, state_7, state_8, state_9, state_10;
  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('MagicEightBall').length, 1, error_1)
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(shallowRender.nodes[0].props.children[0].type, "input", error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    assert.strictEqual(shallowRender.nodes[0].props.children[2].type, "button", error_2);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 3:
  try {
    initialState = mockedComponent.state()
    assert(initialState.userInput === '' && initialState.randomIndex === '', error_4)
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 3:
  try {
    assert(mockedComponent.find('p').length === 1 && mockedComponent.find('p').nodes[0].innerHTML === '', error_6)
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }

  // test 3:
  try {
    let statesArray = [];
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    mockedComponent.find('input').simulate('change', {target: {value: "test?"}});
    mockedComponent.find('button').simulate('click');
    statesArray.push(mockedComponent.find('p').nodes[0].innerText);
    const answersArray = [
    "It is certain", "It is decidedly so", "Without a doubt",
    "Yes, definitely", "You may rely on it", "As I see it, yes",
    "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again",
    "Ask again later", "Better not tell you now", "Cannot predict now",
    "Concentrate and ask again", "Don't count on it", "My reply is no",
    "My sources say no", "Outlook not so good","Very doubtful", "Most likely"
    ];
    const hasIndex = statesArray.filter((state, i) => answersArray.indexOf(state) !== -1);
    const notAllEqual = statesArray.filter((state, i, arr) => arr[i] === arr[0]);
    assert(hasIndex.length === 10 && notAllEqual.length !== 10, error_6);
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
    const exportScript = '\n export default MagicEightBall'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
