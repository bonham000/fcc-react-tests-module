import React from 'react';
import TestContainer from './TestContainer'

// create an import statement here to import your challenge code from the ./challenges directory
import { challengeTitle, challengeInstructions, seedCode, solutionCode, executeTests } from './challenges/Challenge_1'

// uncomment the below line, and comment the above line, to run the Challenge_2 code:
//import { challengeTitle, challengeInstructions, seedCode, solutionCode, executeTests } from './challenges/Challenge_2'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
      <div>
        <TestContainer 
          challengeTitle = {challengeTitle}
          challengeInstructions = {challengeInstructions} 
          seedCode = {seedCode}
          solutionCode = {solutionCode}
          executeTests = {executeTests} />
      </div>
    );
  }
};