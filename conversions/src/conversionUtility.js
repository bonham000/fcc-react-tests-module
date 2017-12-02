/* eslint-disable */
import fs from 'fs';
import parseChallenge from './utils/parseChallenge';
import copyChallengeTemplate from './utils/copyChallengeTemplate';

import * as React_02 from '../../src/challenges/react/React_02';
import * as React_04 from '../../src/challenges/react/React_04';
import * as React_08 from '../../src/challenges/react/React_08';

const challenges = [,
  React_02,
  React_04,
  React_08
];

const challengeTemplate = {
  id: '',
  title: '',
  releasedOn: 'December 25, 2017',
  description: [],
  files: {
    indexjsx: {
      key: 'indexjsx',
      ext: 'jsx',
      name: 'index',
      contents: []
    }
  },
  tests: [],
  head: [],
  tail: [],
  solutions: [],
  type: 'modern',
  isRequired: false,
  translations: {}
};

function constructChallenge (challenge) {
  // extract parts from prototype challenges
  const parsedChallenge = parseChallenge(challenge);
  // deep copy challengeTemplate and construct from parsed
  const newChallenge = copyChallengeTemplate(challengeTemplate);
  newChallenge.title = parsedChallenge.title;
  newChallenge.description = parsedChallenge.description;
  newChallenge.files.indexjsx.contents = parsedChallenge.seedCode;
  newChallenge.solutions = [ parsedChallenge.solutionCode ];
  return newChallenge;
}

// json file to write to
const writeFile = './src/seed/react.json';

// parse, push, write
function appendChallengesToJSON(challenges) {
  fs.readFile(writeFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // parse seed back to JS
      const seed = JSON.parse(data);
      // loop through challenges & format
      // add each new challenge to seed
      challenges.forEach(challenge => {
        seed.challenges.push(constructChallenge(challenge));
      });
      // convert back to json
      const json = JSON.stringify(seed, null, 2);
      fs.writeFile(writeFile, json, 'utf8', (err) => {
        if (err) console.log(err);
      });
    }
  });
}

// intitiate conversion. yes!
appendChallengesToJSON(challenges);
