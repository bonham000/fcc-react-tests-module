/* eslint-disable */
import React from 'react'
import assert from 'assert'

import { transform } from 'babel-standalone'

import Enzyme from '../Enzyme';
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;
const render = Enzyme.render;

export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Review Using Props with Stateless Functional Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Except for the last challenge, you've been passing props to stateless functional components. These components act like pure functions. They accept props as input and return the same view every time they are passed the same props. You may be wondering what state is, and the next challenge will cover it in more detail. Before that, here's a review of the terminology for components.
<br><br>

A <em>stateless functional component</em> is any function you write which accepts props and returns JSX. A <em>stateless component</em>, on the other hand, is a class that extends <code>React.Component</code>, but does not use internal state (covered in the next challenge). Finally, a <em>stateful component</em> is any component that does maintain its own internal state. You may see stateful components referred to simply as components or React components.
<br><br>

A common pattern is to try to minimize statefulness and to create stateless functional components wherever possible. This helps contain your state management to a specific area of your application. In turn, this improves development and maintenance of your app by making it easier to follow how changes to state affect its behavior.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>The code editor has a <code>CampSite</code> component that renders a <code>Camper</code> component as a child. Define the <code>Camper</code> component and assign it default props of <code>{ name: 'CamperBot' }</code>. Inside the <code>Camper</code> component, render any code that you want, but make sure to have one <code>p</code> element that includes only the <code>name</code> value that is passed in as a <code>prop</code>. Finally, define <code>propTypes</code> on the <code>Camper</code> component to require <code>name</code> to be provided as a prop and verify that it is of type <code>string</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// change code below this line
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// change code below this line

const Camper = (props) => {
   return (
     <div>
       <p>{props.name}</p>
     </div>
   );
};

Camper.propTypes = {
  name: PropTypes.string.isRequired
};

Camper.defaultProps = {
  name: 'CamperBot'
};
`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'The CampSite component should render.';
  const error_2 = 'The Camper component should render.';
  const error_3 = 'The Camper component should include default props which assign the string \'CamperBot\' to the key name.';
  const error_4 = 'The Camper component should include prop types which require the name prop to be of type string.';
  const error_5 = 'The Camper component should contain a p element with only the text from the name prop.';

  let testResults = [
    {
      test: 0,
      status: false,
      condition: error_0
    },
    {
      test: 1,
      status: false,
      condition: error_1
    },
    {
      test: 2,
      status: false,
      condition: error_2
    },
    {
      test: 3,
      status: false,
      condition: error_3
    },
    {
      test: 4,
      status: false,
      condition: error_4
    },
    {
      test: 5,
      status: false,
      condition: error_5
    }
  ];

  let es5, mockedComponent, passed = true;

  const exportScript = '\n export default CampSite'
  const modifiedCode = code.concat(exportScript);

  /* Crude patch to deal with PropTypes deprecation in React v15.5.0 */
  const index = modifiedCode.indexOf('PropTypes.string.isRequired');
  const patchPropTypes = modifiedCode.slice(0, index) + 'React.' + modifiedCode.slice(index);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(patchPropTypes, { presets: [ 'es2015', 'react' ] }).code;
    testResults[0].status = true;
    if (!errorSuppression) console.log('No transpilation errors!');
  } catch (err) {
    passed = false;
    testResults[0].status = false;
    if (!errorSuppression) console.error(`Transpilation error: ${err}`);
  }

  // now we will try to shallow render the component with Enzyme's shallow method
  // you can also use mount to perform a full render to the DOM environment
  // to do this you must import mount above; i.e. import { shallow, mount } from enzyme
  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // run specific tests to verify the functionality
  // that the challenge is trying to assess:

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('CampSite').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  // test 2:
  try {
    assert.strictEqual(mockedComponent.find('Camper').length, 1, error_2);
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    // propTypes unavailable in production and throw warnings anyway
    // this was the only way I could devise to check that propTypes are included
    const noWhiteSpace = modifiedCode.replace(/\s/g, '');
    const verify1 = 'Camper.defaultProps={name:\'CamperBot\'}';
    const verify2 = 'Camper.defaultProps={name:"CamperBot"}';
    assert.strictEqual(noWhiteSpace.includes(verify1) || noWhiteSpace.includes(verify2), true, error_3);
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

    // test 4:
  try {
    const noWhiteSpace = modifiedCode.replace(/\s/g, '');
    const verifyDefaultProps = 'Camper.propTypes={name:PropTypes.string.isRequired';
    assert.strictEqual(noWhiteSpace.includes(verifyDefaultProps), true, error_4);
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

  // test 5:
  try {
    assert.strictEqual(mockedComponent.contains(<p>{mockedComponent.find('Camper').props().name}</p>), true, error_5);
    testResults[5].status = true;
  } catch (err) {
    passed = false;
    testResults[5].status = false;
  }


  return {
    passed,
    testResults
  }

}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

  try {

    const exportScript = '\n export default CampSite'
    const modifiedCode = code.concat(exportScript);

    /* Crude patch to deal with PropTypes deprecation in React v15.5.0 */
    const index = modifiedCode.indexOf('PropTypes.string.isRequired');
    const patchPropTypes = modifiedCode.slice(0, index) + 'React.' + modifiedCode.slice(index);

    const es5 = transform(patchPropTypes, { presets: [ 'es2015', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
