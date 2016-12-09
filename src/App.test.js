import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(React.createElement(App), div);
});

const shallowRender = shallow(React.createElement(App));

it('App returns a div', () => {
	expect(shallowRender.find('div').length).toEqual(1);
});

