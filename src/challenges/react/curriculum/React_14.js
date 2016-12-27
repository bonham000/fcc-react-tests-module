/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass a String to a Stateless Functional Component`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The previous challenges covered a lot about creating and composing JSX elements, functional components, and ES6 style class components in React. Now with this foundation, let's look at another feature very common in React: <b>props</b>. In React we can pass props, or properties, to child components. Let's say we have an <code>App</code> component which renders a child component called <code>Welcome</code>. We can write:

<pre>
<code class="codeBlock">&lt;App&gt;
  &lt;Welcome user='Mark' /&gt;
 &lt;/App&gt;</code>
</pre>

We use <strong>custom HTML attributes</strong> that React provides support for to pass the property <code>user</code> to the component <code>Welcome</code>. Now, the <code>Welcome</code> component has access to this value like so:

<pre>
<code>const Welcome = (props) => &lt;h1&gt;Hello, {props.user}!&lt;/h1&gt;</code>
</pre>

It is standard to call this value <code>props</code> and when dealing with functional stateless components you basically consider it as an argument to the function which returns JSX. You can access the value of the argument in the function body. With class components, we will see this is a little different.
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've created a <code>Calendar</code> and <code>CurrentDate</code> component. When rendering <code>CurrentDate</code> from the <code>Calendar</code> component, we want to pass in a property of <code>date</code> assigned to the current date from JavaScript's <code>Date</code> object. Do this and then access this <code>prop</code> in the <code>CurrentDate</code> component, printing out its value. Note that for <code>prop</code> values to be evaluated as JavaScript they must be enclosed in curly brackets, for instance <code>date={Date()}</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const CurrentDate = (props) => {
	return (
		<div>
			{ /* change code below this line */ }
			<p>The current date is: </p>
			{ /* change code above this line */ }
		</div>
	);
};

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>What date is it?</h3>
				{ /* change code below this line */ }
				<CurrentDate />
				{ /* change code above this line */ }
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const CurrentDate = (props) => {
	return (
		<div>
			{ /* change code below this line */ }
			<p>The current date is: {props.date}</p>
			{ /* change code above this line */ }
		</div>
	);
};

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>What date is it?</h3>
				{ /* change code below this line */ }
				<CurrentDate date={Date()} />
				{ /* change code above this line */ }
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code should transpile successfully.';
	const error_1 = 'The Calendar component should return a single div element.';
	const error_2 = 'The Calendar component\'s second child should be the CurrentDate component.';
	const error_3 = 'The CurrentDate component should have a prop called date.';
	const error_4 = 'The CurrentDate component\'s date prop should contain a string of text.';
	const error_5 = 'The CurrentDate component\'s renders out the value from the date prop in the p tag.';

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

	let es5, mockedComponent, mountedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default Calendar'
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
		mountedComponent = mount(React.createElement(eval(es5)));
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
		assert.strictEqual(mockedComponent.nodes[0].props.children[1].type.name, 'CurrentDate', error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert(mockedComponent.props().children[1].props.hasOwnProperty('date'), error_3)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(typeof mockedComponent.props().children[1].props.date === 'string' &&
			mockedComponent.props().children[1].props.date.length > 0, error_4)
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

// test 5:
	try {
		assert.strictEqual(mountedComponent.find('p').node.innerHTML.includes(Date().substr(3)), true, error_5);
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
		const exportScript = '\n export default Calendar'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
