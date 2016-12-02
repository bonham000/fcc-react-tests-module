#Free Code Camp React/Redux Challenge Development#

###This repo contains an in-browser test module prototype for React/Redux code and the proposed React & Redux challenges for the Free Code Camp Curriculum Expansion.###

[See this project live here](http://hysterical-amusement.surge.sh/)

*View [`CHALLENGE_MAP.md`](https://github.com/bonham000/fcc-react-tests-module/blob/master/CHALLENGE_MAP.md) to see an overview of the challenges and their development progress.*

**Note: If you do want to contribute a challenge please lets us know by opening an Issue or contacting us, because we are updating and adding these challenges very quickly.**

---

**Note:** *For development, we are using a `src/DevApp.js` file that is being git-ignored which allows us to just load the challenge we are working on into the app. You can create this file from the example `src/DevAppExample.js`. Be sure `src/index.js` is rendering the `DevApp` now if it isn't already.*

To write a new challenge use the appropriate template challenge in the `src/challenge-templates` directory, save it as a new challenge file, and then import it into your `src/DevApp.js`:

###Add an Import for your Challenge:###

```javascript
import { * as React_1 } from './challenges/react/<YOUR_CHALLENGE_NAME>'
```

To import a redux challenge use the redux template, save your challenge in the `./challenges/redux/curriculum` path, and import it like above. After importing the challenge add it to the `challenges` array in `src/App.js` following the pattern of the other challenges.

##Instructions on writing a new challenge:##

A new challenge requires all of the following, all of which is provided in a challenge template file:
- **QA:** Current review status of challenge, defaults to `false`
- **Challenge Title:** A concise name for the challenge.
- **Challenge Text:** Text/Introduction to the challenge.
- **Challenge Instructions:** Instructions for solving the challenge.
- **Seed Code:** Code to be populated on page load as the challenge starting point.
- **Solution Code:** A passing solution to the challenge.
- **executeTests:** A function which defines all the tests for the challenge.
- **liveRender:** You don't need to modify this function.

**Notes on completing the executeTests function:** You need to provide messages for each test condition and then you need to write each of the tests. We are using the [Enzyme testing module from Airbnb](http://airbnb.io/enzyme/docs/api/index.html) and assert for writing assertions. For example, after we shallow render our component, we could assert:

```javascript
assert.strictEqual(shallowRender.type(), 'div', 'The component renders a div element');
```

All of the tests follow this basic pattern, and the [Enzyme documentation](http://airbnb.io/enzyme/docs/api/ShallowWrapper/children.html) is a great reference for seeing what we can test.

Now run `npm start` and try out your challenge in the browser window that opens up. All of challenge information is passed as props into the `TestComponent`. Once it's running you can then edit your code, run your tests, and load the solution code to verify everything is working properly. Once you have your challenge written and appropriate tests running, submit a pull request to have it added.

***

##Instructions for QA:##

Once a challenge is completely written (title, instructions, seed code, solution code, and tests are all completed) it needs to be reviewed to ensure that it correctly assesses what it is trying to assess, the tests function properly, the instructions are clear, and the content is explain sufficiently. After a challenge has been reviewed its status can be updated.

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).