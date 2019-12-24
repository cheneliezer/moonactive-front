import {combineReducers} from "redux";
import {authReducer} from "./auth/auth.reducer";
import {mainReducer} from "./main/main.reducer";
import {uiReducer} from "./user-interface/user-interface.reducer";
import {AuthState} from "app/store/auth";
import {connectRouter} from "connected-react-router";
import {UserInterfaceState} from "app/store/user-interface";
import {combineEpics} from "redux-observable";
import * as authEpics from './auth/auth.epics'
import * as mainEpics from './main/main.epics'
import { values } from 'lodash';
import { MainState } from "./main";

export const AUTH_STORE = 'AUTH_STORE';
export const UI_STORE = 'UI_STORE';
export const ROUTER_STORE = 'router';
export const MAIN_STORE = "MAIN_STORE";


export interface ApplicationState {
    [ROUTER_STORE]: any,
    [AUTH_STORE]: AuthState,
    [UI_STORE]: UserInterfaceState,
    [MAIN_STORE]: MainState,
}

export const rootEpic = combineEpics(
    ...values(authEpics),
    ...values(mainEpics),
);
export const rootReducer = (history: any) => combineReducers<ApplicationState>({
    [ROUTER_STORE]: connectRouter(history), // history for connected-react-router
    [AUTH_STORE]: authReducer,
    [MAIN_STORE]: mainReducer,
    [UI_STORE]: uiReducer,
});
