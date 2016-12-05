/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use State to Toggle an Element`

export const challengeText = `<span class = 'default'>Intro: </span>Lets look at a more complex usage of state.
We can use state to monitor the status of some value and render our UI conditionally based on this value.
There are many different ways to accomplish this, here we will look at a simple example.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined MyComponent again
and this time we have a <code>visibility</code> property which is initialized to be <code>false</code>. Take a look
at the render method. Here we are returning one thing if the value of <code>visibility</code> is true and something
else if it is not. It's just a normal JavaScript <code>if/else</code> statement. Applying JavaScript in this way
is one of the most useful features of React. This gives us a lot of control over how we render our UI based on the
current state in our application. We'll see more examples of this as we move forward.<br><br>

At the moment, however, we have no way of updating the <code>visibility</code> property in the component's state. We want
to be able to toggle this value back and forth. We have defined a click handler on our button which should trigger a class
method called <code>toggleVisibility</code> but we haven't defined this method yet. Define this method in a way that will
toggle the state of <code>visibility</code> when the method is called. If <code>visibility</code> is <code>false</code>
it will be set to <code>true</code>, and vice versa. There are a few ways this method can be written, see what you can
come up with!<br><br>

Once you have a method you think works, click the button and see what happens!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: false
		};
	}
	// change code below this line

	// change code above this line
	render() {
		if (this.state.visibility) {		
	  	return (
		    <div>
	        <button onClick = {this.toggleVisibility}>Click Me</button>
	        <h1>Now you see me!</h1>
		    </div>
	    );
  	} else {
  		return (
		    <div>
	        <button onClick = {this.toggleVisibility}>Click Me</button>
		    </div>
	    );	
  	}
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: false
		};
	}
	toggleVisibility = () => {
		this.setState({
			visibility: !this.state.visibility
		});
	}
	render() {
		if (this.state.visibility) {		
	  	return (
		    <div>
	        <button onClick = {this.toggleVisibility}>Click Me</button>
	        <h1>Now you see me!</h1>
		    </div>
	    );
  	} else {
  		return (
		    <div>
	        <button onClick = {this.toggleVisibility}>Click Me</button>
		    </div>
	    );	
  	}
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent returns a div element which contains a button.'
	const error_2 = 'The state of MyComponent is initialized with a visibility property set to false.';
	const error_3 = 'Clicking the button element toggles the visibility property in state between true and false.';

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

	let es5, shallowRender, mockedComponent, passed = true;

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
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('div').find('button').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.state('visibility'), false, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	//test 3:
	try {
		mockedComponent.setState({visibility: false});
		const before = mockedComponent.state('visibility');
		mockedComponent.find('button').simulate('click');
		const after = mockedComponent.state('visibility');
		mockedComponent.find('button').simulate('click');
		const retest = mockedComponent.state('visibility');
		assert.strictEqual(before === false && after === true && retest === false, true, error_3);
		testResults[3].status = true;
	} catch (err) {
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
		console.log('Live rendering failed', err);
	}

}