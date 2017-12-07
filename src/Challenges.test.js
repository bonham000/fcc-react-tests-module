/* eslint-disable */
import React from 'react';

const createJestTest = ({ id }) => {
  return test(id, () => {
    const solutionCode = eval(id).solutionCode
    const executeTests = eval(id).executeTests;
    const { passed, testResults } = executeTests(solutionCode, true);
    // console.log(testResults);
    expect(passed).toBe(true);
  });
}

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

// Challenge Array
const challenges = [
  { id: 'React_01', title: 'Create a Simple JSX Element'},
  { id: 'React_02', title: 'Create a Complex JSX Element'},
  { id: 'React_03', title: 'Add Comments in JSX'},
  { id: 'React_04', title: 'Render HTML Elements to the DOM'},
  { id: 'React_05', title: 'Define an HTML Class in JSX'},
  { id: 'React_06', title: 'Learn About Self-Closing JSX Tags'},
  { id: 'React_07', title: 'Create a Stateless Functional Component'},
  { id: 'React_08', title: 'Create a Component with React'},
  { id: 'React_09', title: 'Create a Component with Composition'},
  { id: 'React_10', title: 'Use React to Render Nested Components'},
  { id: 'React_11', title: 'Compose React Components'},
  { id: 'React_12', title: 'Render a Class Component to the DOM'},
  { id: 'React_13', title: 'Write a React Component from Scratch'},
  { id: 'React_14', title: 'Pass Props to a Stateless Functional Component'},
  { id: 'React_15', title: 'Pass an Array as Props'},
  { id: 'React_16', title: 'Use Default Props'},
  { id: 'React_17', title: 'Override Default Props'},
  { id: 'React_18', title: 'Use PropTypes to Define the Props You Expect'},
  { id: 'React_19', title: 'Access Props Using this.props'},
  { id: 'React_20', title: 'Using Props with Stateless Functional Components'},
  { id: 'React_21', title: 'Create a Stateful Component'},
  { id: 'React_22', title: 'Render State in the User Interface'},
  { id: 'React_23', title: 'Render State in the User Interface Another Way'},
  { id: 'React_24', title: 'Set State with this.setState'},
  { id: 'React_25', title: 'Bind \'this\' to a Class Method'},
  { id: 'React_26', title: 'Bind \'this\' with an ES6 Arrow Function'},
  { id: 'React_27', title: 'Use State to Toggle an Element'},
  { id: 'React_28', title: 'Write a Simple Counter'},
  { id: 'React_29', title: 'Create a Controlled Input'},
  { id: 'React_30', title: 'Create a Controlled Form'},
  { id: 'React_31', title: 'Pass State as Props to Child Components'},
  { id: 'React_32', title: 'Pass a Callback as Props'},
  { id: 'React_33', title: 'Use the Lifecycle Method componentWillMount'},
  { id: 'React_34', title: 'Use the Lifecycle Method componentDidMount'},
  { id: 'React_35', title: 'Add Event Listeners'},
  { id: 'React_36', title: 'Manage Updates with Lifecycle Methods'},
  { id: 'React_37', title: 'Optimize Re-Renders with shouldComponentUpdate'},
  { id: 'React_38', title: 'Introducing Inline Styles'},
  { id: 'React_39', title: 'Add Inline Styles in React'},
  { id: 'React_40', title: 'Use Advanced JavaScript in React Render Method'},
  { id: 'React_41', title: 'Render with an If/Else Condition'},
  { id: 'React_42', title: 'Use && for a More Concise Conditional'},
  { id: 'React_43', title: 'Return null to Prevent Rendering'},
  { id: 'React_44', title: 'Use a Ternary Expression for Conditional Rendering'},
  { id: 'React_45', title: 'Render Conditionally from Props'},
  { id: 'React_46', title: 'Change Inline CSS Conditionally Based on Component State'},
  { id: 'React_47', title: 'Use Array.map() to Dynamically Render Elements'},
  { id: 'React_48', title: 'Give Sibling Elements a Unique Key Attribute'},
  { id: 'React_49', title: 'Use Array.filter() to Dynamically Filter an Array'},
  { id: 'React_50', title: 'Render React on the Server with renderToString'},
  
  { id: 'Redux_01', title: 'Create a Redux Store'},
  { id: 'Redux_02', title: 'Get the State of the Redux Store'},
  { id: 'Redux_03', title: 'Define a Redux Action'},
  { id: 'Redux_04', title: 'Define an Action Creator'},
  { id: 'Redux_05', title: 'Dispatch an Action Event'},
  { id: 'Redux_06', title: 'Handle an Action in the Store'},
  { id: 'Redux_07', title: 'Use a Switch Statement to Handle Multiple Actions'},
  { id: 'Redux_08', title: 'Use const for Action Types'},
  { id: 'Redux_09', title: 'Register a Store Listener'},
  { id: 'Redux_10', title: 'Combine Multiple Reducers'},
  { id: 'Redux_11', title: 'Send Action Data to the Store'},
  { id: 'Redux_12', title: 'Use Middleware to Handle Asynchronous Actions'},
  { id: 'Redux_13', title: 'Write a Counter in Redux'},
  { id: 'Redux_14', title: 'Never Mutate State'},
  { id: 'Redux_15', title: 'Use the Spread Operator on Arrays'},
  { id: 'Redux_16', title: 'Remove an Item from an Array'},
  { id: 'Redux_17', title: 'Copy an Object with Object.assign'},
  { id: 'Redux_18', title: 'Use the ES6 Spread Operator with Objects'},
  
  { id: 'React_Redux_01', title: 'Getting Started with React Redux'},
  { id: 'React_Redux_02', title: 'Manage State Locally First'},
  { id: 'React_Redux_03', title: 'Extract State Logic to Redux'},
  { id: 'React_Redux_04', title: 'Use Provider to Connect Redux to React'},
  { id: 'React_Redux_05', title: 'Map State to Props'},
  { id: 'React_Redux_06', title: 'Map Dispatch to Props'},
  { id: 'React_Redux_07', title: 'Connect Redux to React'},
  { id: 'React_Redux_08', title: 'Connect Redux to the Messages App'},
  { id: 'React_Redux_09', title: 'Extract Local State into Redux'},
  { id: 'React_Redux_10', title: 'Moving Forward From Here'}
];

// Run tests:
challenges.forEach(createJestTest);
