import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow } from 'enzyme';

import App from './App';

const shallowRenderApp = shallow(React.createElement(App));

it('App returns a div', () => {
	expect(shallowRenderApp.find('div').length).toEqual(1);
});

it('App renders React Test Component', () => {
	expect(shallowRenderApp.find('ReactTestComponent').length).toEqual(1);
});

let initialState = shallowRenderApp.state();

it('App initializes state with an array of challenges', () => {
	expect(Array.isArray(initialState.challenges)).toBe(true);
});

it('App initializes the first selected challenge as React_01', () => {
	expect(initialState.selectedChallenge.id).toEqual('React_01');
});