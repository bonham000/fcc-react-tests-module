/* eslint-disable */
import React from 'react'
import CodeMirror from 'react-codemirror'

import 'codemirror/mode/jsx/jsx';

export default class ReduxTestComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.seedCode,
			testResults: []
		}
	}
	componentDidMount() {
		this.testCode();
	}
  updateCode = (newCode) => {
    this.setState({
        code: newCode
    });
	}
	testCode = () => {

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
	seedCode = () => {
		this.setState({
			code: this.props.seedCode
		});
		setTimeout(() => {this.testCode()}, 55);
	}
	solutionCode = () => {
		this.setState({
			code: this.props.solutionCode
		});
		setTimeout(() => {this.testCode()}, 50);
	}
	selectChallenge = (event) => {
		setTimeout( () => { this.seedCode(); }, 50);
		setTimeout( () => { this.testCode() }, 50);
		this.props.select(event.target.value);
	}
	nextChallenge = () => {
		setTimeout( () => { this.seedCode() }, 50);
		this.props.advanceOneChallenge();
	}
	previousChallenge = () => {
		setTimeout( () => { this.seedCode() }, 50);
		this.props.previousChallenge();
	}
	render() {

    const options = {
    	mode: 'jsx',
      lineNumbers: true,
      theme: 'monokai',
      tabSize: 2,
      extraKeys: {
      	'Cmd-Enter': () => { 
	    		this.testCode();
	    		return false;
	    	}
	    } 
    };

    const renderTitle = () => { return { __html: this.props.challengeTitle }}
    const renderText = () => { return { __html: this.props.challengeText }}
    const renderInstructions = () => { return { __html: this.props.challengeInstructions }}
    
    const { testResults } = this.state;
    
    let passingTests, totalTests
    if (testResults.length > 0) {
	    passingTests = testResults.filter( (test) => test.status === true ).length;
	    totalTests = testResults.length;
    }
    
    const renderChallenges=this.props.challenges.map( (challenge, idx) => {
      return (
      	<option value={challenge.id} key = {idx} selected = {challenge.id === this.props.selectedChallenge}>
      		Current Challenge: {challenge.id}
      	</option>
      );
    });

    return (
    	<div>

    		<h1 className='title mainTitle'>Free Code Camp Redux Challenge Demo:

	        <select onChange={this.selectChallenge.bind(this)}>
	          {renderChallenges}
	        </select>
	        
    		</h1>

    		<div className='instructionsContainer'>
    		  <p className='qa'>QA status: {this.props.QA ?
						<span className='qa-complete'>Review Complete</span> :
						<span className='qa-needed'>Needs Review</span>}
					</p>
					<hr className='qa-line'/>
					<h1 className='challengeTitle' dangerouslySetInnerHTML={renderTitle()} />
					<p className='challengeText' dangerouslySetInnerHTML={renderText()} />
					<p className='instructions' dangerouslySetInnerHTML={renderInstructions()} />
    		</div>

    		<div className='outputContainer'>
		    	<h1 className='outputTitle'>Console Output:</h1>
		    	<div id='consoleOutput'></div>
		    </div>

    		<div className='mainContainer'>

					<div className="testWrapper">
				    <h1 className='title'>Tests</h1>
			    	
			    	<div className='testControls'>
			    		<button onClick={this.seedCode} className='seedBtn'>Reload Seed</button>
			    		<button onClick={this.solutionCode} className='solnBtn'>Solution Code</button>
			    		<button onClick={this.previousChallenge.bind(this)} className='travelBtn'>Previous Challenge</button>
			    		<button onClick={this.nextChallenge.bind(this)} className='travelBtn'>Next Challenge</button>
			    		<button onClick={this.testCode} className='testBtn'>Test Code</button>
				    </div>

				    <div className='testResults'>

				    	{ this.state.passed ?
		    				<p className='msg success'>All tests passed!</p> :
		    				<p className='msg error'>Your code does not pass the tests, {passingTests} out of {totalTests} tests are passing</p> }
				    	
				    	{
				    		testResults.map( (test, idx) => {
					    		if (test.status) {
					    			return (
					    				<p className='test testSuccess' key={idx}>
					    					<i className="fa fa-check" aria-hidden="true"></i>
					    					{test.condition}
					    				</p>
					    			)
					    		} else {
						    		return (
						    			<p className='test testFailure' key={idx}>
					    					<i className="fa fa-times" aria-hidden="true"></i>
					    					{test.condition}
					    				</p>
						    		)
						    	}
					    	})
				    	}

				    </div>
					</div>

					<div className='codeWrapper'>
		    		<h1 className='title'>Code <span className='keyShortcut'>press (Cmd-Enter) to run</span></h1>

			    	<CodeMirror
			    		className='editor'
			    		value={this.state.code}
			    		onChange={this.updateCode}
			    		options={options} />
		    	</div>

		    </div>

		    <hr />

		    <div>
		    	<p className='referenceLink'>- This project is testing Redux live on the client with JavaScript | <a target="_blank" href="https://github.com/bonham000/fcc-react-tests-module">View the code on GitHub</a></p>
		    </div>

    	</div>
    );
	}
};