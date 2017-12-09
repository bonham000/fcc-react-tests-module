/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react/React_37';

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
  const exportScript = '\n export default Controller'
  const modifiedCode = blockConsole.concat(solutionCode.concat(exportScript));

  const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;

  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = mount(React.createElement(eval(es5)));

  const first = () => {
    mockedComponent.setState({ value: 8 });
    return waitForIt(() => mockedComponent.find('h1').text());
  };

  const second = () => {
    mockedComponent.setState({ value: 7 });
    return waitForIt(() => mockedComponent.find('h1').text());
  };

  const third = () => {
    mockedComponent.setState({ value: 42 });
    return waitForIt(() => mockedComponent.find('h1').text());
  };

  const firstValue = await first();
  const secondValue = await second();
  const thirdValue = await third();

  assert(
    firstValue === '8' &&
    secondValue === '8' &&
    thirdValue === '42'
  );

});
