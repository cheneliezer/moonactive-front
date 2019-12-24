import {Reducer} from "redux";
import initialState from "./main.state";
import { MainAction, MainState } from "./main.types";

const reducer: Reducer<MainState> = (state: MainState = initialState, action) => {
    switch (action.type) {
        case MainAction.GET_GRID_SUCCESS:
            return {...state, grid: action.payload.urlsGrid};
    
        default:
            return state
    }
};

export { reducer as mainReducer }