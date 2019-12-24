import {Reducer} from "redux";
import {UserInterfaceAction, UserInterfaceState} from "app/store/user-interface/user-interface.types";
import initialState from "app/store/user-interface/user-interface.state";

const reducer: Reducer<UserInterfaceState> = (state: UserInterfaceState = initialState, action) => {
    switch (action.type) {
        case UserInterfaceAction.SET_LOADING_STATE:
            const loading = {...state.loading};
            loading[action.payload.key] = action.payload.status;
            return { ...state, loading };
        case UserInterfaceAction.SET_ERROR_STATE:
            const errors = {...state.errors};
            errors[action.payload.key] = action.payload.status;
            return { ...state, errors };
        default:
            return state
    }
};

export { reducer as uiReducer }