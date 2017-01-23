#Free Code Camp React/Redux Challenge Development#

###This app is the development platform for the React/Redux Challenges which will be part of Free Code Camp's upcoming curriculum expansion.###

[View the interactive app which is running all of these challenges.](http://hysterical-amusement.surge.sh/)

The now [live Beta Version of Free Code Camp's expanded curriculum](http://beta.freecodecamp.com/en/) redirects campers to the link above while we work on merging these challenges into the FCC platform and ironing out other bugs in the Beta branch. Eventually the goal is for all of these challenges to be built directly into FCC.

**We have finished the initial QA and review of all of these challenges, but if you happen to find any errors or bugs, [see here to contribute your feedback](https://github.com/bonham000/fcc-react-tests-module/blob/master/CONTRIBUTING.md).**

###Curriculum Overview:###

* **React: 50 Challenges**
* **Redux: 18 Challenges**
* **React-Redux: 10 Challenges**

*View [`CHALLENGE_MAP.md`](https://github.com/bonham000/fcc-react-tests-module/blob/master/CHALLENGE_MAP.md) to see a detailed overview of all the challenge topics.*

---

To run this project locally, clone the repository, install the dependencies, and run `npm start`. Now you can view all the finished challenges live in the browser.

This project is running tests against React components, ES6 code, and plain JavaScript which users write directly into an in-browser code editor. To accomplish this we are using the [Babel standalone package](https://github.com/babel/babel-standalone) to transpile JavaScript and the testing library [Enzyme](http://airbnb.io/enzyme/) to conduct tests. At a basic level the tests we're writing for React components generally look like this:

```javascript
assert.strictEqual(shallowRender.type(), 'div', 'The component renders a div element');
```

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).