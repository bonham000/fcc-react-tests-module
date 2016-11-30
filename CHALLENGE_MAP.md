#Challenge Map:#

[x] Challenge are fully written and QA'd :pencil: :white_check_mark:
[] Challenges are written but need to be QA'd :pencil:
[] challenges need to be written

**React Challenges:**

- [X] JSX
  - [X] [Create a simple JSX element]
  - [X] [Create a new element with composition]
  - [X] [Add a CSS class with the className property]
  - [X] [Create an element using React.createElement 
  - [X] [Add Comments in JSX]
- [X] Rendering
  - [X] [Render an HTML element to the DOM]
  - [X] [Render a component to the DOM]
- [x] Components
  - [x] Create a functional component
  - [x] [Create a component using the class syntax]
  - [x] [Render a pair of divs from a component]
- [ ] Props
  - [X] [Pass a string to a component using JSX]
  - [X] [Access props using `this.props`]
  - [ ] Pass an array to a component using JSX
  - [ ] Pass an array to a component using React.createElement
  - [ ] Set the default props using the defaultProps static component property
  - [ ] Define your components shape with propTypes
- [x] State
  - [x] [Define the initial state within the components constructor]
    - [x] Display state with `this.state`
  - [x] [Update state with `setState`]
- [ ] Components, again?
  - [ ] Conditionally render elements from a component
  - [ ] componentWillMount 
  - [ ] Ajax data with componentDidMount
  - [ ] Everybody cleanup with componentWillUnmount
  - [ ] Update state with componentWillReceiveProps
  - [ ] Prevent re-render with shouldComponentUpdate
  - [ ] child lifecycle order 
- [ ] Rendering, node style
  - [ ] render server side with renderToString

---

**Redux Challenges:**

- [ ] Actions
  - [ ] Must have a type
  - [ ] Action emitted by user interaction
  - [ ] Example of Action payload as a JS object
- [ ] Reducers
  - [ ] Using `Object.assign
  - [ ] Switch statement to parse relevant action
  - [ ] `(state, action) => state`, must not modify `state`
  - [ ] Reducers can rollback state
- [ ] Store
  - [ ] Source of truth for all application state
  - [ ] Combine various root level reducers with `combineReducer()`
  - [ ] Access state with `getState()`
  - [ ] Update state with `dispatch(action)`
  - [ ] Register listener via `subscribe(listener)
  - [ ] Unregister listener
- [ ] One Way Data Flow
  - [ ] Dispatching action with `store.dispatch(action)`
  - [ ] Reducer provides the next state
  - [ ] Store combines all root level reducers
  - [ ] Store saves a snapshot of application state
- Advanced section: Async [TODO]

---

**React-Redux Challenges:**

- [X] Creating `stateless` components
  - [X] [Create `GroceryForm` component]
  - [X] [Create `GroceryList` component]
- [X] Creating `statefull` components
  - [X] [A `GroceryPage` component, that renders both the aforementioned components]
  - [X] [Render `GroceryPage`]
- [X] Be careful about `this`
  - [X] [Create `onChange
  - [X] [`bind` the context `this` to both functions]
- [ ] Passing `props` down
  - [X] [Passing down `onChange
  - [X] [Passing down a list 
  - [ ] Validate `props` with `React.PropTypes`
- [ ] Creating Actions
  - [ ] Create a JS module for `actions`
  - [ ] Create `addGrocery` action
- [ ] Creating Reducers
  - [ ] Create root level reducer `GroceryReducer`
  - [ ] Import all root level reducers to a single file
- [ ] Creating `store`
  - [ ] Setup `store`
  - [ ] Initiate `store` with default ES6 syntax
- [ ] Connect Redux with React views
  - [ ] Import React-Redux and setup provider
- [ ] Connect `stateful` components to Redux
  - [ ] Connect from `react-redux`
  - [ ] `mapStateToProps`
  - [ ] `mapDispatchToProps`
  - [ ] `bindActionCreators`
  - [ ] Dispatch an action
- [ ] Add more action
  - [ ] Create `CHECK_GROCERY_ITEM` action
  - [ ] Create `REMOVE_GROCERY_ITEM` action
  - [ ] Create `EDIT_GROCERY_ITEM" action
