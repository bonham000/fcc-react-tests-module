/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render a Class Component to the DOM`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span><br>
One thing you may remenber from a <a href="link to render html Elements tot he dom - challnege 4">previous challenge</a> is
that, while we are writing React code with React, we need a separate API to actually render that code to the DOM &mdash; the ReactDOM API.<br><br>

For the past few challenges, we wanted to focus on introducing components themselves, so we have been rendering them 
for you behind the scenes. However, it is important to know that none of the React code that we write can actually be rendered without 
making a call to the ReactDOM API. 

To refresh, the syntax for rendering React elements to the DOM looks like this: <code>ReactDOM.render(componentToRender, targetNode)</code>, where the
first argument is the React component that we want to render, and the second argument is the DOM node that we would like to render that
component within.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span><br>
React components must be passed in to <code>ReactDOM.render()</code> slightly differently than JSX elements. 
For JSX elements, we simply pass in the name of the elmemt that we want to render, but when we pass React components to <code>ReactDOM.render()</code>,
we must use the same syntax which we would use to render a component within another component. Note that while here we are rendering an ES6 Class Component, 
the syntax for rendering a functional component would be the same.<br><br>

We have already defined a component named <code>Fruit</code> and a component named <code>Vegetables</code>. Render both components as children of the <code>TypesOfFood</code> component
and render <code>TypesOfFood</code> to the <code>div</code> we have provided that has 
an ID of <code>challenge-node</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class TypesOfFood extends React.Component {
  render() {
    return (
	    <div>
			{/* change code below this line */} 
			
			{/* change code above this line */} 
	    </div>
    );
  }
};

// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class TypesOfFood extends React.Component {
  render() {
    return (
	    <div>
	    	{/* change code below this line */} 
	    		<Fruit />
		   		<Vegetables />
		   	{/* change code above this line */} 
	    </div>
    );
  }
};

// change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));`

// ---------------------------- define challenge tests ----------------------------
const prependCode = `
	const Fruit = () => {
		return (
			<div>
				<h2>Fruit:</h2>
				<ul>
					<li>Apples</li>
					<li>Blueberries</li>
					<li>Strawberries</li>
					<li>Bananas</li>
				</ul>
			</div>
		);
	};
	const Vegetables = () => {
		return (
			<div>
				<h2>Vegetables:</h2>
				<ul>
					<li>Brussel Sprouts</li>
					<li>Broccoli</li>
					<li>Squash</li>
				</ul>
			</div>
		);
	};`

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The TypesOfFood component renders a div.';
	const error_2 = 'The div\'s first child is the Fruit component.';
	const error_3 = 'The div\'s second child is the Vegetables component.';
	const error_4 = 'The TypesOfFood componenet is rendered to the DOM within the "challenge-node" div.';

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
	const exportScript = '\n export default TypesOfFood'
	const modifiedCode = prependCode.concat(code).concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
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
		mockedComponent = shallow(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.type(), 'div', error_1)
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert(mockedComponent.nodes[0].props.children[0].type.name || mockedComponent.nodes[0].props.children[1].type.name === 'Fruit', error_2)
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert(mockedComponent.nodes[0].props.children[0].type.name || mockedComponent.nodes[0].props.children[1].type.name === 'Vegetables', error_3)
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(document.getElementById('challenge-node').childNodes[0].innerHTML ===
		'<div><h2>Fruit:</h2><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul></div><div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div>'
		|| '<div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div><div><h2>Fruit:</h2><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul></div>',
		error_4)
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
		const exportScript = '\n export default TypesOfFood'
		const modifiedCode = prependCode.concat(code).concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}