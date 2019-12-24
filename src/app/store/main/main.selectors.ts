import {MainState} from "app/store/main/main.types";

export function _getGrid (store: MainState): [] | undefined {
    return store.grid;
}
