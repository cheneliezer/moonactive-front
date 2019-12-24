import {  mergeMap, catchError} from "rxjs/internal/operators";
import {ActionsObservable, Epic, ofType} from "redux-observable";
import {concat, from, of} from "rxjs/index";
import {LoadingKey, setLoadingState, setErrorState, ErrorKey} from "app/store/user-interface";
import {loginNetworkRequest} from "app/network/requests";
import {AuthAction} from "app/store/auth";
import { loginSuccess } from "../auth.actions";
import { push } from "connected-react-router";
import { MAIN_ROUTE } from "app/constants/local-related";
import AuthTokenSModel from "app/models/server-models/auth-token.smodel";

export const loginRequestEpic: Epic = (action$: ActionsObservable<any>) => action$.pipe(
    ofType(AuthAction.LOGIN_REQUEST),
    mergeMap((action) =>
        concat(
            of(setLoadingState(LoadingKey.LOGIN, true)),
            from(loginNetworkRequest(action.payload))
                .pipe(
                    mergeMap((payload: AuthTokenSModel) =>  (
                                concat(
                                    of(loginSuccess(payload)),
                                    of(push(MAIN_ROUTE))
                                )
                            ) 

                        ),
                        catchError((err: any) => (
                            of(setErrorState(ErrorKey.LOGIN, err.data.message))
                        ))
                ),
            of(setLoadingState(LoadingKey.LOGIN, false)),
        )
    ));