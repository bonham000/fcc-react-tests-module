/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Use Provider to Connect Redux to React`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've created a Redux store to handle our messages array
and created actions for adding new messages we will learn how we can provide React access to the Redux store and the actions it will need
to dispatch updates. Here we will begin to use the <code>react-redux</code> package. React Redux provides a small API with two key features:
<code>Provider</code> and <code>connect</code>. We will learn about the <code>Provider</code> here. The <code>Provider</code> is a wrapper
component from React Redux which we will wrap our React app with. This wrapper then allows us to access the Redux <code>store</code> and
<code>dispatch</code> functions throughout our component tree. <code>Provider</code> takes two props, the Redux store and the child components
of your app. Defining the <code>Provider</code> for an App component might look like this:<br>

<pre>
<code class="codeBlock">&lt;Provider store={store}&gt;
 &lt;App/&gt;
&lt;Provider/&gt;</code>
</pre>`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>There's a lot of code in the editor now but don't worry
you've written it all already! We've included our Redux store, actions, and our <code>DisplayMessages</code> component from earlier. The only thing new
is the <code>AppWrapper</code> component at the bottom. We will use this top level component to render the <code>Provider</code>
from <code>ReactRedux</code>. Do this, passing the Redux store as a prop, and then render the <code>DisplayMessages</code> component as a child. Once you are
finished you should see your React component rendered to the page. Nice!<br><br>

Note: Because we are providing React Redux as a global variable here, we can access the Provider with dot notation. We do this and set it to
a constant <code>Provider</code> for you to use.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
	return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return state.concat(action.message);
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
		const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
    		<button onClick={this.submitMessage}>Submit</button>
    		<ul>
		    	{this.state.messages.map( (message, idx) => {
		    			return (
		    			 	<li key={idx}>{message}</li>
		    			)
		    		})
	    		}
	    	</ul>
    	</div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
	// render the Provider here

	// change code above this line
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
	return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return state.concat(action.message);
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
		const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
    		<button onClick={this.submitMessage}>Submit</button>
    		<ul>
		    	{this.state.messages.map( (message, idx) => {
		    			return (
		    			 	<li key={idx}>{message}</li>
		    			)
		    		})
	    		}
	    	</ul>
    	</div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
	// change code below this line
	render() {
		return (
			<Provider store = {store}>
				<DisplayMessages/>
			</Provider>
		);
	}
	// change code above this line
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The AppWrapper is rendered.';
	const error_2 = 'The Provider wrapper component is passed a prop of store equal to the Redux store.';
	const error_3 = 'DisplayMessages is rendered as a child of AppWrapper.';
	const error_4 = 'The DisplayMessages component renders an h2, input, button, and ul element.';

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
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	
	const exportScript = '\n export default AppWrapper'
	const modifiedCode = code.concat(exportScript);

	console.log(modifiedCode);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
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

	console.log(mockedComponent);

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('AppWrapper').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		const noWhiteSpace = code.replace(/\s/g,'');
		assert.strictEqual(noWhiteSpace.includes('<Providerstore={store}>'), true, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	// test 3:
	try {

		let parent = mockedComponent.find('DisplayMessages').root.node._reactInternalInstance._currentElement.type.name;
		assert(
			mockedComponent.find('DisplayMessages').length === 1 &&
			parent === 'AppWrapper',
			error_3
		);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {

		assert(
			mockedComponent.find('div').length === 1 &&
			mockedComponent.find('h2').length === 1 &&
			mockedComponent.find('button').length === 1 &&
			mockedComponent.find('ul').length === 1,
			error_4
		);

		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;		
	}	

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default AppWrapper'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}