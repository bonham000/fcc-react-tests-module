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
  - :pencil2: 6: Learn about self-closing JSX tags
- **Introducing React/Components**
  - Create a simple functional component that renders HTML
  - Render this simple component to the DOM
  - Create a component with ES6 class syntax
  - Add a CSS class with the className property
  - Add inline styles
  - Create Nested HTML (just more complex HTML from a component)
  - Create a new element with composition
  - Render a class component to the DOM
- **Props**
  - Pass a string to a component using JSX
  - Access props using `this.props`
  - Pass an array to a component using JSX
  - Set the default props using the defaultProps static component property
  - Define your component's shape with propTypes
  - Pass props to a child component from a parent
- **State**
  - Define the initial state within the component's constructor
  - Display state with `this.state`
  - Render conditionally based on values in component state
  - Update state with `setState`
- **Component Lifecycle Hooks?**
  - Conditionally render elements from a component
  - componentWillMount
  - Ajax data with componentDidMount
  - Everybody cleanup with componentWillUnmount
  - Update state with componentWillReceiveProps
  - Prevent re-render with shouldComponentUpdate
  - child lifecycle order 
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

- **Creating `stateless` components**
  - Create `GroceryForm` component
  - Create `GroceryList` component
- **Creating `statefull` components**
  - A `GroceryPage` component, that renders both the aforementioned components
  - Render `GroceryPage`
- **Be careful about `this`**
  - Create `onChange
  - `bind` the context `this` to both functions
- **Passing `props` down**
  - Passing down `onChange
  - Passing down a list 
  - Validate `props` with `React.PropTypes`

#the above are more specific to React ^^^#

- **Creating Actions**
  - Create a JS module for `actions`
  - Create `addGrocery` action
- **Creating Reducers**
  - Create root level reducer `GroceryReducer`
  - Import all root level reducers to a single file
- **Creating `store`**
  - Setup `store`
  - Initiate `store` with default ES6 syntax
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
