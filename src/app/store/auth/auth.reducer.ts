import {Reducer} from "redux";
import initialState from "./auth.state";
import {AuthAction, AuthState} from "app/store/auth/auth.types";
import FieldErrorSModel from "app/models/server-models/field-error.smodel";
import { mapFieldTypeToName } from "app/utils";
import FieldErrorVM from "app/models/vms/field-error.vm";

const reducer: Reducer<AuthState> = (state: AuthState = initialState, action) => {
    switch (action.type) {
        case AuthAction.LOGIN_SUCCESS:
            sessionStorage.setItem("token",action.payload.token);
            return {...state, token: action.payload.token};
        case AuthAction.INIT:
                return {...state, token: sessionStorage.getItem("token")};
        case AuthAction.REGISTER_ERROR:
            let errors : FieldErrorSModel[] = action.payload;
            let errorsVm: FieldErrorVM[] = errors.map((error: FieldErrorSModel) => { return {
                field: error.field[0],
                message: error.messages[0].replace(
                    `"${error.field[0]}"`,
                     mapFieldTypeToName[error.field[0]]),
                }});
            return {...state, registerErrors: errorsVm}
        case AuthAction.REMOVE_TOKEN:
            sessionStorage.removeItem("token");
            return {...state, token: undefined}
        default:
            return state
    }
};

export { reducer as authReducer }