/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Review`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Congratulations! You've finished the lessons on
React and Redux. One more thing before moving on. You typically won't be writing React apps in a code editor like this.
In this lesson we've provided a glimpse of what the syntax looks like if you're working with npm and a file system on your 
own machine. Aside from the use of <code>import</code> statements which we use to pull in all of the dependencies that we've
been providing as global objects here, everything else should look pretty similar. Take a look at the code and see if you
can follow what's going on.<br><br>

Finally, writing React and Redux code tends to require some configuration. This can tend to get complicated quickly. If
you are interested in experimenting on your own machine, we recommend

<a id='CRA' target ='_blank' href='https://github.com/facebookincubator/create-react-app'>Create React App</a>

which comes configured and ready to go out of the box. You can also enable Babel in CodePen, include React and ReactDOM
in the JS script tags, and code there as well. Congratulations on making it this far, you've learned a lot!`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Log the message 
<code>'Now I know React and Redux!'</code> to the console somewhere in the code. Nice work!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode =
`import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);

console.log('Now I know React and Redux!');`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'The message \'Now I know React and Redux!\' is logged to the console.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		}
	];

	let passed = true;
	
	// test 1:
	try {
		assert.strictEqual(code.includes('console.log(\'Now I know React and Redux!\')'), true, error_0);
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => undefined;
