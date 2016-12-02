/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { render/**/, shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use React to Render Nested Components`

export const challengeText = `<span class = 'default'>Intro: </span>Now we've seen how to compose two components together let's look
at composition a little further. You can compose components in many different ways with React. Component composition is one of React's
powerful features.<br><br>

The process of breaking a UI down into components separates code and logic and makes writing and maintaining a project much easier. It is
important to begin to see a UI in terms of components like this when working with React. Now let's practice with a little more complex
composition.`

export const challengeInstructions = `
<span class = 'default'>Instructions: </span>Here we've defined two functional components for you, <code>Fruit</code> and <code>Food</code>.
Take the <code>Fruit</code> component and compose it within the <code>Food</code> component, then take this <code>Food</code> component and
compose it within the <code>TypesOfFoodComponent</code> component. The result should be one parent wrapper component with a child that is the
parent of another child component.`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const Fruit = () => {
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

const Food = () => {
	return (
		<div>
			<h1>Types of Food:</h1>
			{ /* change code below this line */ }

			{ /* change code above this line */ }
		</div>
	);
};

class TypesOfFoodComponent extends React.Component {
  render() {
    return (
	    <div>
		    { /* change code below this line */ }
		
		    { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const Fruit = () => {
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

const Food = () => {
	return (
		<div>
			<h1>Types of Food:</h1>
			{ /* change code below this line */ }
			<Fruit />
			{ /* change code above this line */ }
		</div>
	);
};

class TypesOfFoodComponent extends React.Component {
  render() {
    return (
	    <div>
	    { /* change code below this line */ }
			<Food />
	    { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, mockRender, shallowRender, passed = true;

	const error_1 = 'The React component returns a single <div> element.';
	const error_2 = 'TypesOfFoodComponent returns the Food Component.';
	const error_3 = 'The Food Component returns the Fruit Component.';
	const error_4 = 'The Fruit component returns the h2 and ul elements.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
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

	const exportScript = '\n export default TypesOfFoodComponent'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[0].status = false;
	}
	
	// shallow render the component with Enzyme
	try {
		mockRender = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// test 1:
	try {
		shallowRender = shallow(React.createElement(eval(es5)));
		assert.strictEqual(shallowRender.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	//test 2:
	try {
		assert.strictEqual(shallowRender.nodes[0].props.children.type.name, 'Food', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(mockRender.find('h1').node.innerHTML, 'Types of Food:', error_3);
		testResults[3].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		assert.strictEqual(mockRender.find('ul').node.innerText, 'ApplesBlueberriesStrawberriesBananas', error_4);
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
		const exportScript = '\n export default TypesOfFoodComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}