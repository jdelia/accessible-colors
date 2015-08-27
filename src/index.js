import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appReducer from 'reducers/app';
import App from 'App/App';

let store, debugPanel;

if (__DEVTOOLS__) {
  const { compose } = require('redux');
  const { devTools } = require('redux-devtools');
  const { DebugPanel, DevTools } = require('redux-devtools/lib/react');
  const DiffMonitor = require('redux-devtools-diff-monitor');

  store = compose(applyMiddleware(thunk), devTools(), createStore)(appReducer);

  debugPanel = (
    <DebugPanel top left bottom>
      <DevTools store={store} monitor={DiffMonitor} />
    </DebugPanel>
  );
} else {
  store = compose(applyMiddleware(thunk), createStore)(appReducer);
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    {debugPanel}
  </div>,
  document.getElementById('accessible-colors')
);
