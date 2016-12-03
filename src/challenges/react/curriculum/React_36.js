/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Managing Updates with Lifecycle Methods`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Another lifecycle method is 
<code>componentWillReceiveProps()</code> which is called whenever a component is receiving new props. This method will receive
the new props as a <code>nextProps</code> argument which you can use and compare with <code>this.props</code>. You can perform
actions before the component updates, for instance you may call <code>setState</code> locally before the update is processed.<br><br>

Another method we will use here is <code>componentDidUpdate()</code>. This method is called immediately after a component re-renders.
Note that rendering and mounting are considered different things in the component lifecycle. When a page first loads all components
will be mounted and this is where methods like <code>componentWillMount()</code> and <code>componentDidMount()</code> will be called.
After this, however, as state changes components will just re-render themselves. We'll discuss this a little more in the next lesson.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've create two components for you. The
child Dialog component is receiving <code>message</code> props from its parent Controller component. Lets write the
<code>componentWillReceiveProps()</code> method in the Dialog component and have it log <code>this.props</code> and
<code>nextProps</code> to the console.<br><br>

Once you have added this method add <code>componentDidUpdate()</code> as well in the Dialog component, and here log a statement
that says that the component has updated. This method works much like <code>componentWillUpdate()</code>, which we've provided
for you. Now click the button to change the message and watch your console. Observe the order the statements are logged out in.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class Dialog extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillUpdate() {
		console.log('Component is about to update...');
	}
	// change code below this line

	// change code above this line
  render() {
    return <h1>{this.props.message}</h1>
  }
};

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'first'
		};
	}
	changeMessage = () => {
		this.setState({
			message: 'second'
		});
	}
  render() {
    return (
			<div>
				<button onClick={this.changeMessage}>Update</button>
				<Dialog message={this.state.message}/>
			</div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class Dialog extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}
	componentWillUpdate() {
		console.log('Component is about to update...');
	}
	componentDidUpdate() {
		console.log('Component re-rendered');
	}
  render() {
    return <h1>{this.props.message}</h1>
  }
};

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'First Message'
		};
	}
	changeMessage = () => {
		this.setState({
			message: 'Second Message'
		});
	}
  render() {
    return (
			<div>
				<button onClick={this.changeMessage}>Update</button>
				<Dialog message={this.state.message}/>
			</div>
    );
  }
};`


// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The Controller components renders the Dialog component as a child';
	const error_2 = 'The h1 rendered by the Dialog component updates when the parent state changes.';
	const error_3 = 'The componentWillReceiveProps method in the Dialog component logs this.props to the console.';
	const error_4 = 'The componentWillReceiveProps method in the Dialog component logs nextProps to the console.';
	const error_5 = 'The Dialog component calls the componentDidUpdate method and logs a message to the console.';

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

	let es5, mockedComponent, lifecycle, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default Controller'
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
			mockedComponent.find('Controller').length === 1 &&
			mockedComponent.find('Dialog').length === 1,
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

		const beforeState = mockedComponent.find('h1').node.innerText;
		mockedComponent.setState({ message: 'TestMessage' });
		const afterState = mockedComponent.find('h1').node.innerText;;

		assert.notStrictEqual(beforeState, afterState, error_2);

		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}	


	// specifically perform a separate export for the child component
	// here to test for lifecycle methods
	let es5Child, lifecycleChild;

	const exportScriptChild = '\n export default Dialog'
	const modifiedCodeChild = code.concat(exportScriptChild);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5Child = transform(modifiedCodeChild, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}

	// test 3:
	try {
		lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentWillReceiveProps.toString().replace(/\s/g,'');
		assert(
			lifecycleChild.includes('console.log') === true &&
			lifecycleChild.includes('this.props') === true,
			error_3
		);
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentWillReceiveProps.toString().replace(/\s/g,'');
		assert(
			lifecycleChild.includes('console.log') === true &&
			lifecycleChild.includes('nextProps') === true,
			error_4
		);
		testResults[4].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {
		lifecycleChild = React.createElement(eval(es5Child)).type.prototype.componentDidUpdate.toString().replace(/\s/g,'');
		assert(
			lifecycleChild.length !== 'undefined' &&
			lifecycleChild.includes('console.log') === true,
			error_5
		);
		testResults[5].status = true;
	} catch (err) {
		console.log(err);
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
		const exportScript = '\n export default Controller'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}