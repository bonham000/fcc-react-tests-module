/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Bind 'this' to a Class Method`

export const challengeText = `<span class = 'default'>Intro: </span>Now you've learned how to set the state of a
component, let's learn a little more about defining methods on your component class. A class method typically needs
to be <code>this</code> aware so that it can access properties on the class, such as <code>state</code> and
<code>props</code>. There are a few ways to allow your class methods to access <code>this</code>.<br><br>

One common way is to explicitly bind <code>this</code> in the constructor so <code>this</code> becomes bound
to the class methods when the component is initialized. In the last lesson we accomplished this by writing
<code>this.click = this.click.bind(this)</code> in the constructor. Then, when you call a function like
<code>this.setState()</code> within your class method, <code>this</code> will not be <code>undefined</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided a similar example
for you here. In this example, we have a component with a state that can keep track of an item count and a method
which allows you to increment this item count. However, right now the method is not <code>this</code> aware. Fix this
by explicitly binding <code>this</code> to the <code>addItem</code> method in the component's constructor.<br><br>

You will also see that our button has no click handler anymore. We need to add a click handler which triggers our
<code>addItem</code> method when the button receives a click event. Let's add this click handler as well,
remembering that the method we pass to the <code>onClick</code> handler should be enclosed with curly braces
because we want it to be interpreted directly as JavaScript.<br><br>

Go ahead and try it out! Once you complete the above steps you should be able to click the button and see the item
count increment in the HTML! Pretty cool!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemCount: 0
		};
		// change code below this line

		// change code above this line
	}
	addItem() {
		this.setState({
			itemCount: this.state.itemCount + 1
		});
	}
	render() {
  	return (
	    <div>
        <button>Click Me</button>
        <h1>Current Item Count: {this.state.itemCount}</h1>
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
			itemCount: 0
		};
		this.addItem = this.addItem.bind(this);
	}
	addItem() {
		this.setState({
			itemCount: this.state.itemCount + 1
		});
	}
	render() {
  	return (
	    <div>
        <button onClick = {this.addItem}>Click Me</button>
        <h1>Current Item Count: {this.state.itemCount}</h1>
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'MyComponent returns a div element which wraps 2 elements, a button and h1 element, in that order.'
	const error_2 = 'The state of MyComponent is initialized with the key value pair { itemCount: 0}';
	const error_3 = 'Clicking the button element runs the addItem method and increments the state itemCount by 1.';

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
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		console.log(mockedComponent.find('div').children());
		assert(
			mockedComponent.find('div').length === 1
			&& mockedComponent.find('div').children().nodes[0].tagName === 'BUTTON'
			&& mockedComponent.find('div').children().nodes[1].tagName === 'H1',
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
		assert.strictEqual(mockedComponent.state('itemCount'), 0, error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	//test 3:
	try {
		mockedComponent.setState({itemCount: 0});
		const before = mockedComponent.state('itemCount');
		mockedComponent.find('button').simulate('click');
		const after = mockedComponent.state('itemCount');
		assert.strictEqual(before === 0 && after === 1, true, error_3);
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