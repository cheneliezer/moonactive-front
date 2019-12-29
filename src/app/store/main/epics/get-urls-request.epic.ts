import {  mergeMap, catchError} from "rxjs/internal/operators";
import {ActionsObservable, Epic, ofType, } from "redux-observable";
import {concat, from, of, } from "rxjs";
import {LoadingKey, setLoadingState, setErrorState, ErrorKey} from "app/store/user-interface";
import { MainAction } from "../main.types";
import { AUTH_STORE } from 'app/store'
import { getGridSuccess } from "../main.actions";
import { getGridRequest } from "app/network/requests";

export const getUrlsRequestEpic: Epic = (action$: ActionsObservable<any>,state) => action$.pipe(
    ofType(MainAction.GET_GRID_REQUEST),
    mergeMap((action) =>
        concat(
            of(setLoadingState(LoadingKey.GRID, true)),
            //@ts-ignore
            from(getGridRequest(state.value[AUTH_STORE].token))
                .pipe(
                    mergeMap((payload: any) =>  (
                                concat(
                                    of(getGridSuccess(payload))
                                )
                            ) 

                        ),
                        catchError((err: any) => (
                            of(setErrorState(ErrorKey.GRID, "Error getting your data"))
                            ))
                ),
            of(setLoadingState(LoadingKey.GRID, false)),
        )
    ));