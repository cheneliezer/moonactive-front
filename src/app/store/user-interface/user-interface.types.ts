export const enum UserInterfaceAction {
    SET_LOADING_STATE = '@@ui/SET_LOADING_STATE',
    SET_ERROR_STATE = '@@ui/SET_ERROR_STATE',
}
export const enum LoadingKey {
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    SAVE_URL = "SAVE_URL",
    GRID = "GRID"
}

export const enum ErrorKey {
    REGISTER = "REGISTER",
    LOGIN = "LOGIN",
    SAVE_URL = "SAVE_URL",
    GRID = "GRID"
}

export interface UserInterfaceState {
    loading: {[key: string] : boolean}
    errors: {[key: string] : string}
}