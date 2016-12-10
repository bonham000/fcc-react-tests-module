/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Filter to Dynamically Filter an Array`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>map</code> array method is a powerful tool
that you will use often when working with React. Related to <code>map</code> is <code>filter</code>, which also lets us
take an array and filter its contents based on some condition, returning a new array.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we are initializing our component's
<code>state</code> with an array of users. Some are online, some aren't. Let's filter this array so we can see just the users who are
online. To do this first use <code>filter</code> to return a new array containing only the users whose <code>online</code>
property is <code>true</code>. Then map over this filtered array, returning a <code>&lt;p/&gt;</code> element for each user
which contains the text of their <code>username</code>.`

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
  	const filterUsers = // change code here
  	const renderOnline = // change code here
    return (
	   	<div>
	   		<h1>Current Online Users:</h1>
	   		{renderOnline}
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
  	const filterUsers = this.state.users.filter( (user) => {
  		return user.online;
  	});
  	const renderOnlineUsers = filterUsers.map( (user) => {
  		return (
  			<p>{user.username}</p>
  		);
  	});
    return (
	   	<div>
	   		<h1>Current Online Users:</h1>
				{renderOnlineUsers}
	   	</div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent exists and is rendered to the page.';
	const error_2 = 'MyComponent\' state is initialized to an array of 6 users.';
	const error_3 = 'MyComponent returns a div, h1, and a p tag for every user whose online status is set to true.';
	const error_4 = 'MyComponent renders p elements that contain the username of each online user.';

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
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

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
		state_1 = mockedComponent.find('p');
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
		state_2 = mockedComponent.find('p');
		console.log(state_2);
		setTimeout(() => {
			console.log(state_2);
		}, 1000);
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
		state_3 = mockedComponent.find('p');
		mockedComponent.setState({users: []});
		state_4 = mockedComponent.find('p');
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('h1').length === 1 &&
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
		console.log(err);
	}

}