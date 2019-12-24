import {ApplicationState, UI_STORE} from "app/store";
import {_getErrorState, _getLoadingState} from "app/store/user-interface/user-interface.selectors";
import {ErrorKey, LoadingKey} from "app/store/user-interface/user-interface.types";

export function getLoadingState(store: ApplicationState, key: LoadingKey): boolean {
    return _getLoadingState(store[UI_STORE], key);
}

export function getErrorState(store: ApplicationState, key: ErrorKey): boolean {
    return _getErrorState(store[UI_STORE], key);
}
