import NetworkRequest from "app/network/types";
import {default as Axios, AxiosRequestConfig, AxiosPromise} from "axios";

function networkRequest<T>(networkRequest: NetworkRequest) : AxiosPromise<T>   {
        const axiosConfig: AxiosRequestConfig = {
            method: networkRequest.method,
            url: networkRequest.url,
            headers: networkRequest.headers,
            data: networkRequest.data,
            params: networkRequest.params
        };
        return Axios.request(axiosConfig);

}

export default networkRequest;
