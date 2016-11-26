import React from 'react'
import expect from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import CodeMirror from 'react-codemirror'
import { transform } from 'babel-standalone'

import 'codemirror/mode/javascript/javascript';

export default class TestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.seedCode,
			testResults: [],
			solution: false,
			option: 'Load Solution'
		}
		this.updateCode = this.updateCode.bind(this);
		this.testCode = this.testCode.bind(this);
		this.toggleCode = this.toggleCode.bind(this);
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

	}
	toggleCode() {
		if (this.state.solution) {
			this.setState({
				code: this.props.seedCode,
				solution: false,
				option: 'Load Solution'
			});			
		} else {
			this.setState({
				code: this.props.solutionCode,
				solution: true,
				option: 'Reload Seed'
			});
		}
	}
	componentDidMount() { this.testCode() }
	render() {
    const options = {
      lineNumbers: true,
      theme: 'monokai',
      fontSize: '30px'
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

    		<div className = 'instructionsContainer'>
					<h1 className = 'title' dangerouslySetInnerHTML = {renderTitle()} />
					<p className = 'instructions' dangerouslySetInnerHTML = {renderInstructions()} />
    		</div>

	    	<CodeMirror
	    		className = 'editor'
	    		value = {this.state.code}
	    		onChange = {this.updateCode}
	    		options = {options} />
	    	
	    	<div className = 'testControls'>
	    		<button onClick = {this.testCode}>Test Code</button>
	    		<button onClick = {this.toggleCode}>{this.state.option}</button>
	    		{ this.state.passed ?
	    			<p className = 'msg success'>All tests passed!</p> :
	    			<p className = 'msg error'>Your code does not pass the tests, {passingTests} out of {totalTests} tests are passing</p> }
		    </div>

		    <hr />

		    <div className = 'testResults'>
		    	<h1 className = 'default resultsTitle'>Test Results:</h1>
		    	
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

    	</div>
    );
	}
};