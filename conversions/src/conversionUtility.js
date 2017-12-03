/* eslint-disable */
import fs from 'fs';
import parseChallenge from './utils/parseChallenge';
import copyChallengeTemplate from './utils/copyChallengeTemplate';
// import ReactSource from './source/react';
import ReduxSource from './source/redux';
import ReactReduxSource from './source/react-redux';

import * as React_02 from '../../src/challenges/react/React_02';
import * as React_04 from '../../src/challenges/react/React_04';
import * as React_08 from '../../src/challenges/react/React_08';

const ReactSource = [,
  React_02,
  React_04,
  React_08
];

/*
This is a utility for converting the prototype React, Redux, and React-Redux
challenges to freeCodeCamp compatible seed files. This part of the utility
handles everythign except converting the tests themselves, as this is a bit
more manual, and requires a second utility and some by-hand tweaking. Here's
a basic run-down of the process that's happening in this utility:
  1. Source arrays of challenge modules are imported. From each module,
     we aaccess all of the relevant info: title,intro, directions, etc.
  2. We pair each array (in an array of objects) with a corresponding
     challenge template and a json file to read from and write results to.
  3. Then we loop through the array of object containing the above:
      1. In each loop iteration we parse the JSON file associated with
         each source array back into JS.
      2. Then we loop over the array of source challenges and perform
         a number of operations on each challnege in order to correctly
         parse them.
      3. This chain looks something like:

                > render instructions > truncate > replace > remove \n's => arr >
parseChallenge >                                                                 => { description, seed, solution, title }
                > render introduction > truncate > replace > remove \n's => arr >

      4. Then, with a nicely parsed challenge, in the correcr format, we
         simply contruct a new challenge by assigning the pieces to the
         right keys of the challenge template objects.
      5. We push each new challenge on to the parsed JSON object, and
         once complete, convert the entire thing back into JSON and
         write it back to the appropriate JSON file.
*/

const reactChallengeTemplate = {
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

const reduxChallengeTemplate = copyChallengeTemplate(reactChallengeTemplate);
reduxChallengeTemplate.files.indexjsx.ext = 'js';

// make a new challenge
function constructChallenge (challenge, template) {
  // extract parts from prototype challenges
  const parsedChallenge = parseChallenge(challenge);
  // deep copy challengeTemplate and construct from parsed
  const newChallenge = copyChallengeTemplate(template);
  newChallenge.title = parsedChallenge.title;
  newChallenge.description = parsedChallenge.description;
  newChallenge.files.indexjsx.contents = parsedChallenge.seedCode;
  newChallenge.solutions = [ parsedChallenge.solutionCode ];
  return newChallenge;
}

// parse, push, write
function appendChallengesToJSON(source, target, template) {
  fs.readFile(target, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // parse seed back to JS
      const seed = JSON.parse(data);
      // loop through challenges & format
      // add each new challenge to seed
      source.forEach(challenge => {
        seed.challenges.push(constructChallenge(challenge, template));
      });
      // convert back to json
      const json = JSON.stringify(seed, null, 2);
      fs.writeFile(target, json, 'utf8', (err) => {
        if (err) console.log(err);
      });
    }
  });
}

const sourceTargets = [
  {
    source: ReactSource,
    target: './src/target/react.json',
    template: reactChallengeTemplate
  },
  // {
  //   source: ReduxSource,
  //   target: './src/target/redux.json',
  //   template: reduxChallengeTemplate
  // },
  // {
  //   source: ReactReduxSource,
  //   target: './src/target/react-and-redux.json',
  //   template: reactChallengeTemplate
  // }
];

// intitiate conversion. yes!
sourceTargets.forEach(obj => {
  appendChallengesToJSON(obj.source, obj.target, obj.template);
});
