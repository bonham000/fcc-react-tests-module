/* eslint-disable */
/* All Challenge Test Runner */

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

const createJestTest = ({ solutionCode, executeTests }) => {
  return test('Running Test:', () => {
    const { passed, testResults } = executeTests(solutionCode, true);
    console.log(testResults);
    expect(passed).toBe(true);
  });
}

// React Challenges:
import * as React_15 from './challenges/react/React_15';
// Redux Challenges:
import * as Redux_01 from './challenges/redux/Redux_01';
// React-Redux Challenges
import * as React_Redux_04 from './challenges/react-redux/React_Redux_04';

createJestTest(React_Redux_04);
