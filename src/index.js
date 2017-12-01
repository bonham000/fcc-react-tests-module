/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'

// import DevApp from './DevApp'
import App from './App'

// import all CSS
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}
