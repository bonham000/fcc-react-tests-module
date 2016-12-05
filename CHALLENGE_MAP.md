#Challenge Map:#

- :white_check_mark: Challenge is fully written and QA'd 
- :pencil: Challenge is written but needs QA 
- :pencil2: Challenge needs to be written

---

###React Challenges:###

- **JSX and simple rendering**
  - :pencil: 1: Create a simple JSX element
  - :pencil: 2: Render more complex JSX (explain that several elements must be enclosed)
  - :pencil: 3: Add Comments in JSX (*may need to revise test for comment*)
  - :pencil: 4: Render an HTML element to the DOM from JSX
  - :pencil: 5: Add HTML classes to JSX elements with className
  - :pencil: 6: Learn about self-closing JSX tags

- **Introducing React/Components**
  - :pencil: 7: Create a simple functional component that renders HTML (also intro => syntax for this?)
  - :pencil: 8: Create a component with ES6 class syntax
  - :pencil: 9: Create a new element with composition
  - :pencil: 10: Render nested components with composition
  - :pencil: 11: Compose React Components
  - :pencil: 12: Render a class component to the DOM
  - :pencil: 13: Pulling it all together: Write a React Component from scratch and render it to the DOM

- **Props & Conditional Rendering**
  - :pencil: 14: Pass a string to a component using JSX functional component (Peter)
  - :pencil2: 15: Access props using `this.props`, passing a string to a React Component (Peter)
  - :pencil2: 16: Pass an array to a component using JSX (Peter)
  - :pencil: 17: Set the default props using the defaultProps static component property
  - :pencil: 18: Override defaultProps *(cannot check `defaultProps` on child)*
  - :pencil: 19: Define Component propTypes *(regex `.includes` test for `propTypes`)*
  - :pencil: 20: Functional Stateless React Components *(regex `.includes` test for `propTypes`)*

- **State**
  - :pencil2: 21: Define the initial state within the component's constructor (Jason)
  - :pencil: 22: Display state with `this.state`
  - :pencil: 23: Another way to display state with `this.state` in render
  - :pencil: 24: Use `this.setState` on a button click & `bind(this)`
  - :pencil: 25: Use `bind` to bind `this` to a class method
  - :pencil: 26: Use `this.setState` with a fat arrow function
  - :pencil: 27: Write a method that toggles a state value 'on' and 'off'
  - :pencil: 28: Write a simple counter using `this.setState`
  - :pencil: 29: `OnChange` handlers: create a controlled input box
  - :pencil: 30: More complex example: Controlled form with submit button
  - :pencil: 31: Pass `state` to child as props: Unidirectional data flow
  - :pencil: 32: Passing methods as callbacks to children: child is stateless

- **Component Lifecycle Hooks**
  - :pencil: 33: `componentWillMount`
  - :pencil: 34: Ajax data with `componentDidMount`
  - :pencil: 35: Add event listeners in `componentDidMount` *(is the explanation correct?)*
  - :pencil: 36: Managing updates with `componentWillReceiveProps` and `componentDidUpdate`
  - :pencil: 37: Prevent re-render with `shouldComponentUpdate` — *(note on Virtual DOM?)*

- **Advanced Rendering**
  - :pencil2: Conditional rendering based on `props`(Peter)
  - :pencil2: Conditional rendering: `&&` for `if/else` condition 
  - :pencil2: Conditional rendering: ternary condition (Peter)
  - :pencil2: Write JavaScript in `render` & `return` of React Component (Peter)
  - :pencil2: Use `map` to dynamically render an array of data (Peter)
  - :pencil2: Use `filter` to dynamically filter an array of data
  - :pencil2: Use `reduce` for something cool
  - :pencil2: Prevent a component from rendering with `null`
  - :pencil: Inline CSS 1
  - :pencil: Inline CSS 2
  - :pencil: JSX Gotchas: Key difference in attribute names, etc.

- **Rendering, node style**
  - :pencil2: Server side rendering with `renderToString`

---

###Redux Challenges:###

- **Basic Redux: Store, Actions, & Reducers**
  - :pencil: 1: Create a Redux Store
  - :pencil: 2: Access state with `getState()`
  - :pencil: 3: Define an `action`
  - :pencil: 4: Define an `action creator`
  - :pencil: 5: Dispatch an action with `store.dispatch(action)`
  - :pencil: 6: Update store in response to dispatched action
  - :pencil: 7: Use a `switch` statement to handle multiple actions
  - :pencil: 8: Refactor to use `const` for action types
  - :pencil: 9: Register a store listener with `store.subscribe(listener)`
  - :pencil: 10: Combine various reducers with `combineReducer()`
  - :pencil: 11: Passing action data to the store
  - :pencil: 12: Dispatching async actions in action creators *(Async testing... hacked with regex of course)*
  - :pencil: 13: Pulling it all together: write a counter with Redux

- **Enforcing State Immutability**
  - :pencil: 14: Never mutate state
  - :pencil: 15: Using the spread operator on arrays
  - :pencil: 16: Remove an object from an array
  - :pencil: 17: Using `Object.assign` for objects
  - :pencil: 18: ES6 spread operator for objects

---

###React-Redux Challenges:###

- **Use `react-redux` to Manage a List of Messages**

  - :pencil: 1: Getting started with React-Redux
  - :pencil: 2: Create a controlled input and a submit button on a form which updates an array in local `state`
  - :pencil: 3: Create a Redux store and actions that can lift this `state` out of the React component
  - :pencil: 4: Use `Provider` to wrap our React Component so it can connect to Redux
  - :pencil: 5: Write `mapStateToProps`
  - :pencil: 6: Write `mapDispatchToProps`
  - :pencil: 7: Introduce `connect`
  - :pencil: 8: Use `connect` to connect `state` and `dispatch` to React
  - :pencil: 9: Refactor local state out of our React Component and replace with Redux
  - :pencil: 10: Review and Moving Forward


