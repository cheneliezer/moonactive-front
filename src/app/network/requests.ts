import {RequestType} from "app/network/types";
import networkRequest from "app/network/index";
import {Observable} from "rxjs";
import {LOGIN_ROUTE, GET_GRID_ROUTE, SAVE_URL_ROUTE,LOGIN_USING_TOKEN_ROUTE, REGISTER_ROUTE, SERVER_URL} from "app/constants/server-related";
import RegisterDTO from "app/models/dtos/register.dto";
import LoginDTO from "app/models/dtos/login.dto";
import AuthTokenSModel from "app/models/server-models/auth-token.smodel";

export const registerNetworkRequest = (data: RegisterDTO) : Observable<string>  => {
    return networkRequest<string>({
        url: `${SERVER_URL}/${REGISTER_ROUTE}`,
        method: RequestType.POST,
        data
    })
}

export const loginNetworkRequest = (data: LoginDTO) : Observable<AuthTokenSModel>  => {
    return networkRequest<AuthTokenSModel>({
        url: `${SERVER_URL}/${LOGIN_ROUTE}`,
        method: RequestType.POST,
        data
    })
}

export const loginWithTokenRequest = (token: string) : Observable<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${LOGIN_USING_TOKEN_ROUTE}`,
        method: RequestType.POST,
        headers: {
            "x-access-token": token,
        }
    })
}

export const saveUrlRequest = (url: string,token: any) : Observable<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${SAVE_URL_ROUTE}`,
        method: RequestType.POST,
        data: {
            url,
        },
        headers: {
            "authorization": `Bearer ${token}`,
        }
    })
}
export const getGridRequest = (token: any) : Observable<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${GET_GRID_ROUTE}`,
        method: RequestType.GET,
        headers: {
            "authorization": `Bearer ${token}`,
        }
    })
}