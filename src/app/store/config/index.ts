import {applyMiddleware, createStore, Store} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "redux-devtools-extension";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import {ApplicationState, rootReducer, rootEpic} from "app/store";
export const history = createBrowserHistory()

/**
 * create Browser history for connected-react-router
 * NOTE! it is also imported at index.tsx file as a props of ConnectedRouter Provider
 */

let allReducers = rootReducer(history);

const reducer = (state: any, action: any): ApplicationState => {

    return allReducers(state, action);
};

export default function configureStore(): Store<ApplicationState> {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({});
    // create the redux-observable middleware
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(
            routerMiddleware(history),
            
            epicMiddleware
        ))
    );

    epicMiddleware.run(rootEpic);

    return store;
}