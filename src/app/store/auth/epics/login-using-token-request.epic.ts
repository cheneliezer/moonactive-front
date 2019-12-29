import {  mergeMap, catchError} from "rxjs/internal/operators";
import {ActionsObservable, Epic, ofType} from "redux-observable";
import {concat, from, of} from "rxjs/index";
import {LoadingKey, setLoadingState} from "app/store/user-interface";
import {loginWithTokenRequest} from "app/network/requests";
import {AuthAction, init} from "app/store/auth";

export const loginUsingTokenRequestEpic: Epic = (action$: ActionsObservable<any>) => action$.pipe(
    ofType(AuthAction.LOGIN_USING_TOKEN_REQUEST),
    mergeMap((action) =>
        concat(
            of(setLoadingState(LoadingKey.LOGIN, true)),
            from(loginWithTokenRequest(action.payload as string))
                .pipe(
                    mergeMap(() => (
                                concat(
                                    of(init())
                                )
                            )

                        ),
                        catchError((err: any) => (
                            concat(
                                of(setLoadingState(LoadingKey.REGISTER, false)),
                                )
                ))),
            of(setLoadingState(LoadingKey.LOGIN, false)),
        )
    ));