import {ApplicationState, AUTH_STORE} from "app/store";
import * as AuthSelectors from './auth.selectors';
import FieldErrorVM from "app/models/vms/field-error.vm";

export function getToken(store: ApplicationState): string | undefined {
    return AuthSelectors._getToken(store[AUTH_STORE])
}
export function getRegisterErrors(store: ApplicationState): FieldErrorVM[] {
    return AuthSelectors._getRegisterErrors(store[AUTH_STORE])
}
