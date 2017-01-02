#Free Code Camp React/Redux Challenge Development#

###This app is an in-browser test module for developing the React/Redux challenges for the upcoming Free Code Camp Curriculum Expansion.###

[See this project live here and try out the challenges now](http://hysterical-amusement.surge.sh/)

**We need help QA'ing these!** [See here to contribute](https://github.com/bonham000/fcc-react-tests-module/blob/master/CONTRIBUTING.md)

###Curriculum Overview:###

* **React: 48 Challenges**
* **Redux: 18 Challenges**
* **React-Redux: 10 Challenges**

*View [`CHALLENGE_MAP.md`](https://github.com/bonham000/fcc-react-tests-module/blob/master/CHALLENGE_MAP.md) to see a detailed overview of all the challenge topics*

---

To run this project locally, clone the repository, install the dependencies, and run `npm start`. Now you can view all the finished challenges live in the browser.

This project is running tests against React components, ES6 code, and plain JavaScript which users write directly into a browser code editor. To accomplish this we are using the [Babel standalone package](https://github.com/babel/babel-standalone) to transpile JavaScript and the testing library [Enzyme](http://airbnb.io/enzyme/) to conduct tests. The tests we're writing for React components generally look like this:

```javascript
assert.strictEqual(shallowRender.type(), 'div', 'The component renders a div element');
```

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).