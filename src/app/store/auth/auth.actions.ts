import {AuthAction} from "app/store/auth/auth.types";
import { action } from 'typesafe-actions'
import RegisterDTO from "app/models/dtos/register.dto";
import LoginDTO from "app/models/dtos/login.dto";
import AuthTokenSModel from "app/models/server-models/auth-token.smodel";
import FieldErrorSModel from "app/models/server-models/field-error.smodel";
export const removeToken = () =>
    action(AuthAction.REMOVE_TOKEN);
    export const loginUsingToken = (token: string) =>
    action(AuthAction.LOGIN_USING_TOKEN_REQUEST,token);
export const register = (data: RegisterDTO) =>
    action(AuthAction.REGISTER_REQUEST,data);
export const registerError = (data: FieldErrorSModel) =>
    action(AuthAction.REGISTER_ERROR, data);
export const loginRequest = (data: LoginDTO) =>
    action(AuthAction.LOGIN_REQUEST,data);
    export const init = () =>
    action(AuthAction.INIT);
export const loginSuccess = (response: AuthTokenSModel) =>
    action(AuthAction.LOGIN_SUCCESS, response);