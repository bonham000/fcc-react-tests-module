/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass an Array as Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
So far in this section, we've seen that we can pass information down to children through their parent components as props. In the past 2 challenges 
we've passed strings as props &mdash; but what about other data types? In this challenge, we'll explore passing arrays as props.

The concept of passing props here is really only slightly different than in our last challenge. The main difference is that since the data we are passing is not just simple text (as you 
would expect to see assigned to an HTML-like attribute), we must pass our data in as JavaScript. And, of course, since we are composing this code within a JSX element, it must be wrapped 
by curly braces.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Take a look at the different props we are passing to the <code>Selections</code> component. We have <code>attire</code>, <code>shirts</code>, <code>pants</code>, and <code>shoes</code>. Since you are probably just sitting at 
home coding right now, let's go with a super-casual outfit. Within the <code>Selections</code> component, use bracket notation to access the arrays we are passing as props so 
that the first instance of the <code>Selections</code> component renders the text: "A super-casual day. I'm going to wear a sweatshirt, pajama pants, and slippers.".<br><br>

Tomorrow you have work, BUT, you work as a programmer at a super hip start up, so dressing casual is totally cool. In the space indicated in the <code>OutfitSelector</code> component, render a 
second instance of the <code>Selections</code> component. Pass the same arrays as props, but this time, reorder the elements a bit so that the rendered text reads:
"A casual day. I'm going to wear a t-shirt, blue jeans, and sneakers."`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`class Selections extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
            A { /* change code here */ } day. 
            I'm going to wear a { /* change code here */ }, { /* change code here */ }, and { /* change code here */ }.
        </div>
    );
  }
};

class OutfitSelector extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        	<h1>What to wear?!</h1>
        	<h3>Today is:</h3>
        	<Selections 
            attire={['casual', 'formal', 'super-casual']}
            shirts={['t-shirt', 'sweatshirt', 'collared shirt']}
            pants={['slacks', 'blue jeans', 'khakis', 'shorts', 'pajama pants']}
            shoes={['dress shoes', 'slippers', 'sneakers']}
            />
        	<h3>Tomorrow is:</h3>
        	{ /* change code below this line */ }
          
        	{ /* change code above this line */ }
        </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`class Selections extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
            A {this.props.attire[2]} day. 
            I'm going to wear a {this.props.shirts[1]}, {this.props.pants[4]}, and {this.props.shoes[1]}.
        </div>
    );
  }
};

class OutfitSelector extends React.Component {
  constructor(props) {
  	super(props);

  }
  render() {
    return (
        <div>
        	<h1>What to wear?!</h1>
        	<h3>Today is:</h3>
        	{ /* change code below this line */ }
        	<Selections 
            attire={['casual', 'formal', 'super-casual']}
            shirts={['t-shirt', 'sweatshirt', 'collared shirt']}
            pants={['slacks', 'blue jeans', 'khakis', 'shorts', 'pajama pants']}
            shoes={['dress shoes', 'slippers', 'sneakers']}
            />
        	{ /* change code above this line */ }
        	<h3>Tomorrow is:</h3>
        	{ /* change code below this line */ }
          <Selections 
            attire={['formal', 'super-casual', 'casual']}
            shirts={['collared shirt', 't-shirt', 'sweatshirt']}
            pants={['slacks', 'khakis', 'shorts', 'pajama pants', 'blue jeans']}
            shoes={['dress shoes', 'sneakers', 'slippers']}
            />
        	{ /* change code above this line */ }
        </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The OutfitSelector component should return a single outer <div>.';
	const error_2 = 'The OutfitSelector component\'s third child should be an instance of the Selections component.';
	const error_3 = 'The OutfitSelector component\'s fifth child should be an instance of the Selections component.';
	const error_4 = 'Both instances of the Selections component should have props called attire, shirts, pants, and shoes, and the value of each of these props should be an array.';
	const error_5 = 'The first instance of the Selections component should return the text "A super-casual day. I\'m going to wear a sweatshirt, pajama pants, and slippers."';
	const error_6 = 'The second instance of the Selections component should return the text "A casual day. I\'m going to wear a t-shirt, blue jeans, and sneakers."';

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
		}
	];

	let es5, mockedComponent, mockRender, propsObj, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default OutfitSelector'
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
		mockedComponent = shallow(React.createElement(eval(es5)));
		mockRender = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.type(), 'div', error_1)
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.nodes[0].props.children[2].type.name, 'Selections', error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(mockedComponent.nodes[0].props.children[4].type.name, 'Selections', error_2)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {
		assert(Array.isArray(mockedComponent.props().children[2].props.attire) === true &&
			Array.isArray(mockedComponent.props().children[2].props.pants) === true &&
			Array.isArray(mockedComponent.props().children[2].props.shirts) === true &&
			Array.isArray(mockedComponent.props().children[2].props.shoes) === true &&
			Array.isArray(mockedComponent.props().children[4].props.attire) === true &&
			Array.isArray(mockedComponent.props().children[4].props.pants) === true &&
			Array.isArray(mockedComponent.props().children[4].props.shirts) === true &&
			Array.isArray(mockedComponent.props().children[4].props.shoes) === true, error_4)
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {
		assert.strictEqual(mockRender.find('div').nodes[1].innerText, "A super-casual day. I\'m going to wear a sweatshirt, pajama pants, and slippers.", error_4)
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	// test 6:
	try {
		assert.strictEqual(mockRender.find('div').nodes[2].innerText, "A casual day. I\'m going to wear a t-shirt, blue jeans, and sneakers.", error_4)
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
		const exportScript = '\n export default OutfitSelector'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}