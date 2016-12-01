/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount} from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Composition with React Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>You've now seen how composition works with
React and JSX elements. Now let's compose some React components together. It is just as easy as composing JSX elements.
To compose a React component as a child you simply declare it within the component you want to serve as the parent.<br><br>

Note: Our parent wrapper component begins with <code>export default</code>. This is required for how we are extracting the
component from the code editor, however it is just normal ES6 module syntax. If you add additional React components that you
are going to use within the same file, this is not necessary, as you can see in the class declaration of
<code>ChildComponent</code> here.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've provided child and parent components
like before. Compose the child component within the parent.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class ChildComponent extends React.Component {
	render() {
		return (
		<div>
			<p>Child</p>
		</div>
		)
	}
}

export default class ParentComponent extends React.Component {
  render() {
    return (
    	<div>
				<h1>Parent</h1>
	    	{ /* change code below this line */ }

	    	{ /* change code above this line */ }
    	</div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class ChildComponent extends React.Component {
	render() {
		return (
		<div>
			<p>Child</p>
		</div>
		)
	}
}

export default class ParentComponent extends React.Component {
  render() {
    return (
	    <div>
				<h1>Parent</h1>
	    	{ /* change code below this line */ }
				<ChildComponent />
	    	{ /* change code above this line */ }
    	</div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The ParentComponent renders a div element.';
	const error_2 = 'The ParentComponent renders the ChildComponent.';
	const error_3 = 'The ChildComponent returns a p element with text \'Child\'.';

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

	let es5, mockedComponent, passed = true;
	
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
		mockedComponent = shallow(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.node.type, 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.nodes[0].props.children[1].type.name, 'ChildComponent', error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		let mountRender = mount(React.createElement(eval(es5)));
		assert.strictEqual(mountRender.find('p').node.innerHTML, 'Child', error_3);
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
		const es5 = transform(code, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}