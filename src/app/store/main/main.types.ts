
export const enum MainAction {
    SAVE_URL =  "@@main/SAVE_URL",
    GET_GRID_REQUEST =  "@@main/GET_GRID_REQUEST",
    GET_GRID_SUCCESS =  "@@main/GET_GRID_SUCCESS",
}

export interface MainState {
    grid?: [];

}