/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import CodeMirror from 'react-codemirror'

import 'codemirror/mode/jsx/jsx';

export default class Component extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.seedCode,
			testResults: []
		}
		this.updateCode=this.updateCode.bind(this);
		this.liveRender=this.liveRender.bind(this);
		this.testCode=this.testCode.bind(this);
		this.seedCode=this.seedCode.bind(this);
		this.solutionCode=this.solutionCode.bind(this);
	}
  updateCode(newCode) {
    this.setState({
        code: newCode
    });
    this.liveRender();
	}
	liveRender() {

		const { code }=this.state;
		const renderComponent=this.props.liveRender(code);

		// try to live render the component
		// some renders may fail so this has to be wrapped in a try/catch
		try {
			ReactDOM.render(renderComponent, document.getElementById('liveOutput'));
		} catch (err) {
			console.log('Live rendering error:', err);
		}

	}
	testCode() {

		const { code }=this.state;
		const results=this.props.executeTests(code);

		this.setState({
			passed: results.passed,
			testResults: results.testResults
		});

	}
	seedCode() {
		this.setState({
			code: this.props.seedCode
		});
		setTimeout( () => { 
			this.liveRender(); 
			this.testCode();
		}, 50);
	}
	solutionCode() {
		this.setState({
			code: this.props.solutionCode
		});
		setTimeout( () => { 
			this.liveRender();
			this.testCode(); 
			}, 50);
	}
	componentDidMount() {
		this.testCode();
		this.liveRender();
	}
	selectChallenge(event) {
		setTimeout( () => { this.seedCode() }, 50);
		this.props.select(event.target.value);
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

    const renderChallenges = this.props.challenges.map( (challenge, idx) => {
      return (
      	<option value={challenge.id} key = {idx} selected = {challenge.id === this.props.selectedChallenge}>
      		Current Challenge: {challenge.id}
      	</option>
      );
    });

    return (
    	<div>

    		<h1 className='title mainTitle'>Free Code Camp React Challenge Demo:

	        <select onChange={this.selectChallenge.bind(this)}>
	          {renderChallenges}
	        </select>

    		</h1>

    		<div className='instructionsContainer'>
					<h1 className='challengeTitle' dangerouslySetInnerHTML={renderTitle()} />
					<p className='challengeText' dangerouslySetInnerHTML={renderText()} />
					<p className='instructions' dangerouslySetInnerHTML={renderInstructions()} />
					<p className='qa'>QA status: {this.props.QA ?
						<span className='qa-complete'>Review Complete</span> :
						<span className='qa-needed'>Needs Review</span>}
					</p>
    		</div>

    		<div className='outputContainer'>
		    	<h1 className='outputTitle'>Live Preview:</h1>
		    	<div id='liveOutput'></div>
		    </div>

				<div className='mainContainer'>
			    <div className='testWrapper'>

				    <h1 className='title'>Tests</h1>
			    	
			    	<div className='testControls'>
			    		<button onClick={this.testCode} className='testBtn'>Test Code</button>
			    		<button onClick={this.seedCode}>Reload Seed</button>
			    		<button onClick={this.solutionCode}>Solution Code</button>
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
		    		<h1 className='title'>Code <span className='keyShortcut'>(press Cmd-Enter to run)</span></h1>

			    	<CodeMirror
			    		className='editor'
			    		value={this.state.code}
			    		onChange={this.updateCode}
			    		options={options} />
			    </div>

			  </div>

		    <hr />

		    <div>
		    	<p className='referenceLink'>- This project is using <a target="_blank" href="http://airbnb.io/enzyme/index.html">Enzyme</a> to test React Components live in a browser | <a target = "_blank" href="https://github.com/bonham000/fcc-react-tests-module">View the code on GitHub</a></p>
		    </div>

		    <div id='challenge-node' style={{ display: 'none' }}></div>

    	</div>
    );
	}
};