/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass a String to a Functional Component`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've learned quite a bit about creating and
composing JSX elements, functional components and ES6 style class components in React, it's time to start diving in to some
of the other feautures and capabilities of React that make it such a powerful tool for creating complex, reactive UIs. A
good place to start is with props. In React, we use props, short for properties, to <em>pass</em> information from a parent
component to a child.<br><br>

The first thing you'll notice is that we have defined a functional component called <code>ReturnUsername</code> that accepts an
argument called <code>props</code>. We can access props from within the component using dot notation, so if we were passing in
a prop called <code>birthday</code>, we would access it by writing <code>props.birthday</code>. To do this in JSX you would
write <code>{props.birthday}</code>.<br><br>

In order to define a props name and value, React uses <strong>custom HTML attributes</strong>, where the attribute name is the prop name,
and the attribute value is the prop's value. For example, to pass a child component a prop called <code>birthday</code>, 
when we compose the child component within the parent, we could write something like this: <code>&lt;Child birthday="Jul 6th, 1986" /&gt;</code>.
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span> We have already composed the
<code>ReturnUsername</code> component for you within the parent, <code>ForgotUsername</code>. Pass the <code>ReturnUsername</code> 
component a prop of <code>username</code> and give it a value of your freeCodeCamp username (don't forget to wrap it in quotes)!
Before rendering though, let's be sure we can access this prop within the child. In the <code>ReturnUsername</code> component, 
use dot notation to access the <code>username</code> prop inside the curly braces. Run the tests and see what happens!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const ReturnUsername = (props) => {
	return (
		<div>
			{ /* change code below this line */ }
			<p>Your username is: { }!</p>
			{ /* change code above this line */ }
		</div>
	);
};

class ForgotUsername extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Whoops! See below...</h3>
				{ /* change code below this line */ }
				<ReturnUsername />
				{ /* change code above this line */ }
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const ReturnUsername = (props) => {
    return (
        <div>
            <p>Your username is {props.username}!</p>
        </div>
    );
};

class ForgotUsername extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        	<h3>Whoops! See below...</h3>
        	{ /* change code below this line */ }
          <ReturnUsername username="Best_Free_Code_Camper"/>
        	{ /* change code above this line */ }
        </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The ForgotUsername component returns a single <div> element.';
	const error_2 = 'The ForgotUsername component\'s second child is the ReturnUsername component.';
	const error_3 = 'The ReturnUsername component has a prop called username.';
	const error_4 = 'The ReturnUsername component\'s username prop is equal to some text.';

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
	const exportScript = '\n export default ForgotUsername'
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
		assert.strictEqual(mockedComponent.nodes[0].props.children[1].type.name, 'ReturnUsername', error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert(mockedComponent.props().children[1].props.hasOwnProperty('username'), error_3)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(typeof mockedComponent.props().children[1].props.username === 'string' &&
			mockedComponent.props().children[1].props.username.length > 0, error_4)
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
		const exportScript = '\n export default ForgotUsername'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}