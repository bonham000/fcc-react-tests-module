/* eslint-disable */
import React from 'react'
import CodeMirror from 'react-codemirror'

import 'codemirror/mode/jsx/jsx';

export default class ReduxTestComponent extends React.Component {
	static propTypes = {
		challengeTitle: React.PropTypes.string.isRequired,
		challengeText: React.PropTypes.string.isRequired,
		challengeInstructions: React.PropTypes.string.isRequired,
		seedCode: React.PropTypes.string.isRequired,
		solutionCode: React.PropTypes.string.isRequired,
		executeTests: React.PropTypes.func.isRequired,
		liveRender: React.PropTypes.func.isRequired,
		QA: React.PropTypes.bool.isRequired,
		selectedChallenge: React.PropTypes.string.isRequired,
		challenges: React.PropTypes.array.isRequired,
		select: React.PropTypes.func.isRequired,
		advanceOneChallenge: React.PropTypes.func.isRequired,
		previousChallenge: React.PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.seedCode,
			testResults: []
		}
	}
	componentDidMount() {
		this.testCode();
		document.addEventListener('keydown', this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}
	handleKeyPress = (event) => {
		if (event.keyCode === 39 && event.ctrlKey && event.metaKey && event.altKey) {
      setTimeout( () => { this.seedCode(true) }, 25);
    } else if (event.keyCode === 37 && event.ctrlKey && event.metaKey && event.altKey) {
      setTimeout( () => { this.seedCode(true) }, 25);
    } else if (event.keyCode === 13 && event.metaKey) {
			this.testCode();
		} else if (event.keyCode === 13 && event.ctrlKey) {
			this.testCode();
		} else if (event.keyCode === 83 && event.shiftKey) {
			this.solutionCode();
		} else if (event.keyCode === 82 && event.shiftKey) {
			this.seedCode();
		}
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
		setTimeout(() => {this.testCode()}, 35);
	}
	solutionCode = () => {
		this.setState({
			code: this.props.solutionCode
		});
		setTimeout(() => {this.testCode()}, 35);
	}
	select = (event) => {
		setTimeout( () => { this.seedCode(true) }, 25);
		this.props.select(event.target.value);
	}
	nextChallenge = () => {
		setTimeout( () => { this.seedCode() }, 25);
		this.props.advanceOneChallenge();
	}
	previousChallenge = () => {
		setTimeout( () => { this.seedCode() }, 25);
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
	    	},
	    	'Ctrl-Enter': () => {
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
      	<option value={challenge.id} key={idx}>
      		{challenge.id.replace(/_/g, ' ') + ': ' + challenge.title}
      	</option>
      );
    });

    return (
    	<div>

    		<h1 className='title mainTitle'>Free Code Camp Redux Challenge Alpha:

	        <select value={this.props.selectedChallenge} onChange={this.select}>
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
		    		<h1 className='title'>Code <span className='keyShortcut'>(press Cmd/Ctrl + Enter to run)</span></h1>
			    	<CodeMirror
			    		className='editor'
			    		value={this.state.code}
			    		onChange={this.updateCode}
			    		options={options} />
		    	</div>

		    </div>

		    <hr />

		    <div>
		    	<p className='referenceLink'>- This project is testing Redux live in a browser with JavaScript | &nbsp;
		    		<a target="_blank" href="https://github.com/bonham000/fcc-react-tests-module">View on GitHub</a>
		    	</p>
		    </div>

    	</div>
    );
	}
};
