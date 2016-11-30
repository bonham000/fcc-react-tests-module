#Challenge Map:#

***

##React Challenges:##

- [X] JSX
  - [X] [Create a simple JSX element](#issuecomment-238135268)
  - [X] [Create a new element with composition](#issuecomment-238143914)
  - [X] [Add a CSS class with the className property](#issuecomment-238145731)
  - [X] [Create an element using React.createElement (demonstrates jsx turns into plain javascript)](#issuecomment-238147429)
  - [X] [Add Comments in JSX](#issuecomment-238210327)
- [X] Rendering
  - [X] [Render an HTML element to the DOM](#issuecomment-238177483)
  - [X] [Render a component to the DOM](#issuecomment-238180483)
- [x] Components
  - [x] Create a functional component
  - [x] [Create a component using the class syntax](#issuecomment-250054509)
  - [x] [Render a pair of divs from a component](#issuecomment-250425977)
- [ ] Props
  - [X] [Pass a string to a component using JSX](#issuecomment-238207750)
  - [X] [Access props using `this.props`](#issuecomment-238252893)
  - [ ] Pass an array to a component using JSX
  - [ ] Pass an array to a component using React.createElement
  - [ ] Set the default props using the defaultProps static component property
  - [ ] Define your components shape with propTypes
- [x] State
  - [x] [Define the initial state within the components constructor](https://github.com/FreeCodeCamp/CurriculumExpansion/issues/2#issuecomment-244791594)
    - [x] Display state with `this.state`
  - [x] [Update state with `setState`](https://github.com/FreeCodeCamp/CurriculumExpansion/issues/2#issuecomment-244792972)
- [ ] Components, again?
  - [ ] Conditionally render elements from a component
  - [ ] componentWillMount (todo)
  - [ ] Ajax data with componentDidMount
  - [ ] Everybody cleanup with componentWillUnmount
  - [ ] Update state with componentWillReceiveProps
  - [ ] Prevent re-render with shouldComponentUpdate
  - [ ] child lifecycle order (todo)
- [ ] Rendering, node style
  - [ ] render server side with renderToString

---

##Redux Challenges:##

- [ ] Actions
  - [ ] Must have a type
  - [ ] Action emitted by user interaction
  - [ ] Example of Action payload as a JS object
- [ ] Reducers
  - [ ] Using `Object.assign()`
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

##React-Redux Challenges:##

- [X] Creating `stateless` components
  - [X] [Create `GroceryForm` component](#issuecomment-240343507)
  - [X] [Create `GroceryList` component](#issuecomment-240346282)
- [X] Creating `statefull` components
  - [X] [A `GroceryPage` component, that renders both the aforementioned components](#issuecomment-240351063)
  - [X] [Render `GroceryPage`](#issuecomment-240354031)
- [X] Be careful about `this`
  - [X] [Create `onChange()` and `onSubmit()` functions](#issuecomment-240361211)
  - [X] [`bind` the context `this` to both functions](#issuecomment-242973440)
- [ ] Passing `props` down
  - [X] [Passing down `onChange()` and `onSubmit()` to `GroceryForm` from](#issuecomment-242975772)
  - [X] [Passing down a list (array) to `GroceryList`](#issuecomment-242977322)
  - [ ] Validate `props` with `React.PropTypes`
- [ ] Creating Actions
  - [ ] Create a JS module for `actions`
  - [ ] Create `addGrocery` action
- [ ] Creating Reducers
  - [ ] Create root level reducer `GroceryReducer`
  - [ ] Import all root level reducers to a single file
- [ ] Creating `store`
  - [ ] Setup `store`
  - [ ] Initiate `store` with default (use ES6 default parameters)
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
