/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass State as Props to Child Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>You've seen previously plenty of examples
of passing props to child JSX elements and child React components. That's great, but where are we getting the props
from in the first place? Commonly, you will have a stateful component which contains <code>state</code> your app cares
about and this component will render child components. You want these components to also have access to some
pieces of that <code>state</code>.

For example, maybe we have an <code>App</code> component that renders a <code>Navbar</code>, among other components.
In our App, we have <code>state</code> which contains a lot of user information, but in our navbar we just
want to have access to our user's username so we can display it. We can simply pass down that piece of <code>state</code>
to our <code>Navbar</code> component, which it will receive as a prop.<br><br>

This pattern illustrates some important paradigms in React. The first is unidirectional data flow. State flows down
the tree of your app's components, and child components only receive the state data they need to know about. The second
is that complex stateful apps can be broken down into just a few, or maybe even a single, stateful component. The rest
of your components can simply receive state from the parent as props, and are responible for rendering a UI from
that state. This begins to create a separation where state management is handled in one place and UI rendering in
another. This principle of separating state logic from UI logic is one of React's key principles, and when used
correctly makes the design of complex, stateful apps much easier to manage.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided a <code>MyApp</code>
component which renders a <code>Navbar</code> components as a child. The parent component is stateful. Pass the
<code>name</code> property in its state down to the child component and then render it in the <code>&lt;h1/&gt;</code> tag.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'CamperBot'
		}
	}
  render() {
    return (
	   	<div>
	   		<Navbar { /* your code here */ } />
	   	</div>
    );
  }
};

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div>
			<h1>Hello, my name is: { /* your code here */ }</h1>
		</div>
		);
	}	
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'CamperBot'
		}
	}
  render() {
    return (
	   	<div>
	   		<Navbar name={this.state.name}/>
	   	</div>
    );
  }
};
class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		<div>
			<h1>Hello, my name is: {this.props.name}</h1>
		</div>
		);
	}	
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The MyApp component is rendered.';
	const error_2 = 'The Navbar component is rendered.';
	const error_3 = 'The Navbar component receives the MyApp state property name as props.';
	const error_4 = 'The h1 element in Navbar renders the name prop.';

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
	const exportScript = '\n export default MyApp'
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
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('MyApp').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Navbar').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		mockedComponent.setState({ name: 'TestName' });
		const inspectProps = mockedComponent.find('Navbar').props().name;
		assert.strictEqual(inspectProps, 'TestName', error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		mockedComponent.setState({ name: 'TestName' });
		assert.strictEqual(mockedComponent.find('h1').node.innerText.includes('TestName'), true, error_4);
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
		const exportScript = '\n export default MyApp'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}