/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// NOTES: For this one (besides re-doing the intro since we will likely have covered most of this already
// by the time we get to this challenge) - still need a way to make sure they've used the styles const rather than 
// applying same 3 styles in-line.

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Add Inline Styles in React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Do you notice anything else that is different about the
way this is written? Beyond the fact that we are setting the style attribute equal to a JavaScript object, there are some other
important differences that we must note. The first thing to note is that we are creating the style <code>object</code> within a 
set of curly braces, <code>{ }</code> — it really is just a JavaScript object. The other important piece of information here
is the syntax of the style properties. For example, you might have noticed that to control the size of the font we used
<code>fontSize</code> rather than <code>font-size</code>. Because the style object is just a JavaScript <code>object</code>,
and <code>font-size</code> is invalid syntax for an object property, we write it as <code>fontSize</code>. As a rule any
hyphenated style properties become camel-cased when written inline in JSX.<br><br>

Finally, all property value units (for things like <code>height</code>, <code>width</code>, and <code>fontSize</code>) are assumed to 
be in <code>px</code> unless otherwise specified (you might have noticed we did not include a unit designation). If you want to use
<code>em</code> for example, you must specify and wrap the value declaration in quotes. Aside from numbers assumed to be in
<code>px</code> all other property values should also be wrapped in quotes.<br><br>

Before we move on, let's cover an additional way we can apply inline styles in React. And remember, this is just the tip of the iceberg when 
it comes to adding styles in React. These concepts can be expanded upon significantly to bring your components to life in rich and exciting ways!
`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>If we are dealing with a larger set of
styles, our code could get a bit messy if we write it right into the JSX element's tag. So instead, let's assign that style
<code>object</code> to the <code>styles</code> constant that we have provided above the React component. Uncomment the constant
and declare an <code>object</code> which represents 3 style properties and their values. Give the <code>&lt;div/&gt;</code> a color of
<code>"purple"</code>, a font size of <code>40</code> and a border of <code>"2px solid purple"</code>. When you are finished
defining your styles, set the <code>style</code> attribute equal to the <code>styles</code> constant.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
// const styles = 
// change code above this line
class Colorful extends React.Component {
  render() {
  	// change code below this line
    return (
	    <div style={{color: "yellow", fontSize: 24}}>Style Me!</div>
    );
    // change code above this line
  }
};
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
const styles = {
	color: "purple",
	fontSize: 40,
	border: "2px solid purple"
};
// change code above this line
class Colorful extends React.Component {
  render() {
  	// change code below this line
    return (
	    <div style={styles}>Style Me!</div>
	// change code above this line
    );
  }
};
`
// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The const variable styles is an object with 3 properties.';
	const error_2 = 'styles has a color property set to a value of "purple".';
	const error_3 = 'styles has a fontSize property set to a value of 40.';
	const error_4 = 'styles has a border property set to a value of "2px solid purple".';
	const error_5 = 'The component renders a <div> elememt.';
	const error_6 = 'The <div> element has the styles defined by the styles object applied to it.';

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
		}
	];

	let es5, mockedComponent, stylesConst, stylesObj, testRender, passed = true;
	const exportScript = '\n export default Colorful;'
	const modifiedCode =  code.concat(exportScript);
	
	// for analyzing just the styles const
	const prepend = `(function() {`
	const apend = `;\n return styles })()`
	const partialCode = prepend.concat(code).concat(apend);

	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		stylesConst = transform(partialCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		testRender = shallow(React.createElement(eval(es5)));
		stylesConst = eval(stylesConst);
	} catch (err) {
		passed = false;
	}
	
	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	try {
		assert.strictEqual(Object.keys(stylesConst).length, 3, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	try {
		assert.strictEqual(stylesConst.color, 'purple', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	try {
		assert.strictEqual(stylesConst.fontSize, 40, error_3);
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	try {
		assert.strictEqual(stylesConst.border, "2px solid purple", error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	try {
		assert.strictEqual(testRender.type(), 'div', error_5);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	try {
		assert(testRender.nodes[0].props.style.color === "purple" && 
			testRender.nodes[0].props.style.fontSize === 40 && 
			testRender.nodes[0].props.style.border === "2px solid purple", error_6);
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
		const exportScript = '\n export default Colorful;'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
