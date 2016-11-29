import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Component with State`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>This component has a constructor defined already.
The constructor is where you can define the state for a component. State is basically a way of keeping tracking of any data that
can change over time that a component needs to know about. For example, a simple counter would need to know the 'state' of the current
count. For this challenge, define the state in the constructor to have a name property equal to the string 'Free Code Camp'.
<br><br/>
Then, define an h1 tag in the component's render method which renders out this value from the component's state. Because we are working
with JSX, you can include a reference to the components state directly within the render function by simply enclosing it in curly braces.
For example, {this.state.counter} would render the value of the counter property in a component's state.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
export default class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		// change code below this line



		// change code above this line
	}
	render() {
  	return (
	    // change code below this line
	    <div>



	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
export default class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		// change code below this line

		this.state = {
			name: 'Free Code Camp'
		}

		// change code above this line
	}
  render() {
    return (
	    // change code below this line
	    <div>

				<h1>{this.state.name}</h1>

	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, mountedComponent, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			failure: 'Your JSX code could not be transpiled successfully.',
			success: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			failure: 'The component does not have a key "name" with value "Free Code Camp" stored in its state.',
			success: 'The component has a key "name" with value "Free Code Camp" stored in its state'
		},
		{
			test: 2,
			status: false,
			failure: 'The component does not render an h1 tag',
			success: 'The component does render an h1 tag'
		},
		{
			test: 3,
			status: false,
			failure: 'The rendered h1 tag does not contain text rendered from the component\'s state',
			success: 'The rendered h1 tag contains text rendered from the component\'s state'
		}
	]
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// try to shallow render the component with Enzyme
	try {
		mountedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		expect(mountedComponent.state('name')).toEqual('Free Code Camp');;
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		expect(mountedComponent.children().type()).toEqual('h1')
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		mountedComponent.setState({name: 'TestName'});
		expect(mountedComponent.contains(<h1>TestName</h1>)).toEqual(true);
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
		const es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}