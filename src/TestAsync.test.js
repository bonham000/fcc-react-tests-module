/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react/React_46';

import assert from 'assert'
import { transform } from 'babel-standalone'

import Enzyme from './challenges/Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

import { getDocument } from './utils';
const { document, window } = getDocument();
global.window = window;
global.document = window.document;

test("Run Async Test", async () => {

  const React = require('react');
  const Redux = require('redux');
  const ReactRedux = require('react-redux');
  const ReduxThunk = require('redux-thunk');

  const blockConsole = `const console = { log: () => null };`;
  const exportScript = '\n export default GateKeeper'
  const modifiedCode = blockConsole.concat(solutionCode.concat(exportScript));

  const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;

  // (async function() {
  //   const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  //   const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  //
  //   const state_1 = () => { return waitForIt(() => mockedComponent.find('ul').find('li'))};
  //   const setInput = () => { return waitForIt(() => mockedComponent.find('textarea').simulate('change', {target: {value: "testA, testB, testC"}}))};
  //   const click = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};
  //
  //   const state_2 = () => { return waitForIt(() => { const notes = mockedComponent.find('ul').find('li'); return nodes.reduce((t, n) => t + n.innerText, '') })};
  //
  //   const setInput_2 = () => { return waitForIt(() => mockedComponent.find('textarea').simulate('change', {target: {value: "t1, t2, t3, t4, t5, t6"}}))};
  //   const click_1 = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};
  //   const state_3 = () => { return waitForIt(() => { const notes = mockedComponent.find('ul').find('li'); return nodes.reduce((t, n) => t + n.innerText, '') })};
  //
  //   const second = () => { mockedComponent.setState({ name: 'React Rocks!' }); return waitForIt(() => mockedComponent.state('name')); };
  //   const firstValue = await first();
  //   const secondValue = await second();
  //   return firstValue === 'Before' && secondValue === 'React Rocks!';
  // })(); // message: Calling the <code>handleClick</code> method on <code>MyComponent</code> should set the name property in state to equal <code>React Rocks!</code>.",

  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const mockedComponent = Enzyme.mount(React.createElement(eval(es5)));

  const simulateChange = (el, value) => el.simulate('change', {target: {value}});

  let initialStyle = mockedComponent.find('input').props().style.border;
  const state_1 = () => { mockedComponent.setState({input: 'this is 15 char' }); return waitForIt(() => mockedComponent.find('input').props().style.border )};
  const state_2 = () => { mockedComponent.setState({input: 'A very long string longer than 15 characters.' }); return waitForIt(() => mockedComponent.find('input').props().style.border )};

  const style_1 = await state_1();
  const style_2 = await state_2();

  assert(
    initialStyle === '1px solid black' &&
    style_1 === '1px solid black' &&
    style_2 === '3px solid red'
  );

});

/*
(async function() {
  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => { mockedComponent.setState({ name: 'Before' }); return waitForIt(() => mockedComponent.state('name')); };
  const second = () => { mockedComponent.setState({ name: 'React Rocks!' }); return waitForIt(() => mockedComponent.state('name')); };
  const firstValue = await first();
  const secondValue = await second();
  return firstValue === 'Before' && secondValue === 'React Rocks!';
})(); // message: Calling the <code>handleClick</code> method on <code>MyComponent</code> should set the name property in state to equal <code>React Rocks!</code>.",
*/
