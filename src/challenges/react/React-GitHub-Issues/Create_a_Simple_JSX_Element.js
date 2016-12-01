import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a Simple JSX Element`

export const challengeText = `<span class = 'default'>Intro: </span><br>
React is a User Interface (UI) builder library. And every UI element in React can be described as a JSX <code>component</code>. 
JSX is a syntax that lets you define your React UI component using XML.<br><br>
It's similar to HTML that you have already learned, however there are a few key differences, which we will learn about as we progress.
If we want to <code>render</code> a <code>div</code> component in React, we can simply refer to it as
<code>&lt;div&gt;&lt;/div&gt;</code>, and put it inside <code>return</code> statement of a <code>render()</code> function.`

// ---------------------------- challenge instructions ----------------------------
// QA NOTE: THE LANGUAGE BELOW SHOULD PERHAPS BE EVALUATED/REVISITED - WHILE IT MAY BE TECHNICALLY CORRECT, THE USE OF 
// COMPONENT IN THIS CONTEXT MAY BE CONFUSING FOR THOSE COMPLETELY NEW TO REACT ONCE WE START TALKING ABOUT 
// COMPONENTS IN THE MORE COMMON SENSE. MY SUGGESTION WOULD BE TO REPLACE "COMPONENT" W/ "ELEMENT" HERE??
export const challengeInstructions = `<span class = 'default'>instructions: </span>
Render an <code>li</code> component, replacing the <code>div</code> component we are currently rendering, inside <code>render()</code> in the <code>List</code> object. 
Don't forget to close your <code>li</code> tag, like we closed the <code>div</code> tag.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        // change code below this line
        <div>
        </div>
        // change code above this line
        )
    }
};

export default List;`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        // change code below this line
        <li>
        </li>
        // change code above this line
        )
    }
};

export default List;`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The component renders an <li> element.'
		}
	];

	let es5, mockedComponent, testRender, passed = true;
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
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
		testRender = shallow(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:
	
	// test 1
	try {
		assert.strictEqual(testRender.type(), 'li', 'The component renders an <li> element.')
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
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
