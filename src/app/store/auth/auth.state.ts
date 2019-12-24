// define initial state
import {AuthState} from "app/store/auth/auth.types";

const initialState: AuthState = {
    token: undefined,
    registerErrors: [],
};

export default initialState;