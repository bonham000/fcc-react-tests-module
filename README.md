#This is a demo prototype for a module to run tests against React code in an in-browser code editor.#

To create a new challenge to test use the template challenge in the src/challenges directory, and then change the import statement to import your challenge as follows:

##Change from:##

```javascript
import { challengeTitle, challengeInstructions, seedCode, solutionCode, executeTests } from './challenges/Challenge_1'
```

##To:##

```javascript
import { challengeTitle, challengeInstructions, seedCode, solutionCode, executeTests } from './challenges/<YOUR_CHALLENGE_NAME>'
```

Then simply run npm start and try out your challenge in the browser window that opens up. The challenge data will be loaded as props into the TestContainer and rendered to the page. You can then edit your code, run your tests, and load the solution code to verify everything is working properly.

This project is using the React-addons-test-utils and npm expect module to conduct tests on React Components.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).