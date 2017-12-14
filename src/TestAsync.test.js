/* eslint-disable */
/* Async Test Runner */

/* Import Challenge */
import { solutionCode, executeTests } from './challenges/react-redux/React_Redux_09';

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
  const exportScript = '\n export default AppWrapper'
  const modifiedCode = blockConsole.concat(solutionCode.concat(exportScript));

  const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
  const mockedComponent = mount(React.createElement(eval(es5)));
  
  const exportStore = '\n export default store'
  const modifiedCode_2 = blockConsole.concat(solutionCode.concat(exportStore));

  const es5_2 = transform(modifiedCode_2, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
  const store = eval(es5_2);
  
  
  // const updated = await changed();
  // 
  // assert(
  //   updated.find('input').props().value === testValue
  // );
  
  
  // const state = () => { mockedComponent.setState({messages: ['__TEST__MESSAGE']}); return waitForIt(() => mockedComponent )};
  // const updated = await state();
  // assert(
  //   updated.find('div').length === 1 &&
  //   updated.find('h2').length === 1 &&
  //   updated.find('button').length === 1 &&
  //   updated.find('ul').length === 1 &&
  //   updated.find('li').length === 1
  // );
  
  // const changed = () => { causeChange(mockedComponent, testValue); return waitForIt(() => mockedComponent )};
  // let PresentationalState = mockedComponent.find('Presentational').state('input');  

  const waitForIt = (fn) => new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  let beforeProps = mockedComponent.find('Presentational').props();
  const testValue = '__TEST__EVENT__INPUT__';
  const causeChange = (c, v) => c.find('input').simulate('change', { target: { value: v }});
  const changed = () => { causeChange(mockedComponent, testValue); return waitForIt(() => mockedComponent )};
  const clickButton = () => { mockedComponent.find('button').simulate('click'); return waitForIt(() => mockedComponent )};  
  const afterChange = await changed();
  const afterChangeInput = afterChange.find('input').props().value;
  const afterClick = await clickButton();
  
  const afterProps = mockedComponent.find('Presentational').props();
  const a = afterClick.find('ul').childAt(0).text();
  console.log(a);
  assert(
    beforeProps.messages.length === 0 &&
    afterChangeInput === testValue &&
    afterProps.messages.pop() === testValue &&
    afterClick.find('input').props().value === '' &&
    afterClick.find('li').text() === testValue
  );
  // 
  // let afterState = mockedComponent.find('Presentational').state;

  // assert(
  //   beforeProps.messages[0] !== afterProps.messages[0] &&
  //   afterProps.messages[0] === '__TEST__MESSAGE__' &&
  //   afterState.input === '',
  //   error_8
  // );
  // 
  // const testValue = '__MOCK__INPUT__';
  // const causeChange = (c, v) => c.find('input').simulate('change', { target: { value: v }});  
  // let initialInput = mockedComponent.find('Presentational').find('input');  
  // const changed = () => { causeChange(mockedComponent, testValue); return waitForIt(() => mockedComponent )};
  // const updated = await changed();
  // const updatedInput = updated.find('Presentational').find('input');
  // 
  // assert(
  //   initialInput.props().value === '' &&
  //   updatedInput.props().value === '__MOCK__INPUT__'
  // );
  // 
  // const initialState = mockedComponent.state();
  // const causeChange = (c, v) => c.find('input').simulate('change', { target: { value: v }});
  // 
  // const initialState = mockedComponent.state();
  // const testMessage = '__FIRST__MESSAGE__';
  // const firstChange = () => { causeChange(mockedComponent, testMessage); return waitForIt(() => mockedComponent )};
  // const firstResult = await firstChange();
  // const firstState = firstResult.state();
  // 
  // const firstSubmit = () => { mockedComponent.find('button').simulate('click'); return waitForIt(() => mockedComponent )};
  // const afterSubmit = await firstSubmit();
  // const submitState = afterSubmit.state();
  // 
  // assert(
  //   firstState.input === testMessage && submitState.input === ''
  // );

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
