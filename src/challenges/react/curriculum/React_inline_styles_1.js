/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Add Inline Styles in React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span><br>
Knowing what we know so far, one thing you might be wondering is: how do we style JSX elements in React? We already know it can't be
exactly the same as working with HTML because of the way we apply classes to JSX elements. But how else might it be different?<br><br>

Well, if you are importing styles from a stylesheet, it doesn't have to be much different at all. Simply apply a class to your JSX elememt
using the <code>className</code> attribute, and apply styles accordingly in your stylesheet. Applying <strong><em>inline</em></strong> styles, however, is very common
in ReactJS development, and is a bit differnt that what we are used to.<br><br>

The way that we apply inline styles to JSX elements is similar to how we would would apply inline styles in HTML, but like with many cases in JSX, 
there are a few key differences. We will still be using the <code>style</code> attribute, but the value that we set that attribute to is where you will notice
the greatest difference. A simple example of an inline style in HTML might look something like this:<br><br>

<code>&lt;div style="color: yellow; font-size: 16px"&gt;Mellow Yellow&lt;/div&gt;</code><br><br>

However, because of the way JSX is transpiled, we cannot simply set the value of the attribute style to a <code>string</code>. Instead, we must 
set the style attribute's value equal to a javascript <code>object</code>, like so: <code>{color: "red", fontSize: 36}</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Uncomment the JSX code below to see what happens!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class Colorful extends React.Component {
  render() {
    return (
	    <div {/*style={{color: "red", fontSize: 72}} */}>Big Red</div>
    );
  }
};
`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class Colorful extends React.Component {
  render() {
    return (
	    <div style={{color: "red", fontSize: 72}}>Big Red</div>
    );
  }
};
`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_1 = 'The component renders a <div> elememt.';
	const error_2 = 'The <div> elememt has a color of red.';
	const error_3 = 'The <div> elememt has a font size of 72px.';

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
	];

	let es5, mockedComponent, testRender, passed = true;
	const exportScript = '\n export default Colorful;'
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

	// test 1:
	try {
		assert.strictEqual(testRender.type(), 'div', error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(testRender.nodes[0].props.style.color, "red", error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;		
	}

	// test 2:
	try {
		assert.strictEqual(testRender.nodes[0].props.style.fontSize, 72, error_3);
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
		const exportScript = '\n export default Colorful;'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}