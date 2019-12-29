import {  mergeMap, catchError} from "rxjs/internal/operators";
import {ActionsObservable, Epic, ofType} from "redux-observable";
import {concat, from, of} from "rxjs/index";
import {LoadingKey, setLoadingState} from "app/store/user-interface";
import {registerNetworkRequest} from "app/network/requests";
import {AuthAction, registerError} from "app/store/auth";
import { push } from "connected-react-router";
import { LOGIN_ROUTE } from "app/constants/local-related";

export const registerRequestEpic: Epic = (action$: ActionsObservable<any>) => action$.pipe(
    ofType(AuthAction.REGISTER_REQUEST),
    mergeMap((action) =>
        concat(
            of(setLoadingState(LoadingKey.REGISTER, true)),
            from(registerNetworkRequest(action.payload))
                .pipe(
                    mergeMap(() => (
                                concat(
                                    of(push(LOGIN_ROUTE))
                                )
                            )

                        ),
                        catchError((err: any) => (
                            concat(
                                of(registerError(err.data.errors.errors)))
                        ))
                ),
            of(setLoadingState(LoadingKey.REGISTER, false)),
        )
    ));