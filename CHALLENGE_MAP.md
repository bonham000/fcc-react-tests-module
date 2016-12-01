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

- **Props & Conditional Rendering**
  - :pencil2: 13: Pass a string to a component using JSX functional component (Peter)
  - :pencil2: 14: Access props using `this.props`, passing a string to a React Component (Peter)
  - :pencil2: 15: Pass an array to a component using JSX (Peter)
  - :pencil2: 16: Set the default props using the defaultProps static component property (Sean)
  - :pencil2: 17: Define your component's shape with propTypes (Sean)
  - :pencil2: 18: Pass props to a child component from a parent (Sean)
  - :pencil2: 19: Functional Stateless Components

- **State**
  - Define the initial state within the component's constructor
  - Display state with `this.state`
  - Update state with `setState` with click
  - OnChange handlers: controlled input box
  - Passing methods as props

- **Component Lifecycle Hooks**
  - Conditionally render elements from a component
  - componentWillMount
  - Ajax data with componentDidMount
  - Everybody cleanup with componentWillUnmount
  - Update state with componentWillReceiveProps
  - Prevent re-render with shouldComponentUpdate
  - child lifecycle order 

- **Advanced Rendering**
  - Conditional rendering based on props
  - Uses JavaScript in render & return of React Component
  - Map, filter, reduce
  - Inline CSS (Peter)

- **Rendering, node style**
  - render server side with renderToString

---

###Redux Challenges:###

- **Actions**
  - Must have a type
  - Action emitted by user interaction
  - Example of Action payload as a JS object
- **Reducers**
  - Using `Object.assign
  - Switch statement to parse relevant action
  - `(state, action) => state`, must not modify `state`
  - Reducers can rollback state
- **Store**
  - Source of truth for all application state
  - Combine various root level reducers with `combineReducer()`
  - Access state with `getState()`
  - Update state with `dispatch(action)`
  - Register listener via `subscribe(listener)
  - Unregister listener
- **One Way Data Flow**
  - Dispatching action with `store.dispatch(action)`
  - Reducer provides the next state
  - Store combines all root level reducers
  - Store saves a snapshot of application state
- **Advanced section: Async [TODO]**

---

###React-Redux Challenges:###

- **Connect Redux with React views**
  - Import React-Redux and setup provider
- **Connect `stateful` components to Redux**
  - Connect from `react-redux`
  - `mapStateToProps`
  - `mapDispatchToProps`
  - `bindActionCreators`
  - Dispatch an action
- **Add more action**
  - Create `CHECK_GROCERY_ITEM` action
  - Create `REMOVE_GROCERY_ITEM` action
  - Create `EDIT_GROCERY_ITEM" action

**Do we want to add react-router challenges?** 