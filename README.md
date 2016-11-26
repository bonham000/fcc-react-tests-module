This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

#This is a demo prototype for a module to run tests against React code in an in-browser code editor.#

To create a new challenge to test use the template challenge in the src/challenges directory, and then import everything from the challenge in the TestContainer as follows:

```javascript
import { challengeTitle, challengeInstructions, seedCode, solutionCode, executeTests } from './challenges/Challenge_1'
```

Then simply run npm start and try out your challenge in the browser window that opens up.
