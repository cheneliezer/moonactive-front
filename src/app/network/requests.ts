import {RequestType} from "app/network/types";
import networkRequest from "app/network/index";
import {SELECT_BULK_PROMOTIONS, DUPLICATE_PROMOTION, GENERATE_PROMOTIONS, PROMOTIONS_ROUTES, SERVER_URL} from "app/constants/server-related";
import PromotionsResponseSModel from "app/models/server-models/promotionsResponse.smodel";
import { AxiosPromise } from "axios";
import PromotionDTO from "app/models/dtos/promotion.dto";
import PromotionsDTO from "app/models/dtos/promotions.dto";
import PromotionSModel from "app/models/server-models/promotion.smodel";

export const generatePromotionsRequest = () : AxiosPromise<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}/${GENERATE_PROMOTIONS}`,
        method: RequestType.POST,
    })
}

export const getPromotionsRequest = (params: PromotionsDTO) : AxiosPromise<PromotionsResponseSModel>  => {
    return networkRequest<PromotionsResponseSModel>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}`,
        method: RequestType.GET,
        params
    })
}

export const deletePromotionRequest = (id: string) : AxiosPromise<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}/${id}`,
        method: RequestType.DELETE,
    })
}

export const bulkDeletePromotionsRequest = (ids: Array<string>) : AxiosPromise<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}/${SELECT_BULK_PROMOTIONS}`,
        method: RequestType.POST,
        data: {ids}
    })
}
export const duplicatePromotionRequest = (id: string) : AxiosPromise<PromotionSModel>  => {
    return networkRequest<PromotionSModel>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}/${DUPLICATE_PROMOTION}/${id}`,
        method: RequestType.POST,
    })
}

export const editPromotionRequest = (id: string, promotion: PromotionDTO) : AxiosPromise<boolean>  => {
    return networkRequest<boolean>({
        url: `${SERVER_URL}/${PROMOTIONS_ROUTES}/${id}`,
        method: RequestType.PUT,
        data: promotion
    })
}