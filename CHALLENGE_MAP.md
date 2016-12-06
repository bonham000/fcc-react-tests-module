#Challenge Map:#

- :white_check_mark: Challenge is QA'd and ready to ship
- :blue_book: Challenge has been proofread and is ready for QA
- :pencil: Challenge is fully written
- :pencil2: Challenge needs to be written

---

###React Challenges:###

- **JSX and simple rendering**

  - :blue_book: 1: Create a simple JSX element
  - :blue_book: 2: Render more complex JSX
  - :blue_book: 3: Add Comments in JSX (*may need to revise test for comment*)
  - :blue_book: 4: Render an HTML element to the DOM from JSX
  - :blue_book: 5: Add HTML classes to JSX elements with className
  - :blue_book: 6: Learn about self-closing JSX tags

- **Introducing React/Components**

  introduce JavaScript syntax in React/JSX here

  - :blue_book: 7: Create a simple functional component that renders HTML (also intro => syntax for this?)
  - :blue_book: 8: Create a component with ES6 class syntax
  - :blue_book: 9: Create a new element with composition
  - :blue_book: 10: Render nested components with composition
  - :blue_book: 11: Compose React Components
  - :blue_book: 12: Render a class component to the DOM
  - :blue_book: 13: Pulling it all together: Write a React Component from scratch and render it to the DOM

- **Props & Conditional Rendering**

  - :blue_book: 14: Pass a string to a component using JSX functional component (Peter)
  - :pencil2: 15: Access props using `this.props`, passing a string to a React Component (Peter)
  - :pencil2: 16: Pass an array to a component using JSX (Peter)
  - :blue_book: 17: Set the default props using the defaultProps static component property
  - :blue_book: 18: Override defaultProps *(cannot check `defaultProps` on child)*
  - :blue_book: 19: Define Component propTypes *(regex `.includes` test for `propTypes`)*
  - :blue_book: 20: Functional Stateless React Components *(regex `.includes` test for `propTypes`)*

- **State**

  - :pencil2: 21: Define the initial state within the component's constructor (Jason)
  - :blue_book: 22: Display state with `this.state`
  - :blue_book: 23: Another way to display state with `this.state` in render
  - :blue_book: 24: Use `this.setState` on a button click & `bind(this)`
  - :blue_book: 25: Use `bind` to bind `this` to a class method
  - :blue_book: 26: Use `this.setState` with a fat arrow function
  - :blue_book: 27: Write a method that toggles a state value 'on' and 'off'
  - :blue_book: 28: Write a simple counter using `this.setState`
  - :blue_book: 29: `OnChange` handlers: create a controlled input box
  - :blue_book: 30: More complex example: Controlled form with submit button
  - :blue_book: 31: Pass `state` to child as props: Unidirectional data flow
  - :blue_book: 32: Passing methods as callbacks to children: child is stateless

- **Component Lifecycle Hooks**

  - :blue_book: 33: `componentWillMount`
  - :blue_book: 34: Ajax data with `componentDidMount`
  - :blue_book: 35: Add event listeners in `componentDidMount` *(is the explanation correct?)*
  - :blue_book: 36: Managing updates with `componentWillReceiveProps` and `componentDidUpdate`
  - :blue_book: 37: Prevent re-render with `shouldComponentUpdate`

- **Advanced Rendering**

  - :pencil2: 38: Advanced JavaScript in `render` & `return` of React Component (Peter)
  - :pencil: 39: Conditional rendering: `if/else` in `render` method
  - :pencil: 40: Conditional rendering: `&&`
  - :pencil: 41: Prevent a component from rendering with `null`
  - :pencil2: 42: Conditional rendering: ternary condition (Peter)
  - :pencil2: 43: Conditional rendering based on `props`(Peter)
  - :pencil2: 44: Use `map` to dynamically render an array of data (Peter)
  - :pencil: 45: Use `filter` to dynamically filter an array of data
  - :pencil: 46: Inline CSS 1
  - :pencil: 47: Inline CSS 2
  - :pencil2: 48: JSX Gotchas: Key difference in attribute names, etc (Peter)
  - :pencil: 49: Server side rendering with `renderToString`

---

###Redux Challenges:###

- **Basic Redux: Store, Actions, & Reducers**

  - :blue_book: 1: Create a Redux Store
  - :blue_book: 2: Access state with `getState()`
  - :blue_book: 3: Define an `action`
  - :blue_book: 4: Define an `action creator`
  - :blue_book: 5: Dispatch an action with `store.dispatch(action)`
  - :blue_book: 6: Update store in response to dispatched action
  - :blue_book: 7: Use a `switch` statement to handle multiple actions
  - :blue_book: 8: Refactor to use `const` for action types
  - :blue_book: 9: Register a store listener with `store.subscribe(listener)`
  - :blue_book: 10: Combine various reducers with `combineReducer()`
  - :blue_book: 11: Passing action data to the store
  - :blue_book: 12: Dispatching async actions in action creators *(Async testing... hacked with regex of course)*
  - :blue_book: 13: Pulling it all together: write a counter with Redux

- **Enforcing State Immutability**

  - :blue_book: 14: Never mutate state
  - :blue_book: 15: Using the spread operator on arrays
  - :blue_book: 16: Remove an object from an array
  - :blue_book: 17: Using `Object.assign` for objects
  - :blue_book: 18: ES6 spread operator for objects

---

###React-Redux Challenges:###

- **Use `react-redux` to Manage a List of Messages**

  - :blue_book: 1: Getting started with React-Redux
  - :blue_book: 2: Create a controlled input and a submit button on a form which updates an array in local `state`
  - :blue_book: 3: Create a Redux store and actions that can lift this `state` out of the React component
  - :blue_book: 4: Use `Provider` to wrap our React Component so it can connect to Redux
  - :blue_book: 5: Write `mapStateToProps`
  - :blue_book: 6: Write `mapDispatchToProps`
  - :blue_book: 7: Introduce `connect`
  - :blue_book: 8: Use `connect` to connect `state` and `dispatch` to React
  - :blue_book: 9: Refactor local state out of our React Component and replace with Redux
  - :blue_book: 10: Review and Moving Forward


