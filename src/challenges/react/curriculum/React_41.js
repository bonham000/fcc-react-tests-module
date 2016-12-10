/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render with an If/Else Condition`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Another application of using JavaScript to control our rendered view is to create a simple condition
and only render some elements when this condition is true. Here we will do this with a standard <code>if/else</code> statement in the <code>render()</code> method
of a React component.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've created a component that contains a <code>boolean</code> in its state
which represents a condition which tracks if we want to display some element in the UI or not. We've wired up a <code>&lt;button/&gt;</code> to toggle the state of this value. Currently,
we render the same UI everytime. Rewrite the <code>render()</code> method with an <code>if/else</code> statement so that if <code>display</code> is <code>true</code> we return the current
markup, otherwise, let's just return the <code>&lt;button/&gt;</code> without the <code>&lt;h1/&gt;</code> element.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: true
		}
	}
	toggleDisplay = () => {
		this.setState({
			display: !this.state.display
		});
	}
  render() {
  	// change code below this line
    return (
	   	<div>
	   		<button onClick={this.toggleDisplay}>Toggle Display</button>
	   		<h1>Displayed!</h1>
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
			display: true
		}
	}
	toggleDisplay = () => {
		this.setState({
			display: !this.state.display
		});
	}
  render() {
  	// change code below this line
  	if (this.state.display) {
	    return (
		   	<div>
		   		<button onClick={this.toggleDisplay}>Toggle Display</button>
		   		<h1>Displayed!</h1>
		   	</div>
	    );
	  } else {
	  	return (
	  		<div>
		   		<button onClick={this.toggleDisplay}>Toggle Display</button>
		   	</div>
	  	);
	  }
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent exists and is rendered.';
	const error_2 = 'When display is set to true, a div, button, and h1 are rendered.';
	const error_3 = 'When display is set to false, only a div and button are rendered.';
	const error_4 = 'The render method uses and if/else statement to check the condition of this.state.display.';

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

	// test 2:
	try {
		mockedComponent.setState({display: true});
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('div').children().length === 2 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('h1').length === 1,
			error_2
		);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		mockedComponent.setState({display: false});
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('div').children().length === 1 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('h1').length === 0,
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(
			code.includes('if') === true &&
			code.includes('else') === true,
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