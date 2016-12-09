/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// -------------- define challenge title and challenge instructions --------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Create a React component with extends`

export const challengeText = `<span class = 'default'>Intro: </span>The other way to define a React component is with
the ES6 <code>class</code> syntax. In the following example, <code>Kitten</code> extends <code>React.Component</code>:

<pre><code>
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(&lt;h1&gt;Hi&lt;/h1&gt;);
  }
}
</code></pre>

Creating a React component this way allows us to keep local state and use lifecycle hooks.
Both state and lifecycle hooks are covered in later challenges.

<br><br>

You will see that our component class now has a <code>constructor</code> defined within it that calls <code>super()</code>. The constructor is a
special method used during the initialization of objects created with the <code>class</code> keyword. Calling super then calls the constructor of the parent
class, in this case <code>React.Component</code>. It is best practice to always call a component's constructor with super and pass in <code>props</code> to each so
the component can be initialized properly. For now, just know that it is standard for this code to be included. We will soon see other uses for
the constructor as well as <code>props</code>.`

export const challengeInstructions = `
	<span class = 'default'>Instructions: </span>This React Component has a <code>render</code> method which is returning nothing at the moment.
	Modify it to return a <code>&lt;div&gt;</code> element containing a <code>&lt;h1&gt;</code> element wrapping the text: <code>Hello React!</code>.'
`
// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
	    // change code below this line



	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class MyComponent extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return (
	    // change code below this line
	    <div>
	    	<h1>Hello React!</h1>
	    </div>
	    // change code above this line
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	let es5, mockedComponent, shallowRender, passed = true;

	let testResults = [
		{
			test: 0,
			status: false,
			condition: 'Your JSX code was transpiled successfully.'
		},
		{
			test: 1,
			status: false,
			condition: 'The React component returns a <div> element.'
		},
		{
			test: 2,
			status: false,
			condition: 'There is a <h1> tag rendered within the returned <div>.'
		},
		{
			test: 3,
			status: false,
			condition: 'The <h1> tag includes the string \'Hello React!\''
		}
	];

	const exportScript = '\n export default MyComponent'
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
		shallowRender = shallow(React.createElement(eval(es5)))
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(shallowRender.type(), 'div', 'The React component returns a <div> element.');
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(shallowRender.children().type(), 'h1', 'There is a <h1> tag rendered within the returned <div>.');
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(shallowRender.contains(<h1>Hello React!</h1>), true, 'The <h1> tag includes the string \'Hello React!\'');
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	return {
		passed,
		testResults,
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default MyComponent'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}