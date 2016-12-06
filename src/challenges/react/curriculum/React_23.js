/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render State in the UI Another Way`

export const challengeText = `<span class = 'default'>Intro: </span>Now we will see one more way to access <code>state</code>
before moving on. In the <code>render()</code> method, before the <code>return</code> you can write JavaScript directly. For
example you could declare functions, access data from <code>state</code> or <code>props</code>, perform computations on this
data and so on. Then, you can assign any data to variables that you will then have access to in the <code>return</code>. As a
simple example of this powerful feature, lets see a different way to access <code>state</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>This component is just like the one before.
Now, let's define a <code>const</code> in the <code>render</code> method called <code>name</code> and set it equal to the name value in the
component's <code>state</code>. Because we are just writing JavaScript now, you don't have to enclose this reference in curly braces.
Next, to render this value, you can just reference it directly in the <code>return</code>, but of course now that we are back in 
JSX you will have to enclose it in curly braces.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Free Code Camp'
		}
	}
	render() {
		// change code below this line
				
	  // change code above this line
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
`class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Free Code Camp'
		}
	}
  render() {
  	// change code below this line
		const name = this.state.name;
	  // change code above this line
    return (
	    <div>
	    	{ /* change code below this line */ }
				<h1>{name}</h1>
	    	{ /* change code above this line */ }
	    </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The component has a key "name" with value "Free Code Camp" stored in its state';
	const error_2 = 'The component renders an h1 tag';
	const error_3 = 'The rendered h1 tag includes a reference to {name}';
	const error_4 = 'The rendered h1 tag contains text rendered from the component\'s state';

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
	
	// try to shallow render the component with Enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(mockedComponent.state('name'), 'Free Code Camp', error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.children().type(), 'h1', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(modifiedCode.includes('<h1>{name}</h1>'), true, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}	

	// test 4:
	try {
		mockedComponent.setState({name: 'TestName'});
		assert.strictEqual(mockedComponent.contains(<h1>TestName</h1>), true, error_4);
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
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}