#Challenge Map:#

- :white_check_mark: Challenge is fully written and QA'd 
- :pencil: Challenge is written but needs QA 
- :pencil2: Challenge needs to be written

---

###React Challenges:###

- **JSX and simple rendering**
  - :pencil: 1: Create a simple JSX element
  - :pencil: 2: Render more complex JSX
  - :pencil: 3: Add Comments in JSX (*may need to revise test for comment*)
  - :pencil: 4: Render an HTML element to the DOM from JSX
  - :pencil: 5: Add HTML classes to JSX elements with className
  - :pencil: 6: Learn about self-closing JSX tags

- **Introducing React/Components**
  - :pencil: 7: Create a simple functional component that renders HTML
  - :pencil: 8: Create a component with ES6 class syntax
  - :pencil: 9: Create a new element with composition
  - :pencil: 10: Render nested components with composition
  - :pencil: 11: Compose React Components
  - :pencil2: 12: [Render a class component to the DOM](https://github.com/FreeCodeCamp/CurriculumExpansion/issues/2#issuecomment-238180483) (Peter)
  - :pencil2: *13(?): Pulling it all together: Write a React Component from scratch and render it to the DOM*

- **Props & Conditional Rendering**
  - :pencil2: 13: Pass a string to a component using JSX functional component (Peter)
  - :pencil2: 14: Access props using `this.props`, passing a string to a React Component (Peter)
  - :pencil2: 15: Pass an array to a component using JSX (Peter)
  - :pencil: 16: Set the default props using the defaultProps static component property
  - :pencil: 17: Override defaultProps *(cannot check `defaultProps` on child)*
  - :pencil: 18: Define Component propTypes *(regex `.includes` test for `propTypes`)*
  - :pencil: 19: Functional Stateless React Components *(regex `.includes` test for `propTypes`)*

- **State**
  - :pencil2: Define the initial state within the component's constructor (Jason)
  - :pencil2: Display state with `this.state`
  - :pencil2: `this`
  - :pencil2: Update state with `setState` with click: simple counter
  - :pencil2: `OnChange` handlers: controlled input box
  - :pencil2: More complex example: Controlled form with submit button
  - :pencil2: Pass `state` to child as props: Unidirectional data flow
  - :pencil2: Passing methods as callbacks to children: child is stateless

- **Component Lifecycle Hooks**
  - :pencil2: `componentWillMount`
  - :pencil2: Ajax data with `componentDidMount`
  - :pencil2: Everybody cleanup with `componentWillUnmount`
  - :pencil2: Update state with `componentWillReceiveProps`
  - :pencil2: Prevent re-render with `shouldComponentUpdate`
  - :pencil2: component lifecycle order

- **Advanced Rendering**
  - :pencil2: Conditional rendering based on props
  - :pencil2: Conditional rendering based on state (button click toggle's element)
  - :pencil2: Write JavaScript in render & return of React Component
  - :pencil2: Use map to dynamically render an array of data
  - :pencil2: Use filter to dynamically filter an array of data
  - :pencil2: Use reduce for something cool
  - :pencil2: Prevent a component from rendering with `null`
  - :pencil2: Incline CSS comment challenge (Peter)
  - :pencil2: Inline CSS (Peter)

- **Rendering, node style**
  - :pencil2: Server side rendering with `renderToString`

---

###Redux Challenges:###

- **Actions**
  - Must have a type
  - Action emitted by user interaction
  - Example of Action payload as a JS object

- **Reducers**
  - Using `Object.assign`
  - Switch statement to parse relevant action
  - `(state, action) => state`, must not modify `state`
  - Reducers can rollback state

- **Store**
  - Source of truth for all application state
  - Combine various root level reducers with `combineReducer()`
  - Access state with `getState()`
  - Update state with `dispatch(action)`
  - Register listener via `subscribe(listener)`
  - Unregister listener

- **One Way Data Flow**
  - Dispatching action with `store.dispatch(action)`
  - Reducer provides the next state
  - Store combines all root level reducers
  - Store saves a snapshot of application state

- **Advanced section: Async [TODO] w/ `redux-thunk` Middleware (?)**

---

###React-Redux Challenges:###

- **Connect Redux with React views**
  - Import React-Redux and setup `Provider`

- **Connect `stateful` components to Redux**
  - `connect` method from `react-redux`
  - Render Redux state in React with `mapStateToProps`
  - Map dispatch actions to React with `mapDispatchToProps`
  - Use `bindActionCreators` to map dispatch actions
  - Dispatch a Redux action from a React Component

- **Add more actions (?) /// simple to-do or counter application with Redux (?)**
  - Create `CHECK_GROCERY_ITEM` action
  - Create `REMOVE_GROCERY_ITEM` action
  - Create `EDIT_GROCERY_ITEM` action

**Do we want to add react-router challenges?** 