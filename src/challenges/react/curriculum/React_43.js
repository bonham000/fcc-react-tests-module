/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Return null to Prevent Rendering`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>There are some situations where we may not want to render a child element. In React you can avoid
rendering a component by simply returning <code>null</code> in its <code>render()</code> method. This is useful in situations where you want
to avoid rendering components based on conditional logic.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided the example we've been working with again here. This time, we will render
our <code>h1</code> element in the <code>Child</code> component rather than in one top-level component. We will pass our <code>display</code> condition as <code>props</code>
to this child component. We can check the condition of <code>display</code> in the child component and if it is <code>false</code> we can return <code>null</code>. Try it out!
Now we've accomplished the same behavior in three different ways. This should begin to show you the versatility of using JavaScript to write our UIs. React provides us a lot
of control over what and how we render our views.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Parent extends React.Component {
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
    return (
	   	<div>
	   		<button onClick={this.toggleDisplay}>Toggle Display</button>
	   		<Child display={this.state.display}/>
	   	</div>
    );
  }
};

class Child extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// change code below this line
}`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Parent extends React.Component {
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
    return (
	   	<div>
	   		<button onClick={this.toggleDisplay}>Toggle Display</button>
	   		<Child display={this.state.display}/>
	   	</div>
    );
  }
};

class Child extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// change code below this line
		if (this.props.display) {
			return <h1>Display!</h1>
		} else {
			return null;
		}
	}
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The Parent component exists and is rendered.';
	const error_2 = 'The Child component exists and is rendered.';
	const error_3 = 'When display is set to true, a div, button, and h1 are rendered.';
	const error_4 = 'When display is set to false, only a div and button are rendered.';
	const error_5 = 'The Child component returns null when passed a falsy value for the display prop, otherwise it returns an h1 element.';

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
	const exportScript = '\n export default Parent'
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
		assert.strictEqual(mockedComponent.find('Parent').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Child').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}	

	// test 3:
	try {
		mockedComponent.setState({display: true});
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('h1').length === 1,
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}

	let displayFalse, displayTrue;

	// test 4:
	try {
		mockedComponent.setState({display: false});
		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('h1').length === 0,
			error_4
		);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		mockedComponent.setState({display: true});
		displayTrue = mockedComponent.find('Child').find('h1');
		mockedComponent.setState({display: false});
		displayFalse = mockedComponent.find('Child').find('h1');
		assert(
			code.includes('null') === true &&
			displayTrue.length === 1 &&
			displayFalse.length === 0,
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
		const exportScript = '\n export default Parent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}