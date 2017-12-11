/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react/React_47';

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

// const waitForIt = (fn) => {
//   return new Promise((resolve, reject) => {
//       return setTimeout(() => {
//         resolve(fn());
//       }, 250);
//     });
// }

test("Run Async Test", async () => {

  const React = require('react');
  const Redux = require('redux');
  const ReactRedux = require('react-redux');
  const ReduxThunk = require('redux-thunk');

  const blockConsole = `const console = { log: () => null };`;
  const exportScript = '\n export default MyToDoList'
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

  const state_1 = () => { return waitForIt(() => mockedComponent.find('ul').find('li'))};
  const setInput = () => { return waitForIt(() => simulateChange(mockedComponent.find('textarea'), "testA, testB, testC"))};
  const click = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};

  const state_2 = () => { return waitForIt(() => { const nodes = mockedComponent.find('ul').find('li'); return { nodes, text: nodes.reduce((t, n) => t + n.text(), '') }; })};

  const setInput_2 = () => { return waitForIt(() => simulateChange(mockedComponent.find('textarea'), "t1, t2, t3, t4, t5, t6"))};
  const click_1 = () => { return waitForIt(() => mockedComponent.find('button').simulate('click'))};
  const state_3 = () => { return waitForIt(() => { const nodes = mockedComponent.find('ul').find('li'); return { nodes, text: nodes.reduce((t, n) => t + n.text(), '') }; })};

  const awaited_state_1 = await state_1();
  const awaited_setInput = await setInput();
  const awaited_click = await click();
  const awaited_state_2 = await state_2();
  const awaited_setInput_2 = await setInput_2();
  const awaited_click_1 = await click_1();
  const awaited_state_3 = await state_3();

  assert(
    awaited_state_1.length === 0 &&
    awaited_state_2.nodes.length === 3 &&
    awaited_state_3.nodes.length === 6 &&
    awaited_state_2.text === 'testA testB testC' &&
    awaited_state_3.text === 't1 t2 t3 t4 t5 t6'
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
