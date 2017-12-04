import renderIntroductionToArray from './renderIntroductionToArray';
import renderInstructionsToArray from './renderInstructionsToArray';

export default (challenge) => {
  const introdcution = renderIntroductionToArray(challenge.challengeText);
  const instructions = renderInstructionsToArray(challenge.challengeInstructions)
  return {
    description: introdcution.concat(['<hr>'], instructions),
    seedCode: challenge.seedCode.split('\n'),
    solutionCode: challenge.solutionCode,
    title: challenge.challengeTitle.slice(42)
  };
}
