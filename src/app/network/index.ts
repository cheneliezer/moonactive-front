import NetworkRequest from "app/network/types";
import {Observable, Observer} from "rxjs";
import {default as Axios, AxiosRequestConfig, AxiosResponse} from "axios";

function networkRequest<T>(networkRequest: NetworkRequest) : Observable<T>  {
    return Observable.create(async (observer:Observer<T>)=> {
        try{
            const axiosConfig: AxiosRequestConfig = {
                method: networkRequest.method,
                url: networkRequest.url,
                headers: networkRequest.headers,
                data: networkRequest.data,
            };
            const axiosResponse: AxiosResponse = await Axios.request(axiosConfig);

            observer.next( axiosResponse.data);
            observer.complete();
        } catch (err) {
            const errResponse = err.response;

            observer.error(errResponse);
            observer.complete();
        }
    });
}

export default networkRequest;
