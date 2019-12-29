import {AuthState} from "app/store/auth/auth.types";
import FieldErrorVM from "app/models/vms/field-error.vm";

export function _getToken (store: AuthState): string | undefined {
    return store.token;
}

export function _getRegisterErrors (store: AuthState): FieldErrorVM[] {
    return store.registerErrors;
}