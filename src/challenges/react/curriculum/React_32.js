/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass a Callback as Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now we can pass state as props to child
components, but we're not limited to passing just data. We can also pass handler functions
or any method we define on a React component to a child. This is how we can allow child components to
interact with their parent components.<br><br>

We can pass these parameters just like a regular prop. We pass in a method and assign it a name and in the
child component we will have access to that method name under <code>this.props</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we've provided the scaffold
of three components: one parent that will render two children. It's a lot of code but we just have a few lines to add.
Within the <code>MyApp</code> component we will render the <code>GetInput</code> and <code>RenderInput</code> components.<br><br>

In <code>GetInput</code> pass as props the <code>inputValue</code> from state and assign it to a prop called <code>input</code>.
Also pass the input handler <code>handleChange</code>. Assign it to a prop called <code>handleInput</code>.<br><br>

Now, pass the the <code>inputValue</code> from state to the <code>RenderInput</code> component. Once you are finished
you will be able to type in the <code>&lt;input/&gt;</code> element in the <code>GetInput</code> component which calls the handler
in its parent via props. This updates the input in the <code>state</code> of the parent, which is passed as props to both
children. Observe how the data flows between the components and how the single source of truth remains the <code>state</code>
of the parent component. Admittedly, this example is a little contrived, but should serve to illustrate how data and
callbacks can be passed between React components.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		}
	}
	handleChange = (event) => {
		this.setState({
			inputValue: event.target.value
		});
	}
  render() {
    return (
	   	<div>
				{ /* change code below this line */ }



				{ /* change code above this line */ }
	   	</div>
    );
  }
};

class GetInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Get Input:</h3>
				<input
					value={this.props.input}
					onChange={this.props.handleInput}/>
			</div>
		);
	}	
};

class RenderInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Input Render:</h3>
				<p>{this.props.input}</p>
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
			inputValue: ''
		}
	}
	handleChange = (event) => {
		this.setState({
			inputValue: event.target.value
		});
	}
  render() {
    return (
	   	<div>
	   		<GetInput
	   			input={this.state.inputValue}
	   			handleInput={this.handleChange}/>
	   		<RenderInput
	   			input={this.state.inputValue}/>
	   	</div>
    );
  }
};

class GetInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Get Input:</h3>
				<input
					value={this.props.input}
					onChange={this.props.handleInput}/>
			</div>
		);
	}	
};

class RenderInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Input Render:</h3>
				<p>{this.props.input}</p>
			</div>
		);
	}	
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The MyApp component is rendered.';
	const error_2 = 'The GetInput component is rendered.';
	const error_3 = 'The RenderInput component is rendered.';
	const error_4 = 'The GetInput component receives the MyApp state property input as props.';
	const error_5 = 'The RenderInput component receives the MyApp state property input as props and contains an input element which modifies MyApp state.';

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
	const exportScript = '\n export default MyApp'
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
		assert.strictEqual(mockedComponent.find('MyApp').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('GetInput').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(mockedComponent.find('RenderInput').length, 1, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}	

	// test 4:
	try {

		mockedComponent.setState({inputValue: ''});
		const before = mockedComponent.state('inputValue');
		mockedComponent.find('input').simulate('change', {target: {value: 'TestInput'}});
		const after = mockedComponent.state('inputValue');
		assert.strictEqual(before === '' && after === 'TestInput', true, error_4);

		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {
		mockedComponent.setState({ inputValue: 'TestName' });
		assert.strictEqual(mockedComponent.find('p').node.innerText.includes('TestName'), true, error_5);
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
		const exportScript = '\n export default MyApp'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}