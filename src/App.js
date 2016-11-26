import React from 'react';
import TestContainer from './TestContainer'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div>
        <TestContainer />
      </div>
    );
  }
};