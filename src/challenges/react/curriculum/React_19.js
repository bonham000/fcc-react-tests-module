/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Access Props Using this.props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
Ok, so we've got the basics down of passing props down to child components. But what if the child component that we're 
passing a prop to is an ES6 style React component, rather than a stateless functional component? To account for this, we need to change 
the convention through which we access props slightly.<br><br>

Whenever we refer to a class component within itself, we always use the <code>this</code> keyword. So to access props within a class component, 
we simply need to preface the code that we use to access it with <code>this</code>. For example, in our last challenge, we accessed the prop <code>username</code> 
in our JSX code using <code>{props.username}</code>, but if the <code>ReturnUsername</code> component had been an ES6 class component instead, we would have written <code>{this.props.username}</code>. That's it!
Easy, right? We'll see many more uses for <code>this</code> as we continue forward.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
In the parent component <code>ResetPassword</code>, render an instance of the <code>ReturnTempPassword</code> component in the indicated space. Give this component 
a prop of <code>tempPassword</code> and assign it a value of a string that is at least 8 characters long. Within the child, <code>ReturnTempPassword</code>, lets make sure the 
user sees the temporary password by accessing the <code>tempPassword</code> prop within the <code>&lt;strong&gt;</code> tags.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`class ReturnTempPassword extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        		{ /* change code below this line */ }
            <p>Your temporary password is: <strong></strong></p>
            { /* change code above this line */ }
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        	<h2>Reset Password</h2>
        	<h3>We've generated a new temporary password for you.</h3>
        	<h3>Please reset this password from your account settings ASAP.</h3>
        	{ /* change code below this line */ }
          
        	{ /* change code above this line */ }
        </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`class ReturnTempPassword extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: <strong>{this.props.tempPassword}</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        	<h2>Reset Password</h2>
        	<h3>We've generated a new temporary password for you.</h3>
        	<h3>Please reset this password from your account settings ASAP.</h3>
        	{ /* change code below this line */ }
          <ReturnTempPassword tempPassword="serrPbqrPnzc" />
        	{ /* change code above this line */ }
        </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The ResetPassword component returns a single <div> element.';
	const error_2 = 'The ResetPassword component\'s fourth child is the ReturnTempPassword component.';
	const error_3 = 'The ReturnTempPassword component has a prop called tempPassword.';
	const error_4 = 'The ReturnTempPassword component\'s tempPassword prop is equal to a string of at least 8 characters.';

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
			test: 3,
			status: false,
			condition: error_4
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default ResetPassword'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	console.log(mockedComponent.props());

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.nodes[0].props.children[3].type.name, 'ReturnTempPassword', error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert(mockedComponent.props().children[3].props.hasOwnProperty('tempPassword'), error_3)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(typeof mockedComponent.props().children[3].props.tempPassword === 'string' &&
			mockedComponent.props().children[3].props.tempPassword.length >= 8, error_4)
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
		const exportScript = '\n export default ResetPassword'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}