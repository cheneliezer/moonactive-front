import {AuthState} from "app/store/auth/auth.types";
import FieldErrorSModel from "app/models/server-models/field-error.smodel";

export function _getToken (store: AuthState): string | undefined {
    return store.token;
}

export function _getRegisterErrors (store: AuthState): FieldErrorSModel[] {
    return store.registerErrors;
}