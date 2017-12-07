# freeCodeCamp React/Redux Challenge Development

### This repository contains the code for the Alpha version of the freeCodeCamp React/Redux Curriculum Expansion.

### Overview:

* **50 React Challenges**
* **18 Redux Challenges**
* **10 React-Redux Challenges**

The now [live Beta Version of freeCodeCamp's expanded curriculum](http://beta.freecodecamp.com/en/) redirects campers to [a separate host site for these React challenges](http://hysterical-amusement.surge.sh/), while we work on merging them into the FCC platform. Eventually, the goal is for all of these challenges to be moved directly into the [freeCodeCamp codebase](https://github.com/freeCodeCamp/freeCodeCamp).

**Currently, we have finished the initial QA and review of all of these challenges and are quite happy with them. There is still a possibility that there are bugs or typos we have not found yet. If you find something you think needs to be fixed, or have a suggestion for any of the challenges, please open an Issue here first so we can discuss it.**



---

# Curriculum Map:

- :white_check_mark: Challenge is fully QA'd and ready to ship
- :blue_book: Challenge has been reviewed and is ready for QA

### React Challenges:

- **Introducing JSX Elements**

  - :white_check_mark: :blue_book: 1: Create a Simple JSX element
  - :white_check_mark: :blue_book: 2: Create a Complex JSX Element
  - :white_check_mark: :blue_book: 3: Add Comments in JSX (*may need to revise test for comment*)
  - :white_check_mark: :blue_book: 4: Render HTML Elements to the DOM
  - :white_check_mark: :blue_book: 5: Define an HTML Class in JSX
  - :white_check_mark: :blue_book: 6: Learn About Self-Closing JSX Tags

- **Introducing React/Components**

  - :white_check_mark: :blue_book: 7: Create a Stateless Functional Component *(introduce ES6 arrow syntax here?)*
  - :white_check_mark: :blue_book: 8: Create a Component with React
  - :white_check_mark: :blue_book: 9: Create a Component with Composition
  - :white_check_mark: :blue_book: 10: Use React to Render Nested Components
  - :white_check_mark: :blue_book: 11: Compose React Components
  - :white_check_mark: :blue_book: 12: Render a Class Component to the DOM
  - :white_check_mark: :blue_book: 13: Write a React Component from Scratch

- **Props**

  - :white_check_mark: :blue_book: 14: Pass a String to a Functional Component
  - :white_check_mark: :blue_book: 15: Pass an Array as Props
  - :white_check_mark: :blue_book: 16: Use Default Props
  - :white_check_mark: :blue_book: 17: Override Default Props *(cannot check `defaultProps` on child)*
  - :white_check_mark: :blue_book: 18: Use PropTypes to Define the Props You Expect *(regex `.includes` test for `propTypes`)*
  - :white_check_mark: :blue_book: 19: Access Props Using this.props
  - :white_check_mark: :blue_book: 20: Using Props with Stateless Functional Components *(regex `.includes` test for `propTypes`)*

- **State**

  - :white_check_mark: :blue_book: 21: Create a Stateful Component
  - :white_check_mark: :blue_book: 22: Render State in the UI
  - :white_check_mark: :blue_book: 23: Render State in the UI Another Way
  - :white_check_mark: :blue_book: 24: Set State with this.setState
  - :white_check_mark: :blue_book: 25: Bind 'this' to a Class Method
  - :white_check_mark: :blue_book: 26: Bind 'this' with an ES6 Arrow Function
  - :white_check_mark: :blue_book: 27: Use State to Toggle an Element
  - :white_check_mark: :blue_book: 28: Write a Simple Counter
  - :white_check_mark: :blue_book: 29: Create a Controlled Input
  - :white_check_mark: :blue_book: 30: Create a Controlled Form
  - :white_check_mark: :blue_book: 31: Pass State as Props to Child Components
  - :white_check_mark: :blue_book: 32: Pass a Callback as Props

- **Component Lifecycle**

  - :white_check_mark: :blue_book: 33: Use the Lifecycle Method componentWillMount
  - :white_check_mark: :blue_book: 34: Use the Lifecycle Method componentDidMount
  - :white_check_mark: :blue_book: 35: Add Event Listeners **is the explanation correct?**
  - :white_check_mark: :blue_book: 36: Manage Updates with Lifecycle Methods
  - :white_check_mark: :blue_book: 37: Optimize Re-Renders with shouldComponentUpdate

- **Advanced Rendering**

  - :white_check_mark: :blue_book: 38: Introducing Inline Styles
  - :white_check_mark: :blue_book: 39: Add Inline Styles in React
  - :white_check_mark: :blue_book: 40: Use Advanced JavaScript in React Render Method
  - :white_check_mark: :blue_book: 41: Render with an If/Else Condition
  - :white_check_mark: :blue_book: 42: Use && for a More Concise Conditional
  - :white_check_mark: :blue_book: 43: Return null to Prevent Rendering
  - :white_check_mark: :blue_book: 44: Use a Ternary Expression for Conditional Rendering
  - :white_check_mark: :blue_book: 45: Render Conditionally from Props
  - :white_check_mark: :blue_book: 46: Change Inline CSS Conditionally Based on Component State
  - :white_check_mark: :blue_book: 47: Use Array.map() to Dynamically Render Elements
  - :white_check_mark: :blue_book: 48: Give Sibling Elements a Unique Key Attribute
  - :white_check_mark: :blue_book: 49: Use Array.filter() to Dynamically Filter an Array
  - :white_check_mark: :blue_book: 50: Render React on the Server with renderToString

### Redux Challenges:

- **Basic Redux: Store, Actions, & Reducers**

  - :white_check_mark: :blue_book: 1: Create a Redux Store
  - :white_check_mark: :blue_book: 2: Get the State of the Redux Store
  - :white_check_mark: :blue_book: 3: Define a Redux Action
  - :white_check_mark: :blue_book: 4: Define an Action Creator
  - :white_check_mark: :blue_book: 5: Dispatch an Action Event
  - :white_check_mark: :blue_book: 6: Handle an Action in the Store
  - :white_check_mark: :blue_book: 7: Use a Switch Statement to Handle Multiple Actions
  - :white_check_mark: :blue_book: 8: Use const for Action Types
  - :white_check_mark: :blue_book: 9: Register a Store Listener
  - :white_check_mark: :blue_book: 10: Combine Multiple Reducers
  - :white_check_mark: :blue_book: 11: Send Action Data to the Store
  - :white_check_mark: :blue_book: 12: Use Middleware to Handle Asynchronous Actions *(Async testing... hacked with regex of course)*
  - :white_check_mark: :blue_book: 13: Write a Counter with Redux

- **Enforcing State Immutability**

  - :white_check_mark: :blue_book: 14: Never Mutate State
  - :white_check_mark: :blue_book: 15: Use the Spread Operator on Arrays
  - :white_check_mark: :blue_book: 16: Remove an Item from an Array
  - :white_check_mark: :blue_book: 17: Copy an Object with Object.assign
  - :white_check_mark: :blue_book: 18: Use the ES6 Spread Operator with Objects

### React-Redux Challenges:

- **Use `react-redux` to Manage a List of Messages**

  - :white_check_mark: :blue_book: 1: Getting Started with React Redux
  - :white_check_mark: :blue_book: 2: Manage State Locally First
  - :white_check_mark: :blue_book: 3: Extract State Logic to Redux
  - :white_check_mark: :blue_book: 4: Use Provider to Connect Redux to React
  - :white_check_mark: :blue_book: 5: Map State to Props
  - :white_check_mark: :blue_book: 6: Map Dispatch to Props
  - :white_check_mark: :blue_book: 7: Connect Redux to React
  - :white_check_mark: :blue_book: 8: Connect Redux to the Messages App
  - :white_check_mark: :blue_book: 9: Extract Local State into Redux
  - :white_check_mark: :blue_book: 10: Moving Forward From Here

---

To run this project locally, clone the repository, install the dependencies, and run `npm start`. Now you can view all the finished challenges live in the browser.

This project is running tests against React components, ES6 code, and plain JavaScript which users write directly into an in-browser code editor. To accomplish this we are using the [Babel standalone package](https://github.com/babel/babel-standalone) to transpile JavaScript and the testing library [Enzyme](http://airbnb.io/enzyme/) to conduct tests. At a basic level the tests we're writing for React components generally look like this:

```javascript
assert.strictEqual(shallowRender.type(), 'div', 'The component renders a div element');
```

***

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

***
