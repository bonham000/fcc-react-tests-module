/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react/React_32';

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
  const ReactDOM = require('react-dom');
  const Redux = require('redux');
  const ReactRedux = require('react-redux');
  const ReduxThunk = require('redux-thunk');

  const blockConsole = `const console = { log: () => null };`;
  const exportScript = '\n export default MyApp'
  const modifiedCode = blockConsole.concat(solutionCode.concat(exportScript));

  const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = mount(React.createElement(eval(es5)));

  const mockedComponent = mount(React.createElement(MyApp));
  const state_1 = () => { mockedComponent.setState({inputValue: 'TestName'}); return waitForIt(() => mockedComponent )};
  const updated_1 = await state_1();
  assert(updated_1.find('p').text().includes('TestName'));

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
