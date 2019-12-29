import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, {history}  from 'app/store/config/index';
import App from './app';
import './assets/index.css';

// prepare store
const store = configureStore();
ReactDOM.render(
<Provider store={store}>
     {/*
              // @ts-ignore */}
                <App history={history}/>
  </Provider>
,
  document.getElementById('root')
);
