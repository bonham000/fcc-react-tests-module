/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'react-codemirror';
import { editorOptions, keyboard, challengeProps } from './shared.js';

import 'codemirror/mode/jsx/jsx';

export default class ReactTestComponent extends React.Component {
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
		this.liveRender();
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
    this.setState({ code: newCode });
    this.liveRender();
	}
	liveRender = (condition) =>{

		const { code } = this.state;
		const renderComponent = this.props.liveRender(code);

		// try to live render the component
		// some renders may fail so this has to be wrapped in a try/catch
		try {
			ReactDOM.render(renderComponent, document.getElementById('liveOutput'));
		} catch (err) {
			if (condition) document.getElementById('liveOutput').innerHTML = '';
			/*
			 * we will suppress this error here because the live preview refresh will
			 * throw continue to throw errors at this point that may be misleading to the user
			*/
		}

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

	}
	seedCode = (condition) => {
		this.setState({ code: this.props.seedCode }, () => {
			this.liveRender(condition);
			this.testCode(true);
		});
	}
	solutionCode = () => {
		this.setState({ code: this.props.solutionCode }, () => {
			this.liveRender();
			this.testCode();
		});
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

    let passingTests, totalTests;

    if (testResults.length > 0) {
	    passingTests = testResults.filter( (test) => test.status === true ).length;
	    totalTests = testResults.length;
    }

    const renderChallenges = challenges.map( (challenge, idx) => {
      return (
      	<option value={challenge.id} key={idx}>
      		{challenge.id.replace(/_/g, ' ') + ': ' + challenge.title}
      	</option>
      );
    });

    return (
    	<div>

    		<h1 className='title mainTitle'>freeCodeCamp React Challenge Alpha:

	        <select value={selectedChallenge} onChange={this.select}>
	          {renderChallenges}
	        </select>

    		</h1>

				{selectedChallenge === 'React_30' && (
					<div className='callToAction'>
						&#9733; This challenge has an open issue: <a
							target='_blank'
							className='CTA-Link'
							href="https://github.com/bonham000/fcc-react-tests-module/issues/227">
							Take a look if you are interested in helping resolve it.
						</a>
					</div>)}

				{selectedChallenge === 'React_35' && (
					<div className='callToAction'>
						&#9733; This challenge has an open issue: <a
							target='_blank'
							className='CTA-Link'
							href="https://github.com/bonham000/fcc-react-tests-module/issues/228">
							Take a look if you are interested in helping resolve it.
						</a>
					</div>)}

					{selectedChallenge === 'React_45' && (
						<div className='callToAction'>
							&#9733; This challenge has an open issue: <a
								target='_blank'
								className='CTA-Link'
								href="https://github.com/bonham000/fcc-react-tests-module/issues/232">
								Take a look if you are interested in helping resolve it.
							</a>
						</div>)}

    		<div className='instructionsContainer'>
					<h1 className='challengeTitle' dangerouslySetInnerHTML={renderTitle()} />
					<p className='challengeText' dangerouslySetInnerHTML={renderText()} />
					<p className='instructions' dangerouslySetInnerHTML={renderInstructions()} />
    		</div>

    		<div className='outputContainer'>
		    	<h1 className='outputTitle'>Live Preview:</h1>
		    	<div id='liveOutput'></div>
		    </div>

				<div className='mainContainer'>
			    <div className='testWrapper'>

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
			    		<button onClick={this.previousChallenge} className='travelBtn'>Previous Challenge</button>
			    		<button onClick={this.nextChallenge} className='travelBtn'>Next Challenge</button>
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
		    	<p className='referenceLink'>- This project tests React code with &nbsp;
		    		<a target="_blank" href="http://airbnb.io/enzyme/index.html">Enzyme</a> live in a browser | &nbsp;
		    		<a target = "_blank" href="https://github.com/bonham000/fcc-react-tests-module">View on GitHub</a>
		    	</p>
		    </div>

		    <div id='challenge-node' style={{ display: 'none' }}></div>

    	</div>
    );
	}
};
