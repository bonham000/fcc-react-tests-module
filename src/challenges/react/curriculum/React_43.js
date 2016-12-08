/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Conditional Rendering with Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>_CHALLENGE_TEXT_`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>_ADD_YOUR_INSTRUCTIONS_HERE_`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class Result extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>
			{
				/* change code here */
			}
			</h1>
		)
	};
};

class GameOfChance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 1
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			// change code here
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Play Again</button>
				{ /* change code below this line /* }

				{ /* change code above this line /* }
				<p>{'Turn: ' + this.state.counter}</p>
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class Result extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>
			{
				this.props.fiftyFifty > .5 ? 
				'You Win!' :
				'You Lose!'
			}
			</h1>
		)
	};
};

class GameOfChance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 1
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			counter: this.state.counter + 1
		});
	}
	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Play Again</button>
				<Result fiftyFifty={Math.random()} />
				<p>{'Turn: ' + this.state.counter}</p>
			</div>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The GameOfChance component exists and is rendered to the page.';
	const error_2 = 'GameOfChance should return a single <button> element.';
	const error_3 = 'GameOfChance should return a single instance of the Result component.';
	const error_4 = 'GameOfChance\'s state is initialized with a property of counter set to a value of 1.'
	const error_5 = 'When the GameOfChance component is first rendered to the DOM, a <p> element should be returned with the inner text of "Turn: 1".'
	const error_6 = 'Each time the buton is clicked, the counter state should be incremented by a value of 1, and a single <p> element should be rendered to the DOM that contains the text "Turn: N", where N is the value of the counter state.'
	const error_7 = 'When the GameOfChance component is first mounted to the DOM and each time the button is clicked thereafter, a single <h1> element should be returned that randomly renders either "You Win!" or "You Lose!".';


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
		},
		{
			test: 7,
			status: false,
			condition: error_7
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	const exportScript = '\n export default GameOfChance'
	const modifiedCode = code.concat(exportScript);

	let initialState, counter_1, counter_2, counter_3, counter_4, counter_5, counter_6, counter_7, counter_8, counter_9, counter_10;
	let p_1, p_2, p_3, p_4, p_5, p_6, p_7, p_8, p_9, p_10;
	
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
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	console.log(mockedComponent.instance());

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('GameOfChance').length, 1, error_1)
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('button').length, 1, error_2)
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {
		assert.strictEqual(mockedComponent.find('Result').length, 1, error_3)
		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	try {
		initialState = mockedComponent.state();
		assert.strictEqual(initialState.counter, 1, error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	try {
		assert.strictEqual(mockedComponent.find('p').nodes[0].innerText, "Turn: 1", error_5);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	try {
		mockedComponent.find('button').simulate('click');
		counter_1 = mockedComponent.state().counter;
		p_1 = mockedComponent.find('p').nodes[0].innerText
		mockedComponent.find('button').simulate('click');
		counter_2 = mockedComponent.state().counter;
		p_2 = mockedComponent.find('p').nodes[0].innerText
		mockedComponent.find('button').simulate('click');
		counter_3 = mockedComponent.state().counter;
		p_3 = mockedComponent.find('p').nodes[0].innerText
		mockedComponent.find('button').simulate('click');
		counter_4 = mockedComponent.state().counter;
		p_4 = mockedComponent.find('p').nodes[0].innerText
		mockedComponent.find('button').simulate('click');
		counter_5 = mockedComponent.state().counter;
		p_5 = mockedComponent.find('p').nodes[0].innerText
		assert(
			counter_1 === 2 && p_1 === 'Turn: 2' &&
			counter_2 === 3 && p_2 === 'Turn: 3' &&
			counter_3 === 4 && p_3 === 'Turn: 4' &&
			counter_4 === 5 && p_4 === 'Turn: 5' &&
			counter_5 === 6 && p_5 === 'Turn: 6',
			error_6
		);
		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}

	try {
		assert();
		testResults[7].status = true;
	} catch (err) {
		passed = false;
		testResults[7].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default GameOfChance'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}