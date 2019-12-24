import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, {history}  from 'app/store/config/index';
import App from './app';
import './assets/index.css';
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router';

// prepare store
const store = configureStore();

ReactDOM.render(
<Provider store={store}>
              
                                                {/*
              // @ts-ignore */}
                <App history={history}/>



  </Provider>
    //@ts-ignore
,
  document.getElementById('root')
);
