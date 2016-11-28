#This is a demo prototype for a module to run tests against React code in an in-browser code editor.#

To create a new challenge to test use the template challenge in the `src/challenges` directory and then change the import statement in `src/App.js` to import your challenge as follows:

###Change from:###

```javascript
import { ... } from './challenges/Challenge_1'
```

###To:###

```javascript
import { ... } from './challenges/<YOUR_CHALLENGE_NAME>'
```

Then run `npm start` and try out your challenge in the browser window that opens up. All of challenge information is passed as props into the `TestComponent`. Once it's running you can then edit your code, run your tests, and load the solution code to verify everything is working properly.

##Instructions on writing a new challenge:##

A new challenge requires all of the following:
> - **Challenge Title**
> - **Challenge Instructions**
> - **Seed Code:** this code is what is first populated when the user loads the page
> - **Solution Code:** code that passes all the given tests
> - **a function to execute the tests:** This function is where you will define all the tests for your challenge.
> - **a function for live-reloading the code:** You don't need to modify this function.

**Notes on completing the executeTests function:** You need to provide messages for the success and failure of each of your tests and then you need to write each of the tests. We are using the [Enzyme testing module from Airbnb](http://airbnb.io/enzyme/docs/api/index.html) and the npm expect module for writing assertions. For example, after we shallow render our component, we could assert:

```javascript
expect(shallowRender.type()).toEqual('div');
```

All of the tests follow this basic pattern, and the [Enzyme documentation](http://airbnb.io/enzyme/docs/api/ShallowWrapper/children.html) is a great reference for seeing what we can test.

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).