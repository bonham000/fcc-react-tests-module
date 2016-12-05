/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>_ADD_YOUR_TITLE_HERE_`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Challenge Text`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>_ADD_YOUR_INSTRUCTIONS_HERE_`

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
            attire={['casusal', 'formal', 'super-casusal']}
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
            attire={['casusal', 'formal', 'super-casusal']}
            shirts={['t-shirt', 'sweatshirt', 'collared shirt']}
            pants={['slacks', 'blue jeans', 'khakis', 'shorts', 'pajama pants']}
            shoes={['dress shoes', 'slippers', 'sneakers']}
            />
        	{ /* change code above this line */ }
        	<h3>Tomorrow is:</h3>
        	{ /* change code below this line */ }
          <Selections 
            attire={['formal', 'super-casusal', 'casusal']}
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
	const error_5 = 'The first instance of the Selections component should return the text "A super-casusal day. I\'m going to wear a sweatshirt, pajama pants, and slippers."';
	const error_6 = 'The second instance of the Selections component should return the text "A casusal day. I\'m going to wear a t-shirt, blue jeans, and sneakers."';

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

	console.log(mockedComponent.props().children);

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
		assert(typeof mockedComponent.props().children[2].props.attire === 'object' &&
			typeof mockedComponent.props().children[2].props.pants === 'object' &&
			typeof mockedComponent.props().children[2].props.shirts === 'object' &&
			typeof mockedComponent.props().children[2].props.shoes === 'object' &&
			typeof mockedComponent.props().children[4].props.attire === 'object' &&
			typeof mockedComponent.props().children[4].props.pants === 'object' &&
			typeof mockedComponent.props().children[4].props.shirts === 'object' &&
			typeof mockedComponent.props().children[4].props.shoes === 'object', error_4)
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}

	// test 5:
	try {
		assert.strictEqual(mockRender.find('div').nodes[1].innerText, "A super-casusal day. I\'m going to wear a sweatshirt, pajama pants, and slippers.", error_4)
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	// test 6:
	try {
		assert.strictEqual(mockRender.find('div').nodes[2].innerText, "A casusal day. I\'m going to wear a t-shirt, blue jeans, and sneakers.", error_4)
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