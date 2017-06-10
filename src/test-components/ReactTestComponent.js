/* eslint-disable */
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import CodeMirror from 'react-codemirror'

import 'codemirror/mode/jsx/jsx';

export default class ReactTestComponent extends React.Component {
	static propTypes = {
		challengeTitle: PropTypes.string.isRequired,
		challengeText: PropTypes.string.isRequired,
		challengeInstructions: PropTypes.string.isRequired,
		seedCode: PropTypes.string.isRequired,
		solutionCode: PropTypes.string.isRequired,
		executeTests: PropTypes.func.isRequired,
		liveRender: PropTypes.func.isRequired,
		QA: PropTypes.bool.isRequired,
		selectedChallenge: PropTypes.string.isRequired,
		challenges: PropTypes.array.isRequired,
		select: PropTypes.func.isRequired,
		advanceOneChallenge: PropTypes.func.isRequired,
		previousChallenge: PropTypes.func.isRequired
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
		this.liveRender();
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
	testCode = () => {

		const { code } = this.state;
		const results = this.props.executeTests(code);

		this.setState({
			passed: results.passed,
			testResults: results.testResults
		});

	}
	seedCode = (condition) => {
		this.setState({
			code: this.props.seedCode
		});
		setTimeout( () => {
			this.liveRender(condition);
			this.testCode();
		}, 35);
	}
	solutionCode = () => {
		this.setState({
			code: this.props.solutionCode
		});
		setTimeout( () => {
			this.liveRender();
			this.testCode();
		}, 35);
	}
	select = (event) => {
		setTimeout( () => { this.seedCode(true) }, 25);
		this.props.select(event.target.value);
	}
	nextChallenge = () => {
		setTimeout( () => { this.seedCode(true) }, 25);
		this.props.advanceOneChallenge();
	}
	previousChallenge = () => {
		setTimeout( () => { this.seedCode(true) }, 25);
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

    let passingTests, totalTests;

    if (testResults.length > 0) {
	    passingTests = testResults.filter( (test) => test.status === true ).length;
	    totalTests = testResults.length;
    }

    const renderChallenges = this.props.challenges.map( (challenge, idx) => {
      return (
      	<option value={challenge.id} key={idx}>
      		{challenge.id.replace(/_/g, ' ') + ': ' + challenge.title}
      	</option>
      );
    });

    return (
    	<div>

    		<h1 className='title mainTitle'>Free Code Camp React Challenge Alpha:

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
		    	<h1 className='outputTitle'>Live Preview:</h1>
		    	<div id='liveOutput'></div>
		    </div>

				<div className='mainContainer'>
			    <div className='testWrapper'>

				    <h1 className='title'>Tests</h1>

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
			    		options={options} />
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
