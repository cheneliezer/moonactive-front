import {  mergeMap, catchError} from "rxjs/internal/operators";
import {ActionsObservable, Epic, ofType} from "redux-observable";
import {concat, from, of} from "rxjs";
import {LoadingKey, setLoadingState} from "app/store/user-interface";
import { saveUrlRequest} from "app/network/requests";
import { push } from "connected-react-router";
import { URLS_DISPLAY_ROUTE } from "app/constants/local-related";
import { MainAction } from "../main.types";
import { AUTH_STORE } from 'app/store'

export const saveUrlRequestEpic: Epic = (action$: ActionsObservable<any>,state) => action$.pipe(
    ofType(MainAction.SAVE_URL),
    mergeMap((action) =>
        concat(
            of(setLoadingState(LoadingKey.SAVE_URL, true)),
            //@ts-ignore
            from(saveUrlRequest(action.payload,state.value[AUTH_STORE].token))
                .pipe(
                    mergeMap((payload: boolean) =>  (
                                concat(
                                    of(push(URLS_DISPLAY_ROUTE))
                                )
                            ) 

                        ),
                        catchError((err: any) => (
                            of(push(URLS_DISPLAY_ROUTE))
                            ))
                ),
            of(setLoadingState(LoadingKey.SAVE_URL, false)),
        )
    ));