/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use && for a More Concise Conditional`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Nice job! Now we will demonstrate a more concise way to achieve the same result. Imagine that we are
tracking several conditions in our component and we want to respond differently to each of these conditions. We don't want to keep writing <code>else if</code> conditions to
just return slightly tweaked UIs. Instead, we can use the <code>&&</code> logical operator to perform conditional logic in a more concise way. This
is possible because we want to check if a condition is <code>true</code>, and if it is return some markup. So if we write:<br><br>

<code>{condition && &lt;p&gt;markup&lt;/p&gt;}</code><br><br>

If the <code>condition</code> is <code>true</code> the markup will be returned, otherwise if it is <code>false</code> the operation will immediately
return <code>false</code> after evaluating the <code>condition</code> and return nothing. We can include these statments directly in our JSX
and even string multiple conditions together by continuing to write <code>&&</code> after each check we make. This allows us to 
handle more complex conditional logic in our <code>render()</code> method.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Solve the previous example again, this time using the <code>&&</code> logical operator.`

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
    return (
	   	<div>
	   		<button onClick={this.toggleDisplay}>Toggle Display</button>
	   		{this.state.display && <h1>Displayed!</h1>}
	   	</div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent exists and is rendered.';
	const error_2 = 'When display is set to true, a div, button, and h1 are rendered.';
	const error_3 = 'When display is set to false, only a div and button are rendered.';
	const error_4 = 'The render method uses the && logical operator to check the condition of this.state.display.';

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
		assert.strictEqual(code.includes('&&'), true, error_4);
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