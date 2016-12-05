/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Bind 'this' with an ES6 Arrow Function`

export const challengeText = `<span class = 'default'>Intro: </span>Let's look at one more way that we can bind
<code>this</code> when writing methods in React component classes. A useful, concise way to bind <code>this</code>
is to use an ES6 fat arrow function, which does not assign its own value for <code>this</code> but rather adopts
the value of <code>this</code> from the context surrounding the function when it is written. In other words, an
arrow function binds <code>this</code> automatically from its surrounding context.<br><br>

This means we can simply define a class method as an arrow function and we don't have to worry about explicitly
binding <code>this</code> in the constructor. Nice! However, the arrow function is ES6 syntax so it will need to
be transpiled in order to work correctly in most browsers. Because of this, it's useful to be aware of both options when writing
methods on React classes.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided a React Component
that renders a <code>button</code> which triggers a <code>setMessage</code> function when clicked. Define this
method with a fat arrow function on the MyComponent class. Let's also initialize the state of MyComponent to have
a property <code>message</code> with text 'Hello!'.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		// change code below this line

		// change code above this line
	}
	// change code below this line

	// change code above this line
	render() {
  	return (
	    <div>
        <button onClick = {this.setMessage}>Click Me</button>
        <h1>{this.state.message}</h1>
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
			message: 'Hello!'
		};
	}
	setMessage = () => {
		this.setState({
			message: 'Goodbye!'
		});
	}
	render() {
  	return (
	    <div>
        <button onClick = {this.setMessage}>Click Me</button>
        <h1>{this.state.message}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent returns a div element which wraps 2 elements, a button and h1 element, in that order.'
	const error_2 = 'The state of MyComponent is initialized with a message containing the string \'Hello!\'';
	const error_3 = 'Clicking the button element runs the setMessage method and upates the message property in the state to say \'Goodbye!\'';
	const error_4 = 'The setMessage method is defined with a fat arrow function.'

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
		assert(
			mockedComponent.find('div').length === 1
			&& mockedComponent.find('div').children().nodes[0].tagName === 'BUTTON'
			&& mockedComponent.find('div').children().nodes[1].tagName === 'H1',
			error_1
		);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.state('message'), 'Hello!', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	//test 3:
	try {
		mockedComponent.setState({message: 'InitialState!'});
		const before = mockedComponent.state('message');
		mockedComponent.find('button').simulate('click');
		const after = mockedComponent.state('message');
		assert.strictEqual(before === 'InitialState!' && after === 'Goodbye!', true, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		const noWhiteSpace = modifiedCode.replace(/\s/g,'');
		assert.strictEqual(noWhiteSpace.includes('setMessage=()=>{this.setState({message:\'Goodbye!\'});}'), true, error_4);
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
		console.log('Live rendering failed', err);
	}

}