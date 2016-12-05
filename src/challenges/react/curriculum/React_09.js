/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Component with Composition`

export const challengeText = `<span class = 'default'>Intro: </span>Now that you have created a simple React Component let's
learn about another important principle in React: composition. In React, everything is a component and multiple components
can be composed together to create more complex components. Let's see how this works.`

export const challengeInstructions = `
<span class = 'default'>Instructions: </span>In this example we've provided a simple functional component called
<code>ChildComponent</code> and a React component called <code>ParentComponent</code>. Compose the two together by rendering
the <code>ChildComponent</code> within the <code>ParentComponent</code>. You can enclose the <code>ChildComponent</code> in
a single set of HTML opening and closing braces, <code>&lt; &gt;</code>, just as if it was a self-closing HTML element, being sure to close the tag with a forward slash.
`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`const ChildComponent = () => {
	return (
		<div>
			<p>I am the child</p>
		</div>
	);
};

class ParentComponent extends React.Component {
  render() {
    return (
	    <div>
	    <h1>I am the parent</h1>
	    { /* change code below this line */ }
	    
	
	    { /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const ChildComponent = () => {
	return (
		<div>
			<p>I am the child</p>
		</div>
	);
};

class ParentComponent extends React.Component {
  render() {
    return (
	    <div>
	    	<h1>I am the parent</h1>
	    	{ /* change code below this line */ }
	    	<ChildComponent />
	    	{ /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, shallowRender, passed = true;

	const error_1 = 'The React component returns a single <div> element.';
	const error_2 = 'The component returns two nested elements.';
	const error_3 = 'The component returns the ChildComponent as its second child';

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
		}
	];

	const exportScript = '\n export default ParentComponent'
	const modifiedCode = code.concat(exportScript);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// shallow render the component with Enzyme
	try {
		shallowRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(shallowRender.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	//test 2:
	try {
		assert.strictEqual(shallowRender.children().length, 2, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(shallowRender.node.props.children[1].type.name, 'ChildComponent', error_3);
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
		const exportScript = '\n export default ParentComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}