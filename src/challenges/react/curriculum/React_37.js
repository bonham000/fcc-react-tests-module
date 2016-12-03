/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Optimization with shouldComponentUpdate`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>So far, if any of our components recieve new
<code>state</code> or new <code>props</code> our entire component tree will re-render. But React provides a lifecycle
hook which we can call when child components receive new <code>state</code> or <code>props</code> and declare specifically
if they should update or not. It's called <code>shouldComponentUpdate()</code> and we can pass it <code>nextProps</code>
and <code>nextState</code>.<br><br>

This method is a useful way to perform some performance optimizations. For instance, the default behavior is that your
component will re-render when it receives new <code>props</code> even if the <code>props</code> haven't changed.
You can use <code>shouldComponentUpdate()</code> to prevent this by checking explicitly. This method must return a
<code>boolean</code> value which will dictate whether or not the component will update. So if you wrote
<code>return nextProps !== this.props</code> the component would only update when it receives new <code>props</code>
that are not equal the current <code>props</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've modified the previous components slightly
and added the <code>shouldComponentUpdate()</code> method in a component called OnlyEvens. Currently this method returns <code>true</code>
so OnlyEvens will re-render every time it receives new <code>props</code>. Lets modify this method so that OnlyEvens updates only
if the new value of <code>this.props.value</code> is even.

Press the add button and watch the order of events in the console as the other lifecycle hooks are triggered!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class OnlyEvens extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
   	// change code below this line
		return true;
   	// change code above this line
	}
	componentWillReceiveProps(nextProps) {
		console.log('Receiving new props...');
	}
	componentDidUpdate() {
		console.log('Component re-rendered.');
	}
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}
	addValue = () => {
		this.setState({
			value: this.state.value + 1
		});
	}
  render() {
    return (
			<div>
				<button onClick={this.addValue}>Add</button>
				<OnlyEvens value={this.state.value}/>
			</div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class OnlyEvens extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // change code below this line
    return nextProps.value % 2 === 0;
    // change code above this line
	}
	componentWillReceiveProps(nextProps) {
		console.log('Receiving new props...');
	}
	componentDidUpdate() {
		console.log('Component re-rendered.');
	}
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}
	addValue = () => {
		this.setState({
			value: this.state.value + 1
		});
	}
  render() {
    return (
			<div>
				<button onClick={this.addValue}>Add</button>
				<OnlyEvens value={this.state.value}/>
			</div>
    );
  }
};`


// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The Controller components renders the OnlyEvens component as a child';
	const error_2 = 'The method shouldComponentUpdate() is defined on the OnlyEvens component.';
	const error_3 = 'The OnlyEvens component returns an h1 tag which renders the value of this.props.value.';
	const error_4 = 'OnlyEvens only re-renders when it receives props.value is even.';

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
			mockedComponent.find('OnlyEvens').length === 1,
			error_1
		);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// specifically perform a separate export for the child component
	// here to test for lifecycle methods
	let es5Child, lifecycleChild;

	const exportScriptChild = '\n export default OnlyEvens'
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

	// test 2:
	try {
		lifecycleChild = React.createElement(eval(es5Child)).type.prototype.shouldComponentUpdate.toString().replace(/\s/g,'');
		assert.notStrictEqual(lifecycleChild, 'undefined', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {

		mockedComponent.setState({ value: 0 });
		const initial = mockedComponent.find('h1').node.innerText;
		mockedComponent.setState({ value: 6 });
		const after = mockedComponent.find('h1').node.innerText;
		assert.notStrictEqual(initial, after, error_3);

		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}	

	// test 4:
	try {

		mockedComponent.setState({ value: 0 });
		const initial = mockedComponent.find('h1').node.innerText;
		mockedComponent.setState({ value: 1 });
		const odd = mockedComponent.find('h1').node.innerText;
		mockedComponent.setState({ value: 2 });
		const even = mockedComponent.find('h1').node.innerText;

		assert(
			initial === odd &&
			odd !== even,
			error_4
		);

		testResults[4].status = true;
	} catch (err) {
		console.log(err);
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
		const exportScript = '\n export default Controller'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}