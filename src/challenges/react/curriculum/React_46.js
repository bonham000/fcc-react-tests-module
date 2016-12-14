/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Array.map() to Dynamically Render Elements`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
Ok, so conditional rendering is pretty cool, right? But what happens when you need your components to render an unknown number of elements? Oftentimes in 
reactive programming, a programmer has no way to know what the state of an application will be until runtime, because so much depends on a user's interaction with 
that program. In cases like this, programmers need to write their code to correctly handle that unknown state ahead of time, and in React, we can use <code>Array.map()</code> to powerfully illustrate 
this concept.<br><br>

Let's let our example, in this case, be a simple "To Do List" app. As the programmer, we have no way of knowing how many items a user might have on their list. So we need
to set up our component to <em><strong>dynamically render</strong></em> the correct number of list elements long before someone using our program decides that today is laundry day. `

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
We've set up most of the <code>MyToDoList</code> component for you, but you are going to have to fill in some blanks to get this working properly! 
Take a close look at the code to make sure you understand what's going on so far. Some of this code should look familiar if you've already completed
the controlled form challenge in the previous section. You'll notice a <code>&lt;textarea&gt;</code> and a <code>&lt;button&gt;</code>, along with a couple of methods that track their states, but nothing 
being rendered to the page.<br><br>

If you haven't already guessed, this is at least partly because we haven't initialized the component's state yet.
To fix this, inside the <code>constructor</code>, create a <code>this.state</code> object and define the 2 states that we see being used throughout the rest of the component's code: <code>userInput</code> should be initialized as an empty string,
and <code>toDoList</code> should be initialized as an empty array. Now, when the user enters a comma separated list into the <code>&lt;textarea&gt;</code>, a button click and our <code>handleSubmit()</code> method will take that
list, split it at the commas, and store it as an array within <code>MyToDoList</code>'s state object.<br><br>

With that done, we should have some information rendered to the page, right? Well, no. Becuase <code>MyToDoList</code> is still trying to render some JSX that has 
yet to be defined &mdash; <code>items</code>. To complete the challenge, delete the comment on line 28 and map over the <code>toDoList</code> array stored in the component's internal state to dynamically render 
the correct number of <code>&lt;li&gt;</code> items. When you've figured it out, try entering the string <code>Eat, Code, Sleep, Repeat</code> into the <code>&lt;textarea&gt;</code>, then click the button and see what happens!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const textAreaStyles = {
	width: 235,
	margin: 5
};

class MyToDoList extends React.Component {
	constructor(props) {
		super(props);
		// change code below this line


		// change code above this line
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit() {
		const itemsArray = this.state.userInput.split(',');
		this.setState({
			toDoList: itemsArray
		});
	}
	handleChange(e) {
		this.setState({
			userInput: e.target.value
		});
	}
	render() {
		const items = // change code here
		return (
			<div>
				<textarea 
					onChange={this.handleChange}
					value={this.state.userInput}
					style={textAreaStyles} 
					placeholder="Separate Items With Commas" /><br />
				<button onClick={this.handleSubmit}>Create List</button>
				<h1>My "To Do" List:</h1>
				<ul>
					{items}
				</ul>
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const textAreaStyles = {
	width: 235,
	margin: 5
};

class MyToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toDoList: [],
			userInput: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit() {
		const itemsArray = this.state.userInput.split(',');
		this.setState({
			toDoList: itemsArray
		});
	}
	handleChange(e) {
		this.setState({
			userInput: e.target.value
		});
	}
	render() {
		const items = this.state.toDoList.map( (item, i) => {
			return <li key={i}>{item}</li>
		});
		return (
			<div>
				<textarea 
					onChange={this.handleChange}
					value={this.state.userInput}
					style={textAreaStyles} 
					placeholder="Separate Items With Commas" /><br />
				<button onClick={this.handleSubmit}>Create List</button>
				<h1>My "To Do" List:</h1>
				<ul>
					{items}
				</ul>
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The MyToDoList component exists and is rendered to the page.';
	const error_2 = 'MyToDoList\'s first child should be a <textarea> element.';
	const error_3 = 'MyToDoList\'s third child should be a <button> element.';
	const error_4 = 'MyToDoList\'s state is initialized with toDoList as an empty array.';
	const error_5 = 'MyToDoList\'s state is initialized with userInput as an empty string.';
	const error_6 = 'When the "Create List" button is clicked, the MyToDoList component should dynamically return a <ul> that contains an <li> element for every item of a comma separated list entered into the <textarea> element.';

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
		},
		{
			test: 6,
			status: false,
			condition: error_6
		},
	];

	let es5, mockedComponent, shallowRender, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default MyToDoList'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
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
		shallowRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	//console.log(shallowRender.nodes[0].props.children);

	let initialState, state_1, state_2, state_3;

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('MyToDoList').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(shallowRender.nodes[0].props.children[0].type, "textarea", error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(shallowRender.nodes[0].props.children[2].type, "button", error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		initialState = mockedComponent.state();
		assert(Array.isArray(initialState.toDoList) === true && initialState.toDoList.length === 0, error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {
		initialState = mockedComponent.state();
		assert(typeof initialState.userInput === 'string' && initialState.userInput.length === 0, error_5);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;		
	}

	// test 6: 
	try {
		state_1 = mockedComponent.find('ul').find('li');
		mockedComponent.find('textarea').simulate('change', {target: {value: "test, test, test"}});
		mockedComponent.find('button').simulate('click');
		state_2 = mockedComponent.find('ul').find('li');
		mockedComponent.find('textarea').simulate('change', {target: {value: "test, test, test, test, test, test"}});
		mockedComponent.find('button').simulate('click');
		state_3 = mockedComponent.find('ul').find('li');
		assert(state_1.length === 0 && state_2.length === 3 && state_3.length === 6, error_6)
		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default MyToDoList'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}