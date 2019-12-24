import FieldErrorVM from "app/models/vms/field-error.vm";

export const enum AuthAction {
    REGISTER_REQUEST = '@@auth/REGISTER_REQUEST',
    REGISTER_ERROR = '@@auth/REGISTER_ERROR',
    LOGIN_REQUEST = '@@auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = "@@auth/LOGIN_SUCCESS",
    INIT = '@auth/INIT',
    LOGIN_USING_TOKEN_REQUEST =  "@@auth/LOGIN_USING_TOKEN_REQUEST",
    REMOVE_TOKEN =  "@@auth/REMOVE_TOKEN",
    
}

export interface AuthState {
    token?: string;
    registerErrors: FieldErrorVM[];

}