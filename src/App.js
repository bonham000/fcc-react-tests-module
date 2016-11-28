import React from 'react';
import ReactTestComponent from './test-components/ReactTestComponent'
import ReduxTestComponent from './test-components/ReduxTestComponent'

// INSTRUCTIONS:
// Copy one of the challenge templates from the /challenge-templates folder
// Save this as a new file in the appropriate challenges path: /react or /redux
// Follow the template file to write a new challenge and tests
// Import your challenge by changing the below import statement
// And change the App component to render the correct test component

import { challengeTitle,
         challengeInstructions,
         seedCode,
         solutionCode,
         executeTests,
         liveRender } from './challenges/react/Challenge_4'

// Change the nested component to React or Redux for which you are testing
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div>
        <ReactTestComponent 
          challengeTitle = {challengeTitle}
          challengeInstructions = {challengeInstructions} 
          seedCode = {seedCode}
          solutionCode = {solutionCode}
          executeTests = {executeTests}
          liveRender = {liveRender} />
      </div>
    );
  }
};