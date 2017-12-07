/* eslint-disable */

// import React Challenges:
import * as React_01 from './challenges/react/React_01'
import * as React_02 from './challenges/react/React_02'
import * as React_03 from './challenges/react/React_03'
import * as React_04 from './challenges/react/React_04'
import * as React_05 from './challenges/react/React_05'
import * as React_06 from './challenges/react/React_06'
import * as React_07 from './challenges/react/React_07'
import * as React_08 from './challenges/react/React_08'
import * as React_09 from './challenges/react/React_09'
import * as React_10 from './challenges/react/React_10'
import * as React_11 from './challenges/react/React_11'
import * as React_12 from './challenges/react/React_12'
import * as React_13 from './challenges/react/React_13'
import * as React_14 from './challenges/react/React_14'
import * as React_15 from './challenges/react/React_15'
import * as React_16 from './challenges/react/React_16'
import * as React_17 from './challenges/react/React_17'
import * as React_18 from './challenges/react/React_18'
import * as React_19 from './challenges/react/React_19'
import * as React_20 from './challenges/react/React_20'
import * as React_21 from './challenges/react/React_21'
import * as React_22 from './challenges/react/React_22'
import * as React_23 from './challenges/react/React_23'
import * as React_24 from './challenges/react/React_24'
import * as React_25 from './challenges/react/React_25'
import * as React_26 from './challenges/react/React_26'
import * as React_27 from './challenges/react/React_27'
import * as React_28 from './challenges/react/React_28'
import * as React_29 from './challenges/react/React_29'
import * as React_30 from './challenges/react/React_30'
import * as React_31 from './challenges/react/React_31'
import * as React_32 from './challenges/react/React_32'
import * as React_33 from './challenges/react/React_33'
import * as React_34 from './challenges/react/React_34'
import * as React_35 from './challenges/react/React_35'
import * as React_36 from './challenges/react/React_36'
import * as React_37 from './challenges/react/React_37'
import * as React_38 from './challenges/react/React_38'
import * as React_39 from './challenges/react/React_39'
import * as React_40 from './challenges/react/React_40'
import * as React_41 from './challenges/react/React_41'
import * as React_42 from './challenges/react/React_42'
import * as React_43 from './challenges/react/React_43'
import * as React_44 from './challenges/react/React_44'
import * as React_45 from './challenges/react/React_45'
import * as React_46 from './challenges/react/React_46'
import * as React_47 from './challenges/react/React_47'
import * as React_48 from './challenges/react/React_48'
import * as React_49 from './challenges/react/React_49'
import * as React_50 from './challenges/react/React_50'

// import Redux Challenges:
import * as Redux_01 from './challenges/redux/Redux_01'
import * as Redux_02 from './challenges/redux/Redux_02'
import * as Redux_03 from './challenges/redux/Redux_03'
import * as Redux_04 from './challenges/redux/Redux_04'
import * as Redux_05 from './challenges/redux/Redux_05'
import * as Redux_06 from './challenges/redux/Redux_06'
import * as Redux_07 from './challenges/redux/Redux_07'
import * as Redux_08 from './challenges/redux/Redux_08'
import * as Redux_09 from './challenges/redux/Redux_09'
import * as Redux_10 from './challenges/redux/Redux_10'
import * as Redux_11 from './challenges/redux/Redux_11'
import * as Redux_12 from './challenges/redux/Redux_12'
import * as Redux_13 from './challenges/redux/Redux_13'
import * as Redux_14 from './challenges/redux/Redux_14'
import * as Redux_15 from './challenges/redux/Redux_15'
import * as Redux_16 from './challenges/redux/Redux_16'
import * as Redux_17 from './challenges/redux/Redux_17'
import * as Redux_18 from './challenges/redux/Redux_18'

// import React-Redux Challenges
import * as React_Redux_01 from './challenges/react-redux/React_Redux_01'
import * as React_Redux_02 from './challenges/react-redux/React_Redux_02'
import * as React_Redux_03 from './challenges/react-redux/React_Redux_03'
import * as React_Redux_04 from './challenges/react-redux/React_Redux_04'
import * as React_Redux_05 from './challenges/react-redux/React_Redux_05'
import * as React_Redux_06 from './challenges/react-redux/React_Redux_06'
import * as React_Redux_07 from './challenges/react-redux/React_Redux_07'
import * as React_Redux_08 from './challenges/react-redux/React_Redux_08'
import * as React_Redux_09 from './challenges/react-redux/React_Redux_09'
import * as React_Redux_10 from './challenges/react-redux/React_Redux_10'

// create an array of challenge data to load into the page
const challenges = [
  // React challenges:
  { type: 'React', id: 'React_01', title: 'Create a Simple JSX Element'},
  { type: 'React', id: 'React_02', title: 'Create a Complex JSX Element'},
  { type: 'React', id: 'React_03', title: 'Add Comments in JSX'},
  { type: 'React', id: 'React_04', title: 'Render HTML Elements to the DOM'},
  { type: 'React', id: 'React_05', title: 'Define an HTML Class in JSX'},
  { type: 'React', id: 'React_06', title: 'Learn About Self-Closing JSX Tags'},
  { type: 'React', id: 'React_07', title: 'Create a Stateless Functional Component'},
  { type: 'React', id: 'React_08', title: 'Create a Component with React'},
  { type: 'React', id: 'React_09', title: 'Create a Component with Composition'},
  { type: 'React', id: 'React_10', title: 'Use React to Render Nested Components'},
  { type: 'React', id: 'React_11', title: 'Compose React Components'},
  { type: 'React', id: 'React_12', title: 'Render a Class Component to the DOM'},
  { type: 'React', id: 'React_13', title: 'Write a React Component from Scratch'},
  { type: 'React', id: 'React_14', title: 'Pass Props to a Stateless Functional Component'},
  { type: 'React', id: 'React_15', title: 'Pass an Array as Props'},
  { type: 'React', id: 'React_16', title: 'Use Default Props'},
  { type: 'React', id: 'React_17', title: 'Override Default Props'},
  { type: 'React', id: 'React_18', title: 'Use PropTypes to Define the Props You Expect'},
  { type: 'React', id: 'React_19', title: 'Access Props Using this.props'},
  { type: 'React', id: 'React_20', title: 'Using Props with Stateless Functional Components'},
  { type: 'React', id: 'React_21', title: 'Create a Stateful Component'},
  { type: 'React', id: 'React_22', title: 'Render State in the User Interface'},
  { type: 'React', id: 'React_23', title: 'Render State in the User Interface Another Way'},
  { type: 'React', id: 'React_24', title: 'Set State with this.setState'},
  { type: 'React', id: 'React_25', title: 'Bind \'this\' to a Class Method'},
  { type: 'React', id: 'React_26', title: 'Bind \'this\' with an ES6 Arrow Function'},
  { type: 'React', id: 'React_27', title: 'Use State to Toggle an Element'},
  { type: 'React', id: 'React_28', title: 'Write a Simple Counter'},
  { type: 'React', id: 'React_29', title: 'Create a Controlled Input'},
  { type: 'React', id: 'React_30', title: 'Create a Controlled Form'},
  { type: 'React', id: 'React_31', title: 'Pass State as Props to Child Components'},
  { type: 'React', id: 'React_32', title: 'Pass a Callback as Props'},
  { type: 'React', id: 'React_33', title: 'Use the Lifecycle Method componentWillMount'},
  { type: 'React', id: 'React_34', title: 'Use the Lifecycle Method componentDidMount'},
  { type: 'React', id: 'React_35', title: 'Add Event Listeners'},
  { type: 'React', id: 'React_36', title: 'Manage Updates with Lifecycle Methods'},
  { type: 'React', id: 'React_37', title: 'Optimize Re-Renders with shouldComponentUpdate'},
  { type: 'React', id: 'React_38', title: 'Introducing Inline Styles'},
  { type: 'React', id: 'React_39', title: 'Add Inline Styles in React'},
  { type: 'React', id: 'React_40', title: 'Use Advanced JavaScript in React Render Method'},
  { type: 'React', id: 'React_41', title: 'Render with an If/Else Condition'},
  { type: 'React', id: 'React_42', title: 'Use && for a More Concise Conditional'},
  { type: 'React', id: 'React_43', title: 'Return null to Prevent Rendering'},
  { type: 'React', id: 'React_44', title: 'Use a Ternary Expression for Conditional Rendering'},
  { type: 'React', id: 'React_45', title: 'Render Conditionally from Props'},
  { type: 'React', id: 'React_46', title: 'Change Inline CSS Conditionally Based on Component State'},
  { type: 'React', id: 'React_47', title: 'Use Array.map() to Dynamically Render Elements'},
  { type: 'React', id: 'React_48', title: 'Give Sibling Elements a Unique Key Attribute'},
  { type: 'React', id: 'React_49', title: 'Use Array.filter() to Dynamically Filter an Array'},
  { type: 'React', id: 'React_50', title: 'Render React on the Server with renderToString'},

  // Redux challenges:
  { type: 'Redux', id: 'Redux_01', title: 'Create a Redux Store'},
  { type: 'Redux', id: 'Redux_02', title: 'Get the State of the Redux Store'},
  { type: 'Redux', id: 'Redux_03', title: 'Define a Redux Action'},
  { type: 'Redux', id: 'Redux_04', title: 'Define an Action Creator'},
  { type: 'Redux', id: 'Redux_05', title: 'Dispatch an Action Event'},
  { type: 'Redux', id: 'Redux_06', title: 'Handle an Action in the Store'},
  { type: 'Redux', id: 'Redux_07', title: 'Use a Switch Statement to Handle Multiple Actions'},
  { type: 'Redux', id: 'Redux_08', title: 'Use const for Action Types'},
  { type: 'Redux', id: 'Redux_09', title: 'Register a Store Listener'},
  { type: 'Redux', id: 'Redux_10', title: 'Combine Multiple Reducers'},
  { type: 'Redux', id: 'Redux_11', title: 'Send Action Data to the Store'},
  { type: 'Redux', id: 'Redux_12', title: 'Use Middleware to Handle Asynchronous Actions'},
  { type: 'Redux', id: 'Redux_13', title: 'Write a Counter in Redux'},
  { type: 'Redux', id: 'Redux_14', title: 'Never Mutate State'},
  { type: 'Redux', id: 'Redux_15', title: 'Use the Spread Operator on Arrays'},
  { type: 'Redux', id: 'Redux_16', title: 'Remove an Item from an Array'},
  { type: 'Redux', id: 'Redux_17', title: 'Copy an Object with Object.assign'},
  { type: 'Redux', id: 'Redux_18', title: 'Use the ES6 Spread Operator with Objects'},

  // React-Redux challenges:
  { type: 'React', id: 'React_Redux_01', title: 'Getting Started with React Redux'},
  { type: 'React', id: 'React_Redux_02', title: 'Manage State Locally First'},
  { type: 'Redux', id: 'React_Redux_03', title: 'Extract State Logic to Redux'},
  { type: 'React', id: 'React_Redux_04', title: 'Use Provider to Connect Redux to React'},
  { type: 'Redux', id: 'React_Redux_05', title: 'Map State to Props'},
  { type: 'Redux', id: 'React_Redux_06', title: 'Map Dispatch to Props'},
  { type: 'React', id: 'React_Redux_07', title: 'Connect Redux to React'},
  { type: 'React', id: 'React_Redux_08', title: 'Connect Redux to the Messages App'},
  { type: 'React', id: 'React_Redux_09', title: 'Extract Local State into Redux'},
  { type: 'Redux', id: 'React_Redux_10', title: 'Moving Forward From Here'}
];

// Challenge Tester:
export default () => {

    console.warn('Starting Tests:');
    let challengesPassed = 0;
    let failures = [];
    let skipped = [];
    
    let totalFailedTests = 0;

    const logFailure = ({ test, status, condition }) => {
        if (!status) {
          totalFailedTests ++;
          console.error(`Test ${test} failed: ${condition}`);
        }
    }

    const filterSome = ({ id, title }) => {
        const shouldFilter = (
            id !== 'React_04' &&
            id !== 'React_06' &&
            id !== 'React_12' &&
            id !== 'React_13'
        );
        if (!shouldFilter) skipped.push(`Skipped Challenge: ${id}: ${title}`);
        return shouldFilter;
    }

    challenges.slice(0).filter(filterSome).map(({ id, title }) => {
        console.info(`Testing challenge ${id}`);
        const {  solutionCode, executeTests } = eval(id);
        {
          const console = { log: () => null }; // block console.log in tests
          let { passed, testResults } = executeTests(solutionCode, true);
          if (passed) {
              challengesPassed++;
          } else {
              failures.push(`Failed Challenge: ${id}: ${title}`);
              testResults.map(logFailure);
          }  
        }
    });

    console.log('\n');
    console.warn(`${challengesPassed} tests passed out of ${challenges.length} total challenges. Results:`);
    console.log('\n');
    console.warn(`${skipped.length} challenges skipped:`)
    skipped.forEach(m => console.log(m));
    console.warn(`${failures.length} challenges failed:`)
    failures.forEach(m => console.log(m));
    console.log('\n');
    console.error(`Total Failed Test Cases: ${totalFailedTests}\n`);
};

