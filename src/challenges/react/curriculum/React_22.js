/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render State in the UI`

export const challengeText = `<span class = 'default'>Intro: </span>Now that we have learned how to define a component's initial
state let's see how this state can be displayed in the UI that we render. If a component is stateful, it will always have access
to the data in <code>state</code> in the <code>render</code> method. You can access this data with <code>this.state</code>.
If you want to access this state value within the <code>return</code> of the return method, you have to enclose the value in
curly braces. This instructs the enclosed code to be evaluated directly as JavaScript. We will see more examples of this later on.<br><br>

<code>State</code> is one of the most powerful features of components in React. It allows you to track important data in your app and
render a UI in response to this data. If your data changes, your UI will change. It is important to note that if you make a component
stateful, no other components are aware of its <code>state</code>. Its <code>state</code> is completely encapsulated or local to
that component, unless it decides to pass down some peice of its state to a child component as <code>props</code>. We will soon
see an example of this. This notion of encapsulated <code>state</code> is very useful because it allows us to write certain logic
and have that logic be contained and isolated within a single component.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>This component is already stateful.
Define an <code>&lt;h1&gt;</code> tag in the component's render method which renders out the value of <code>this.state.name</code>
from the component's state. Note: the <code>&lt;h1&gt;</code> should only render the value from <code>state</code> and nothing else.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Free Code Camp'
		}
	}
	render() {
  	return (
	    <div>
	    	{ /* change code below this line */ }

	    	{ /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Free Code Camp'
		}
	}
  render() {
    return (
	    <div>
				{ /* change code below this line */ }
				<h1>{this.state.name}</h1>
	    	{ /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The component has a key "name" with value "Free Code Camp" stored in its state';
	const error_2 = 'The component renders an h1 tag';
	const error_3 = 'The rendered h1 tag contains text rendered from the component\'s state';

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
		}
	];

	let es5, mockedComponent, passed = true;

	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.state('name'), 'Free Code Camp', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.children().type(), 'h1', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		mockedComponent.setState({name: 'TestName'});
		assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_3);
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;
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
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}