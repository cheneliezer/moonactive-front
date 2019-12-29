import {ErrorKey, LoadingKey, UserInterfaceState} from "app/store/user-interface/user-interface.types";

export function _getLoadingState(store: UserInterfaceState, key: LoadingKey): boolean {
    return store.loading[key];
}
export function _getErrorState(store: UserInterfaceState, key: ErrorKey): string {
    return store.errors[key];
}