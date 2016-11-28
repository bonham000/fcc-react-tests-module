import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'
import CodeMirror from 'react-codemirror'

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use React to Render Nested Components.`
export const challengeInstructions = `
	<span class = 'default'>Instructions: </span>This React Component returns an empty <code>div</code> element at the moment.
	 Render two additional components inside this <code>div</code>. We've provided an <code>Account</code> and <code>UserList</code> component for you.
	 You can include these directly within the React Component's render method.
`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    <div>
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
export default class MyComponent extends React.Component {
  render() {
    return (
	    // change code below this line
	    <div>
	    	<Account />
	    	<UserList />
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const prependedCode = `
	const Account = () => <div></div>
	const UserList = () => <div></div>`

	// provide Account and UserList to code:
	const input = prependedCode.concat(code);

	let es5, mockedComponent, shallowRender, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			failure: 'Your JSX code could not be transpiled successfully.',
			success: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			failure: 'The React component does not return a single <div> element.',
			success: 'The React component returns a single <div> element.'
		},
		{
			test: 2,
			status: false,
			failure: 'The component does not return two nested components.',
			success: 'The component does return two nested components.'
		},
		{
			test: 3,
			status: false,
			failure: 'The first child of the component is not the <Account /> component.',
			success: 'The first child of the component is the <Account /> component.'
		},
		{
			test: 4,
			status: false,
			failure: 'The second child of the component is not the <UserList /> component.',
			success: 'The second child of the component is not the <UserList /> component.'
		}
	]

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(input, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// shallow render the component with Enzyme
	try {
		shallowRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect(shallowRender.type()).toEqual('div');
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	//test 2:
	try {
		expect(shallowRender.children().length).toBe(2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		expect(shallowRender.find('div').childAt(0).name()).toEqual('Account');
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		expect(shallowRender.find('div').childAt(1).name()).toEqual('UserList');
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
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
		const es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}