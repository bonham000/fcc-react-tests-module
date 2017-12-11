/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react/React_42';

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
  const exportScript = '\n export default MyComponent'
  const modifiedCode = blockConsole.concat(solutionCode.concat(exportScript));

  const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = mount(React.createElement(eval(es5)));
  // const mockedComponent = mount(React.createElement(MyComponent));
  const state_1 = () => { mockedComponent.setState({display: false}); return waitForIt(() => mockedComponent )};
  const updated = await state_1();

    assert(
      updated.find('div').length === 1 &&
      updated.find('div').children().length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 0,
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
