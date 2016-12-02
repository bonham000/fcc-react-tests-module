/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Functional Stateless Components`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>One more thing about props before we move on. Remeber at the
beginning of this section when we defined a functional stateless JSX element? We can do the same thing with React Components. When
defining a child component we can pass props to it and the component itself can simply render these props as UI. The component is stateless
in the sense that it does not possess state itself but receives all of its 'state' information from its parent via props. It is also
functional in the sense that when given props it simply returns a UI and it should return that same UI everytime it receives the same
props.<br><br>

This is a useful feature of React and reiterates one of React's important design principle: React is declarative. React takes data, and
returns a view. It does this in a predicatable way, and functional stateless components are one powerful method to achieves this.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>We've defined a <code>Campsite</code> component
for you which is currently rendering a <code>Camper</code> component as a child, however this <code>Camper</code> component has not
been defined. Define the Camper component and assign it default props of <code>{ name: 'CamperBot' }</code>. You can render whatever
you want within the <code>Camper</code> component, but don't forget to call its <code>constructor</code> and pass in props.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};

class Camper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
     <div>
       <h1>Hi, I am: {this.props.name}</h1>
     </div>
   )
  }
};
// change code below this line
Camper.defaultProps = {
  name: 'CamperBot'
}`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The component CampSite is rendered.';
	const error_2 = 'The component Camper is rendered.';
	const error_3 = 'The Camper component includes default props which assign the string \'Camperbot\' to the key name.';

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
		}
	];

	let es5, mockedComponent, passed = true;

	const exportScript = '\n export default CampSite'
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
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		console.log(err);
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('CampSite').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Camper').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		console.log(err);
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		// propTypes unavailable in production and throw warnings anyway
		// this was the only way I could devise to check that propTypes are included
		const noWhiteSpace = modifiedCode.replace(/\s/g, '');
		const verifyPropTypes = 'Camper.defaultProps={name:\'CamperBot\'}';
		assert.strictEqual(noWhiteSpace.includes(verifyPropTypes), true, error_3);
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
		const exportScript = '\n export default CampSite'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}