/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Give Sibling Elements a Unique Key Attribute`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
The last challenge showed how the <code>map</code> method is used to dynamically render a number of elements based on user input. However, there was an important piece missing from that example. When you create an array of elements, each one needs a <code>key</code> attribute set to a unique value. React uses these keys to keep track of which items are added, changed, or removed. This helps make the re-rendering process more efficient. Note that keys only need to be unique between sibling elements, they don't need to be globally unique in your application.
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
The code editor has the same <code>MyToDoList</code> component as the last challenge. Finish writing the <code>map</code> callback to return an <code>li</code> element for each <code>item</code> in the array. This time, make sure to give each <code>li</code> a <code>key</code> attribute, set to a unique value. You can use the array index for this purpose.
`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const textAreaStyles = {
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
      // change code below this line

      // change code above this line
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

	const error_0 = 'Your JSX code should transpile successfully.';
	const error_1 = 'The MyToDoList component should exist and render to the page.';
	const error_2 = 'MyToDoList\'s first child should be a textarea element.';
	const error_3 = 'MyToDoList\'s third child should be a button element.';
	const error_4 = 'MyToDoList\'s state should be initialized with toDoList as an empty array.';
	const error_5 = 'MyToDoList\'s state should be initialized with userInput as an empty string.';
	const error_6 = 'When the "Create List" button is clicked, the MyToDoList component should dynamically return an unordered list that contains a list item element for every item of a comma-separated list entered into the textarea element.';
  const error_7 = 'Each list item element should have a key attribute.';

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
    {
			test: 7,
			status: false,
			condition: error_7
		}
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

  // test 7:
	try {
    assert(true, error_7);
		testResults[7].status = true;
	} catch (err) {
		passed = false;
		testResults[7].status = false;
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
