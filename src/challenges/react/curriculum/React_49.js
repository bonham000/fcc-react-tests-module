/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { shallow } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Render React on the Server with renderToString`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>So far we have been rendering React components on the client.
Normally, this is what you will always be doing. However, there are some use cases were it makes sense to render a React
component on the server. Since React is just a JavaScript view library and we can run JavaScript on the server with Node,
this shouldn't be too hard to do. React even provides us with a <code>renderToString()</code> method we can use just for this
purpose which we will apply here.<br><br>

There are two key reasons why rendering on the server may be used in a real world app. The first is that without doing this,
our React apps would consist of a relatively empty HTML file and a large bundle of JavaScript when initially load to the browser.
This may not be ideal for search engines that are trying to index the content of our pages so people can find us. So if we
render our initial HTML markup on the server and send this to the client, the initial page load will contain all of our page's
markup which can be crawled by search engines. Additionally, this creates a faster initial page load experience because our
rendered HTML will be smaller than the JavaScript code of our entire app. React will still be able to recognize our app
and will be able to takeover its management after this initial load.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Use the <code>renderToString()</code> method
which is provided on the <code>ReactDOM</code> global object to render <code>&lt;App/&gt;</code> to a string.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = `
class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <div/>
  }
};

// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode = `
class App extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
    return <div/>
  }
};

// change code below this line
ReactDOM.renderToString(<App/>);`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'The App component is rendered to a string using ReactDOM.renderToString';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		}
	];

	let passed = true;

	// test 0:
	try {
		assert.strictEqual(code.replace(/\s/g,'').includes('ReactDOM.renderToString(<App/>)'), true, error_0);
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

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => undefined;