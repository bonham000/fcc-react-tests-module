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
import * as React_12 from './challenges/react/curriculum/React_12'
import * as React_13 from './challenges/react/curriculum/React_13'
//import * as React_14 from './challenges/react/curriculum/React_14'
//import * as React_15 from './challenges/react/curriculum/React_15'
//import * as React_16 from './challenges/react/curriculum/React_16'
import * as React_17 from './challenges/react/curriculum/React_17'
import * as React_18 from './challenges/react/curriculum/React_18'
import * as React_19 from './challenges/react/curriculum/React_19'
import * as React_20 from './challenges/react/curriculum/React_20'
//import * as React_21 from './challenges/react/curriculum/React_21'
import * as React_22 from './challenges/react/curriculum/React_22'
import * as React_23 from './challenges/react/curriculum/React_23'
import * as React_24 from './challenges/react/curriculum/React_24'
import * as React_25 from './challenges/react/curriculum/React_25'
import * as React_26 from './challenges/react/curriculum/React_26'
import * as React_27 from './challenges/react/curriculum/React_27'
import * as React_28 from './challenges/react/curriculum/React_28'
import * as React_29 from './challenges/react/curriculum/React_29'
import * as React_30 from './challenges/react/curriculum/React_30'
import * as React_31 from './challenges/react/curriculum/React_31'
import * as React_32 from './challenges/react/curriculum/React_32'
import * as React_33 from './challenges/react/curriculum/React_33'
import * as React_34 from './challenges/react/curriculum/React_34'
import * as React_35 from './challenges/react/curriculum/React_35'
import * as React_36 from './challenges/react/curriculum/React_36'
import * as React_37 from './challenges/react/curriculum/React_37'

// import Redux Challenges:
import * as Redux_01 from './challenges/redux/curriculum/Redux_01'
import * as Redux_02 from './challenges/redux/curriculum/Redux_02'
import * as Redux_03 from './challenges/redux/curriculum/Redux_03'
import * as Redux_04 from './challenges/redux/curriculum/Redux_04'
import * as Redux_05 from './challenges/redux/curriculum/Redux_05'
import * as Redux_06 from './challenges/redux/curriculum/Redux_06'
import * as Redux_07 from './challenges/redux/curriculum/Redux_07'
import * as Redux_08 from './challenges/redux/curriculum/Redux_08'
import * as Redux_09 from './challenges/redux/curriculum/Redux_09'
import * as Redux_10 from './challenges/redux/curriculum/Redux_10'
import * as Redux_11 from './challenges/redux/curriculum/Redux_11'
import * as Redux_12 from './challenges/redux/curriculum/Redux_12'
import * as Redux_13 from './challenges/redux/curriculum/Redux_13'

// import React-Redux Challenges
// import * as React_Redux_01 from './challenges/react-redux/curriculum/React_Redux_01'
// import * as React_Redux_02 from './challenges/react-redux/curriculum/React_Redux_02'
// import * as React_Redux_03 from './challenges/react-redux/curriculum/React_Redux_03'
// import * as React_Redux_04 from './challenges/react-redux/curriculum/React_Redux_04'
// import * as React_Redux_05 from './challenges/react-redux/curriculum/React_Redux_05'
// import * as React_Redux_06 from './challenges/react-redux/curriculum/React_Redux_06'
// import * as React_Redux_07 from './challenges/react-redux/curriculum/React_Redux_07'
// import * as React_Redux_08 from './challenges/react-redux/curriculum/React_Redux_08'
// import * as React_Redux_09 from './challenges/react-redux/curriculum/React_Redux_09'
// import * as React_Redux_10 from './challenges/react-redux/curriculum/React_Redux_10'

// add a new challenge to this array:
const challenges = [
  // start React challenges:
  { type: 'React', id: 'React_01'},
  { type: 'React', id: 'React_02'},
  { type: 'React', id: 'React_03'},
  { type: 'React', id: 'React_04'},
  { type: 'React', id: 'React_05'},
  { type: 'React', id: 'React_06'},
  { type: 'React', id: 'React_07'},
  { type: 'React', id: 'React_08'},
  { type: 'React', id: 'React_09'},
  { type: 'React', id: 'React_10'},
  { type: 'React', id: 'React_11'},
  { type: 'React', id: 'React_12'},
  { type: 'React', id: 'React_13'},
  //{ type: 'React', id: 'React_14'},
  //{ type: 'React', id: 'React_15'},
  //{ type: 'React', id: 'React_16'},
  { type: 'React', id: 'React_17'},
  { type: 'React', id: 'React_18'},
  { type: 'React', id: 'React_19'},
  { type: 'React', id: 'React_20'},
  //{ type: 'React', id: 'React_21'},
  { type: 'React', id: 'React_22'},
  { type: 'React', id: 'React_23'},
  { type: 'React', id: 'React_24'},
  { type: 'React', id: 'React_25'},
  { type: 'React', id: 'React_26'},
  { type: 'React', id: 'React_27'},
  { type: 'React', id: 'React_28'},
  { type: 'React', id: 'React_29'},
  { type: 'React', id: 'React_30'},
  { type: 'React', id: 'React_31'},
  { type: 'React', id: 'React_32'},
  { type: 'React', id: 'React_33'},
  { type: 'React', id: 'React_34'},
  { type: 'React', id: 'React_35'},
  // start Redux challenges:
  { type: 'Redux', id: 'Redux_01'},
  { type: 'Redux', id: 'Redux_02'},
  { type: 'Redux', id: 'Redux_03'},
  { type: 'Redux', id: 'Redux_04'},
  { type: 'Redux', id: 'Redux_05'},
  { type: 'Redux', id: 'Redux_06'},
  { type: 'Redux', id: 'Redux_07'},
  { type: 'Redux', id: 'Redux_08'},
  { type: 'Redux', id: 'Redux_09'},
  { type: 'Redux', id: 'Redux_10'},
  { type: 'Redux', id: 'Redux_11'},
  { type: 'Redux', id: 'Redux_12'},
  { type: 'Redux', id: 'Redux_13'}
];

// Change the nested component to React or Redux for which you are testing
export default class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      challenges,
      selectedChallenge: {
        type: 'React',
        id: 'React_01'
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