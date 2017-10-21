/* eslint-disable */
import React, { PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import {
	keyboard,
	editorOptions,
	challengeProps,
	renderChallenges,
} from './shared.js';

import 'codemirror/mode/jsx/jsx';

export default class ReduxTestComponent extends React.Component {
	static propTypes = challengeProps;
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
	componentDidUpdate(prevProps) {
		if (prevProps.selectedChallenge !== this.props.selectedChallenge) {
			this.seedCode();
		}
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}
	handleKeyPress = (event) => {
		if (keyboard.isNextChallenge(event)) {
      this.seedCode(true);
    } else if (keyboard.isPreviousChallenge(event)) {
      this.seedCode(true);
		} else if (keyboard.isSubmitCode(event)) {
			this.testCode();
		} else if (keyboard.isSolutionCode(event)) {
			this.solutionCode();
		} else if (keyboard.isReloadCode(event)) {
			this.seedCode();
		}
	}
  updateCode = (newCode) => {
    this.setState({
        code: newCode
    });
	}
	testCode = (calledFirstTime = false) => {

		console.clear();
		console.warn('Note: console output is cleared before the tests are run.');
		console.warn(`Error suppression is currently ${this.props.errorSuppression ? 'on' : 'off'}.`);

		const { code } = this.state;
		const showError = calledFirstTime ? true : this.props.errorSuppression;
		const results = this.props.executeTests(code, showError);

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
		const { seedCode } = this.props;
		this.setState({ code: seedCode }, () => this.testCode());
	}
	solutionCode = () => {
		const { solutionCode } = this.props;
		this.setState({ code: solutionCode }, () => this.testCode());
	}
	select = (event) => {
		this.props.select(event.target.value);
	}
	nextChallenge = () => {
		this.props.advanceOneChallenge();
	}
	previousChallenge = () => {
		this.props.previousChallenge();
	}
	render() {
		const { testResults } = this.state;
		const {
			QA,
			challenges,
			challengeText,
			challengeTitle,
			errorSuppression,
			selectedChallenge,
			challengeInstructions,
			toggleErrorSuppression,
		} = this.props;

    const renderTitle = () => ({ __html: challengeTitle });
    const renderText = () => ({ __html: challengeText });
    const renderInstructions = () => ({ __html: challengeInstructions });

    let passingTests, totalTests
    if (testResults.length > 0) {
	    passingTests = testResults.filter( (test) => test.status === true ).length;
	    totalTests = testResults.length;
    }

    return (
    	<div>

    		<h1 className='title mainTitle'>freeCodeCamp Redux Challenge Alpha:

	        <select value={selectedChallenge} onChange={this.select}>
	          {renderChallenges(challenges)}
	        </select>

    		</h1>

    		<div className='instructionsContainer'>
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

						<div className="toggleSwitch">
							<p className="toggleMeta" style={{ color: errorSuppression ? '#969696' : '#2196F3' }}>
								{errorSuppression
									? '(Errors will be suppressed)'
									: '(Errors will be logged to the console)'}
							</p>
							<label className="switch">
								<input
									type="checkbox"
									checked={!errorSuppression}
									onChange={toggleErrorSuppression} />
								<span className="slider round"></span>
							</label>
						</div>

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
			    		options={editorOptions} />
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
