import { PromotionType } from "../enums/promotion-type.enum";

export default interface PromotionSModel {
    id: string;
    type: PromotionType;
    name: string;
    startDate: Date;
    endDate: Date;
    userGroupName: string;
}