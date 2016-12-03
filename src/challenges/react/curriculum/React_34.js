/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Lifecycle Methods: componentDidMount`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>You will inevitablely encounter the need to call
some API endpoint to retrieve data and if you're working with React you'll need to do where to perform this action.

The best practice with React is to place API calls or any calls to your server in the lifecycle method <code>componentDidMount</code>.
This method is called after a component is mounted and any calls to <code>setState</code> here will trigger a re-rendering of
your component. Calling an API here and setting your state with the data that returns will automatically trigger the update
once you receive the data.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've created a mock API call in
<code>componentDidMount</code>. It just sets state after 2.5 seconds to simulate calling a server to retrieve the current
total active users for a site (or whatever data you might need). In the render method, render the value of <code>activeUsers</code> in the <code>h1</code>.
Watch what happens in the preview. Play around with changing the timeout.<br><br>

Note that because we wrote the timeout function as an ES6 arrow function, it is <code>this</code> aware and therefore has
access to <code>this.setState</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeUsers: null
		};
	}
	componentDidMount() {
		setTimeout( () => {
			this.setState({
				activeUsers: 1273
			});
		}, 2500);
	}
  render() {
    return (
			<div>
				<h1>Data: { /* change code here */ }</h1>
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
			activeUsers: null
		};
	}
	componentDidMount() {
		setTimeout( () => {
			this.setState({
				activeUsers: 1273
			});
		}, 2500);
	}
  render() {
    return (
			<div>
				<h1>Data: {this.state.activeUsers}</h1>
			</div>
    );
  }
};`


// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent renders a div element which wraps an h1 tag.';
	const error_2 = 'Component state is updated with a timeout function in componentDidMount().';
	const error_3 = 'The h1 tag renders out the activeUsers value from state and updates after the timeout function completes.';

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

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default MyComponent'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('h1').length === 1,
			error_1
		);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		const lifecycle = React.createElement(eval(es5)).type.prototype.componentDidMount.toString().replace(/\s/g,'');
		assert(
			lifecycle.includes('setTimeout') === true &&
			lifecycle.includes('setState({activeUsers:') === true,
			error_2
		);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		const before = mockedComponent.find('h1').node.innerText;
		mockedComponent.setState({ activeUsers: 1000 });
		const after = mockedComponent.find('h1').node.innerText;
		assert.notStrictEqual(before, after, error_3);
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
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}