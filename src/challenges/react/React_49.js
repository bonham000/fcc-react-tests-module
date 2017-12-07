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
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Array.filter() to Dynamically Filter an Array`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>map</code> array method is a powerful tool that you will use often when working with React. Another method related to <code>map</code> is <code>filter</code>, which filters the contents of an array based on a condition, then returns a new array. For example, if you have an array of users that all have a property <code>online</code> which can be set to <code>true</code> or <code>false</code>, you can filter only those users that are online by writing:
<br><br>

<code>let onlineUsers = users.filter(user => user.online);`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>In the code editor, <code>MyComponent</code>'s <code>state</code> is initialized with an array of users. Some users are online and some aren't. Filter the array so you see only the users who are online. To do this, first use <code>filter</code> to return a new array containing only the users whose <code>online</code> property is <code>true</code>. Then, in the <code>renderOnline</code> variable, map over the filtered array, and return a <code>li</code> element for each user that contains the text of their <code>username</code>. Be sure to include a unique <code>key</code> as well, like in the last challenges.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    }
  }
  render() {
    const usersOnline = // change code here
    const renderOnline = // change code here
    return (
       <div>
         <h1>Current Online Users:</h1>
         <ul>
           {renderOnline}
         </ul>
       </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    }
  }
  render() {
    const usersOnline = this.state.users.filter(user => {
      return user.online;
    });
    const renderOnlineUsers = usersOnline.map(user => {
      return (
        <li key={user.username}>{user.username}</li>
      );
    });
    return (
       <div>
         <h1>Current Online Users:</h1>
         <ul>
          {renderOnlineUsers}
        </ul>
       </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code, errorSuppression) => {

  const error_0 = 'Your JSX code should transpile successfully.';
  const error_1 = 'MyComponent should exist and render to the page.';
  const error_2 = 'MyComponent\'s state should be initialized to an array of six users.';
  const error_3 = 'MyComponent should return a div, an h1, and then an unordered list containing li tags for every user whose online status is set to true.';
  const error_4 = 'MyComponent should render li elements that contain the username of each online user.';
  const error_5 = 'Each list item element should have a unique key attribute.';

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

  // this applies an export to the user's code so
  // we can access their component here for tests
  const exportScript = '\n export default MyComponent'
  const modifiedCode = code.concat(exportScript);

  // test 0: try to transpile JSX, ES6 code to ES5 in browser
  try {
    es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    testResults[0].status = true;
    if (!errorSuppression) console.log('No transpilation errors!');
  } catch (err) {
    passed = false;
    testResults[0].status = false;
    if (!errorSuppression) console.error(`Transpilation error: ${err}`);
  }

  try {
    var React = require('react');
    mockedComponent = mount(React.createElement(eval(es5)));
  } catch (err) {
    passed = false;
    if (!errorSuppression) console.error(`Invalid React code: ${err}`);
  }

  // test 1:
  try {
    assert.strictEqual(mockedComponent.find('MyComponent').length, 1, error_1);
    testResults[1].status = true;
  } catch (err) {
    passed = false;
    testResults[1].status = false;
  }

  let initialState, state_1, state_2, state_3, state_4;

  // test 2:
  try {
    initialState = mockedComponent.state();
    assert(
      Array.isArray(initialState.users) === true &&
      initialState.users.length === 6,
      error_2
    );
    testResults[2].status = true;
  } catch (err) {
    passed = false;
    testResults[2].status = false;
  }

  // test 3:
  try {
    state_1 = mockedComponent.find('li');
    mockedComponent.setState({
      users:[
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: true
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: true
            },
        {
          username: 'Laura',
          online: true
        }
      ]
    });
    state_2 = mockedComponent.find('li');
    mockedComponent.setState({
      users:[
        {
          username: 'Jeff',
          online: false
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: false
        },
        {
          username: 'Jim',
          online: false
            },
        {
          username: 'Laura',
          online: false
        }
      ]
    });
    state_3 = mockedComponent.find('li');
    mockedComponent.setState({users: []});
    state_4 = mockedComponent.find('li');
    assert(
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h1').length === 1 &&
      mockedComponent.find('ul').length === 1 &&
      state_1.length === 4 &&
      state_2.length === 5 &&
      state_3.length === 0 &&
      typeof state_3.node === 'undefined' &&
      state_4.length === 0 &&
      typeof state_4.node === 'undefined',
      error_3
    );
    testResults[3].status = true;
  } catch (err) {
    passed = false;
    testResults[3].status = false;
  }

  // test 4:
  try {
    let elements = state_2.nodes;
    assert(
      elements[0].innerText === 'Jeff' &&
      elements[1].innerText === 'Alan' &&
      elements[2].innerText === 'Mary' &&
      elements[3].innerText === 'Jim' &&
      elements[4].innerText === 'Laura',
      error_4
    );
    testResults[4].status = true;
  } catch (err) {
    passed = false;
    testResults[4].status = false;
  }

    // test 5:
  try {
    let node1 = state_1.nodes[1].outerHTML;
    let node2 = state_1.nodes[2].outerHTML;
    let match1 = node1.match(/\$/);
    let match2 = node2.match(/\$/);
    assert(
      code.replace(/\s/g, '').includes('<likey={') &&
      node1[match1.index + 1] !== node2[match2.index + 1],
      error_5
    );
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
    const exportScript = '\n export default MyComponent'
    const modifiedCode = code.concat(exportScript);
    const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
    const renderedComponent = React.createElement(eval(es5));
    return renderedComponent;
  } catch (err) {
    // console.log(`Live rendering failure: ${err}`);
  }

}
