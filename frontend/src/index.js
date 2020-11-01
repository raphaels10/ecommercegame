import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createRootReducer from './main/reducers'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import { Provider } from 'react-redux'
import { routerMiddleware} from 'connected-react-router'
import history from './main/history'

export const store = createStore(createRootReducer, applyMiddleware(routerMiddleware(history), multi, thunk))









ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
