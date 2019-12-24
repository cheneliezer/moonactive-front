import {ApplicationState, AUTH_STORE} from "app/store";
import * as AuthSelectors from './auth.selectors';
import FieldErrorSModel from "app/models/server-models/field-error.smodel";

export function getToken(store: ApplicationState): string | undefined {
    return AuthSelectors._getToken(store[AUTH_STORE])
}
export function getRegisterErrors(store: ApplicationState): FieldErrorSModel[] {
    return AuthSelectors._getRegisterErrors(store[AUTH_STORE])
}
