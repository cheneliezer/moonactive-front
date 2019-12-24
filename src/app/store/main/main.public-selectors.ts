import {ApplicationState, MAIN_STORE} from "app/store";
import * as MainSelectors from './main.selectors';

export function getGrid(store: ApplicationState): [] | undefined {
    return MainSelectors._getGrid(store[MAIN_STORE])
}
