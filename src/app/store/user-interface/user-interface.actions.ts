import { action } from 'typesafe-actions'
import {ErrorKey, LoadingKey, UserInterfaceAction} from "app/store/user-interface/user-interface.types";

export const setLoadingState = (key: LoadingKey, status: boolean) =>
    action(UserInterfaceAction.SET_LOADING_STATE, {key, status});
/**
 * Call this action when you got an error in your epics, and you want to save it, so your components will be able
 * to retrieve this later and react.
 */
export const setErrorState = (key: ErrorKey, status: string) =>
    action(UserInterfaceAction.SET_ERROR_STATE, {key, status});