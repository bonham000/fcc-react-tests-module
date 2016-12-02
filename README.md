#Free Code Camp React/Redux Challenge Development#

###This repo contains an in-browser test module prototype for React/Redux code and the proposed React & Redux challenges for the Free Code Camp Curriculum Expansion.###

[See this project live here](http://hysterical-amusement.surge.sh/)

*View `CHALLENGE_MAP.md` to see an overview of the challenges and their development progress.*

---

To contribute a new challenge find a challenge that needs to be written from the CHALLENGE_MAP and use the appropriate template challenge in the `src/challenge-templates` directory and then import it in `src/App.js`, changing the `#` to the appropriate challenge `#`:

**The challenges for the actual curriculum are being saved in the `challenges/react/curriculum` path and `challenges/redux/curriculum` for redux.**

###Add an Import for your Challenge:###

```javascript
import { * as React_# } from './challenges/react/<YOUR_CHALLENGE_NAME>'
```

To import a redux challenge use the redux template, save your challenge in the `./challenges/redux/curriculum` path, and import it like above. After importing the challenge add it to the `challenges` array in `src/App.js` following the pattern of the other challenges.

Now run `npm start` and try out your challenge in the browser window that opens up. All of challenge information is passed as props into the `TestComponent`. Once it's running you can then edit your code, run your tests, and load the solution code to verify everything is working properly. Once you have your challenge written and appropriate tests running, submit a pull request to have it added.

##Instructions on writing a new challenge:##

A new challenge requires all of the following, all of which is provided in a challenge template file:
- **QA:** Current review status of challenge.
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

***

##Instructions for QA:##

Once a challenge is completely written (title, instructions, seed code, solution code, and tests are all completed) it needs to be reviewed to ensure that it correctly assesses what it is trying to assess and the tests function properly. After a challenge has been reviewed its status can be updated.

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).