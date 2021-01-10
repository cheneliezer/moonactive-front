import PromotionSModel from "./promotion.smodel";

export default interface PromotionsResponseSModel {
    total: number;
    promotions: Array<PromotionSModel>;
}