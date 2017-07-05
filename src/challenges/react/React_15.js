/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = true;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Pass an Array as Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
The last challenge demonstrated how to pass information from a parent component to a child component as props or properties. This challenge looks at how Arrays can also be passed as props.  While Strings can be passed as props to a JSX element with just regular string quotes.  To pass an Array to a JSX element, it must be treated as Javascript and wrapped in curly braces.<br><br>

<code>&lt;ChildComponent myProp={["green", "blue", "red"]} /&gt;</code><br><br>

You can also pass a variable that has been assigned array data, but the variable also needs to be treated as Javascript and wrapped in curly braces.<br><br>

<code>&lt;ChildComponent myProp={arrayData} /&gt;</code><br><br>`


// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There is a <code>UnorderedList</code> and <code>ToDo</code> component in the code editor. The <code>UnorderedList</code> component takes an array passed to it as <code>list</code> prop.  Then uses the <code>map</code> function to return a <code>ul</code> with an <code>li</code> element for each <code>item</code> in the <code>list</code> array.<br><br>

Pass a <code>list</code> prop to each instance of the <code>UnorderedList</code> component in the <code>ToDo</code> component.   Today's <code>list</code> should be an array of at least 2 items and Tomorrow's <code>list</code> should have at least 3 items.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
const UnorderedList= (props) => { 
  const listItems = props.list.map((item) =>  
    <li>{item}</li>  
  );  
  return (  
    <ul>{listItems}</ul>  
  );
};

class ToDo extends React.Component {
  constructor(props) {
  	super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
				{ /* change code below this line */ }
        <h3>Today</h3>
        <UnorderedList/>
        <h3>Tomorrow </h3>
        <UnorderedList/>
				{ /* change code above this line */ }
      </div>
    );
  }
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`const UnorderedList= (props) => {  
  const listItems = props.list.map((item) =>  
    <li>{item}</li>  
  );  
  return (  
    <ul>{listItems}</ul>  
  );  
};

class ToDo extends React.Component {
  constructor(props) {
  	super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h3>Today</h3>
        <UnorderedList list={['study', 'exercise']} />
        <h3>Tomorrow </h3>
        <UnorderedList
          list={['call Sam', 'grocery shopping', 'order concert tickets']} />
      </div>
    );
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code should transpile successfully.';
	const error_1 = 'The ToDo component should return a single outer div.';
	const error_2 = 'The ToDo component\'s third child should be an instance of the UnorderedList component.';
	const error_3 = 'The ToDo component\'s fifth child should be an instance of the UnorderedList component.';
	const error_4 = 'Both instances of the UnorderedList component should have a property called list and list should be an array.';
	const error_5 = 'The first instance of the UnorderedList component should return an unordered list with 2 or more items.';
	const error_6 = 'The second instance of the UnorderedList component should return an unordered list with 3 or more items';

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
	const exportScript = '\n export default ToDo'
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
		assert.strictEqual(mockedComponent.nodes[0].props.children[2].type.name, 'UnorderedList', error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {
		assert.strictEqual(mockedComponent.nodes[0].props.children[2].type.name, 'UnorderedList', error_3)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		assert(Array.isArray(mockedComponent.props().children[4].props.list) === true, error_4)
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		assert(mockedComponent.props().children[2].props.list.length >= 2, error_5)
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	// test 6:
	try {
		assert(mockedComponent.props().children[4].props.list.length >= 3, error_6)
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
		const exportScript = '\n export default ToDo'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log('Live rendering failed', err);
	}

}
