/* eslint-disable */
import React from 'react';
import ReactTestComponent from './test-components/ReactTestComponent'
import ReduxTestComponent from './test-components/ReduxTestComponent'

// INSTRUCTIONS:
// Copy one of the challenge templates from the /challenge-templates folder
// Save this as a new file in the appropriate challenges path: /react or /redux
// Follow the template file to write a new challenge and tests
// Import your challenge by changing the below import statement
// And change the App component to render the correct test component

// import React Challenges:
import * as React_01 from './challenges/react/curriculum/React_01'
import * as React_02 from './challenges/react/curriculum/React_02'
import * as React_03 from './challenges/react/curriculum/React_03'
import * as React_04 from './challenges/react/curriculum/React_04'
import * as React_05 from './challenges/react/curriculum/React_05'
import * as React_06 from './challenges/react/curriculum/React_06'
import * as React_07 from './challenges/react/curriculum/React_07'
import * as React_08 from './challenges/react/curriculum/React_08'
import * as React_09 from './challenges/react/curriculum/React_09'
import * as React_10 from './challenges/react/curriculum/React_10'
import * as React_11 from './challenges/react/curriculum/React_11'

// add a new challenge to this array:
const challenges = [
  { type: 'React', id: 'React_1'},
  { type: 'React', id: 'React_2'},
  { type: 'React', id: 'React_3'},
  { type: 'React', id: 'React_4'},
  { type: 'React', id: 'React_5'},
  { type: 'React', id: 'React_6'},
  { type: 'React', id: 'React_7'},
  { type: 'React', id: 'React_8'},
  { type: 'React', id: 'React_9'},
  { type: 'React', id: 'React_10'},
  { type: 'React', id: 'React_11'}
];

// Change the nested component to React or Redux for which you are testing
export default class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      challenges,
      selectedChallenge: {
        type: 'React',
        id: 'React_1'
      }
    }
    this.select = this.select.bind(this);
	}
  select(event) {
    const challenge=this.state.challenges.filter( (challenge) => challenge.id === event );
    this.setState({
      selectedChallenge: challenge[0]
    });
  }
  render() {
    const { selectedChallenge }=this.state;
    const challengeType=selectedChallenge.type;
    const challenge=selectedChallenge.id;
    return (
      <div>

        {

          challengeType === 'React' ?
        
            <ReactTestComponent 
              challengeTitle={eval(challenge).challengeTitle}
              challengeText={eval(challenge).challengeText}
              challengeInstructions={eval(challenge).challengeInstructions} 
              seedCode={eval(challenge).seedCode}
              solutionCode={eval(challenge).solutionCode}
              executeTests={eval(challenge).executeTests}
              liveRender={eval(challenge).liveRender}
              QA={eval(challenge).QA}
              selectedChallenge={challenge}
              challenges={this.state.challenges}
              select={this.select} />

          :
          
            <ReduxTestComponent 
              challengeTitle={eval(challenge).challengeTitle}
              challengeText={eval(challenge).challengeText}
              challengeInstructions={eval(challenge).challengeInstructions} 
              seedCode={eval(challenge).seedCode}
              solutionCode={eval(challenge).solutionCode}
              executeTests={eval(challenge).executeTests}
              liveRender={eval(challenge).liveRender}
              QA={eval(challenge).QA}
              selectedChallenge={challenge}
              challenges={this.state.challenges} 
              select={this.select} />

        }

      </div>
    );
  }
};