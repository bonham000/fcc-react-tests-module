
import React, { PropTypes } from 'react';

// shared challenge proptypes
export const challengeProps = {
	QA: PropTypes.bool.isRequired,
	select: PropTypes.func.isRequired,
	seedCode: PropTypes.string.isRequired,
	liveRender: PropTypes.func.isRequired,
	challenges: PropTypes.array.isRequired,
	executeTests: PropTypes.func.isRequired,
	nextChallenge: PropTypes.func.isRequired,
	solutionCode: PropTypes.string.isRequired,
	challengeText: PropTypes.string.isRequired,
	errorSuppression: PropTypes.bool.isRequired,
	challengeTitle: PropTypes.string.isRequired,
	previousChallenge: PropTypes.func.isRequired,
	selectedChallenge: PropTypes.string.isRequired,
	toggleErrorSuppression: PropTypes.func.isRequired,
	challengeInstructions: PropTypes.string.isRequired,
};

// helper for rendering challenge list
export const renderChallenges = (challenges) => {
  return challenges.map((challenge, idx) => (
    <option value={challenge.id} key={idx}>
      {challenge.id.replace(/_/g, ' ') + ': ' + challenge.title}
    </option>
  ));
};

// Code Mirror configuration options
export const editorOptions = {
	autoCloseBrackets: true,
	extraKeys: {
		'Cmd-Enter': () => {
			this.testCode();
			return false;
		},
		'Ctrl-Enter': () => {
			this.testCode();
			return false;
		}
	},
	keymap: 'sublime',
	lineNumbers: true,
	matchBrackets: true,
  mode: 'jsx',
	tabSize: 2,
  theme: 'monokai',
};

// helper for evaluating keypresses
export const keyboard = {
  isNextChallenge(event) {
    return (event.keyCode === 39 && event.ctrlKey && event.metaKey && event.altKey);
  },
  isPreviousChallenge(event) {
    return (event.keyCode === 37 && event.ctrlKey && event.metaKey && event.altKey);
  },
  isSubmitCode(event) {
    return (
      (event.keyCode === 13 && event.metaKey) ||
      (event.keyCode === 13 && event.ctrlKey)
    );
  },
  isSolutionCode(event) {
    return (event.keyCode === 83 && event.shiftKey);
  },
  isReloadCode(event) {
    return (event.keyCode === 82 && event.shiftKey);
  }
};
