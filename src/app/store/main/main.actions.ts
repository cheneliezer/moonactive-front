import { action } from 'typesafe-actions'
import { MainAction } from "./main.types";

export const saveUrl = (url: string) =>
    action(MainAction.SAVE_URL,url);

export const getGridRequest = () =>
    action(MainAction.GET_GRID_REQUEST);
export const getGridSuccess = (grid: any) =>
    action(MainAction.GET_GRID_SUCCESS, grid);