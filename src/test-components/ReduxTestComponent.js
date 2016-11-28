import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import CodeMirror from 'react-codemirror'
import { transform } from 'babel-standalone'

import 'codemirror/mode/jsx/jsx';

export default class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.seedCode,
			testResults: []
		}
		this.updateCode = this.updateCode.bind(this);
		this.testCode = this.testCode.bind(this);
		this.seedCode = this.seedCode.bind(this);
		this.solutionCode = this.solutionCode.bind(this);
	}
  updateCode(newCode) {
    this.setState({
        code: newCode
    });
	}
	testCode() {

		const { code } = this.state;
		const results = this.props.executeTests(code);

		this.setState({
			passed: results.passed,
			testResults: results.testResults
		});

		// run live render function to get console.log messages
		const result = this.props.liveRender(code);

		document.getElementById('consoleOutput').innerHTML = '';

		// display these messages to the UI
		if (result !== undefined) {
			for (let msg of result) {
				document.getElementById('consoleOutput').innerHTML += msg;
				document.getElementById('consoleOutput').innerHTML += '<br>';
			}
		}

	}
	seedCode() {
		this.setState({
			code: this.props.seedCode
		});
	}
	solutionCode() {
		this.setState({
			code: this.props.solutionCode
		});
	}
	componentDidMount() {
		this.testCode();
	}
	render() {
    const options = {
    	mode: 'jsx',
      lineNumbers: true,
      theme: 'monokai',
      fontSize: '30px',
      extraKeys: {
      	'Cmd-Enter': () => { 
	    		this.testCode();
	    		return false;
	    	}
	    } 
    };
    const renderTitle = () => { return { __html: this.props.challengeTitle }}
    const renderInstructions = () => { return { __html: this.props.challengeInstructions }}
    const { testResults } = this.state;
    
    let passingTests, totalTests
    if (testResults.length > 0) {
	    passingTests = testResults.filter( (test) => test.status === true ).length;
	    totalTests = testResults.length;
    }
    
    return (
    	<div>

    		<h1 className = 'title'>Free Code Camp Redux Challenge Demo:</h1>

    		<div className = 'instructionsContainer'>
					<h1 className = 'challengeTitle' dangerouslySetInnerHTML = {renderTitle()} />
					<p className = 'instructions' dangerouslySetInnerHTML = {renderInstructions()} />
    		</div>

    		<h1 className = 'title'>Code:</h1>

	    	<CodeMirror
	    		className = 'editor'
	    		value = {this.state.code}
	    		onChange = {this.updateCode}
	    		options = {options} />

	    	<div className = 'outputContainer'>
		    	<h1 className = 'outputTitle'>Console.log Output:</h1>
		    	<div id = 'consoleOutput'></div>
		    </div>

		    <h1 className = 'title'>Run Tests <span className = 'keyShortcut'>(Cmd-Enter)</span>:</h1>
	    	
	    	<div className = 'testControls'>
	    		<button onClick = {this.testCode} className = 'testBtn'>Test Code</button>
	    		<button onClick = {this.seedCode}>Reload Seed</button>
	    		<button onClick = {this.solutionCode}>Solution Code</button>
		    </div>

		    <div className = 'testResults'>
		    	<h1 className = 'default resultsTitle'>Results:
						{ this.state.passed ?
	    				<span className = 'msg success'>All tests passed!</span> :
	    				<span className = 'msg error'>Your code does not pass the tests, {passingTests} out of {totalTests} tests are passing</span> }
		    	</h1>
		    	
		    	{
		    		testResults.map( (test, idx) => {
			    		if (test.status) {
			    			return (
			    				<p className = 'test testSuccess' key = {idx}>
			    					<i className="fa fa-check" aria-hidden="true"></i>
			    					{test.success}
			    				</p>
			    			)
			    		} else {
				    		return (
				    			<p className = 'test testFailure' key = {idx}>
			    					<i className="fa fa-times" aria-hidden="true"></i>
			    					{test.failure}
			    				</p>
				    		)
				    	}
			    	})
		    	}

		    </div>

		    <hr />

		    <div>
		    	<p className = 'referenceLink'>- This project is using <a target = "_blank" href="http://airbnb.io/enzyme/index.html">Enzyme</a> to test React Components | <a target = "_blank" href="https://github.com/bonham000/fcc-react-tests-module">View the code on GitHub</a></p>
		    </div>

    	</div>
    );
	}
};