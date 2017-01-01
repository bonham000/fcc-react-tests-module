/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow, mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render Conditionally from Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>
So far, we've seen how to use <code>if/else</code>, <code>&&,</code> <code>null</code> and the ternary operator to make conditional decisions about what to render and when. However, there's one 
important topic left to discuss that lets us combine any or all of these concepts with another powerful React feature that we have already learned 
quite a bit about: props. Props are another very common way that React developers employ the concept of conditional rendering in their code &mdash; that is, automatically making
decisions about what to render based on the value of a given prop.<br><br>

In this challenge, let's set up our child component to make some decisions based on props. To help us along, we'll also utilize the ternary operator, but you can 
easily see how several of the other concepts we've covered in the last few challenges might be just as useful in this context.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>
Below you'll find two components that we've partially defined for you: a parent called <code>GameOfChance</code>, and a child called <code>Results</code>. The concept of this challenge is to create a 
very simple game. The rules? Press a button, and find out if you win or lose. That's it!<br><br>

So, how do we achieve this? The first thing we need is a simple expression that will randomly return a different value every time it is run. 
Sounds like a job for <code>Math.random()</code>! 
This standard built in method will return a value between <code>0</code> (inclusive) and <code>1</code> (exclusive) each time it is called. So for 50/50 odds, let's let our expression be 
<code>Math.random() > .5</code>. Statistically speaking, this expression will return <code>true</code> 50% of the time, and <code>false</code> the other 50%. On line 30, replace the comment with this expression
to complete the variable declaration.<br><br>

Great! Now we have an expression that we can use to make a randomized decision in our code! But how do we implement this? Well, since we have a <code>Results</code> component, let's display
the game results there. Render the <code>Results</code> component as a child of <code>GameOfChance</code>, passing in <code>expression</code> as a prop called <code>fiftyFifty</code>. Now in the <code>Results</code> component, write a ternary expression in the 
indicated space to render the text <code>"You win!"</code> or <code>"You lose!"</code> based on the <code>fiftyFifty</code> prop that's being passed in from <code>GameOfChance</code>. For good measure, make sure the <code>handleClick()</code> method is 
correctly counting each turn so the user knows how many times they've played! Hint: this also serves to let the user know the component has actually updated in case they win or lose twice in a row.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`class Results extends React.Component {
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
			counter: // change code here
		});
	}
	render() {
		let expression = // change code here
		return (
			<div>
				<button onClick={this.handleClick}>Play Again</button>
				{ /* change code below this line */ }

				{ /* change code above this line */ }
				<p>{'Turn: ' + this.state.counter}</p>
			</div>
		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = 
`class Results extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>
			{
				this.props.fiftyFifty ? 
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
		const expression = Math.random() > .5;
		return (
			<div>
				<button onClick={this.handleClick}>Play Again</button>
				<Results fiftyFifty={expression} />
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
	const error_3 = 'GameOfChance should return a single instance of the Results component, which has a prop called fiftyFifty.';
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

	let initialState, counter_1, counter_2, counter_3, counter_4, counter_5, p_1, p_2, p_3, p_4, p_5, 
		h1_1, h1_2, h1_3, h1_4, h1_5, h1_6, h1_7, h1_8, h1_9, h1_10, 
		h1_1_text, h1_2_text, h1_3_text, h1_4_text, h1_5_text, h1_6_text, h1_7_text, h1_8_text, h1_9_text, h1_10_text; 

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

	//console.log(mockedComponent.find('Results').props());

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
		assert(
			mockedComponent.find('Results').length === 1 &&
			mockedComponent.find('Results').props().hasOwnProperty('fiftyFifty') === true, 
			error_3);
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
		p_5 = mockedComponent.find('p').nodes[0].innerText;
		console.log(counter_1, counter_2, counter_3, counter_4, counter_5, p_1, p_2, p_3, p_4, p_5);
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
		h1_1 = mockedComponent.find('h1').length;
		h1_1_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_2 = mockedComponent.find('h1').length;
		h1_2_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_3 = mockedComponent.find('h1').length;
		h1_3_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_4 = mockedComponent.find('h1').length;
		h1_4_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_5 = mockedComponent.find('h1').length;
		h1_5_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_6 = mockedComponent.find('h1').length;
		h1_6_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_7 = mockedComponent.find('h1').length;
		h1_7_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_8 = mockedComponent.find('h1').length;
		h1_8_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_9 = mockedComponent.find('h1').length;
		h1_9_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		h1_10 = mockedComponent.find('h1').length;
		h1_10_text = mockedComponent.find('h1').nodes[0].innerText;
		mockedComponent.find('button').simulate('click');
		const textStates = [h1_1_text, h1_2_text, h1_3_text, h1_4_text, h1_5_text, h1_6_text, h1_7_text, h1_8_text, h1_9_text, h1_10_text];
		const h1Length = [h1_1, h1_2, h1_3, h1_4, h1_5, h1_6, h1_7, h1_8, h1_9, h1_10];
		const notAllEqual = textStates.filter(h1 => h1 === textStates[0]);
		const allSameLength = h1Length.filter(length => length === 1);
		assert(
			notAllEqual.length !== 10 && 
			allSameLength.length === 10, 
			error_7);
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