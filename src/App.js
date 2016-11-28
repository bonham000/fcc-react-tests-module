import React from 'react';
import TestComponent from './test/TestComponent'

// INSTRUCTIONS:
// Copy the code in ./challenges/Challenge_Template.js into a new file
// Save this in the same folder: /challenges
// Follow the template file to write a new challenge and tests
// Import your challenge by changing the below import to import
// from the challenge you have written. Have fun!

import { challengeTitle,
         challengeInstructions,
         seedCode,
         solutionCode,
         executeTests,
         liveRender } from './challenges/Challenge_1'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div>
        <TestComponent 
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