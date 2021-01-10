import { PromotionType } from "../enums/promotion-type.enum";

export default interface PromotionVM {
    id: string;
    type: PromotionType;
    name: string;
    startDate: string;
    endDate: string;
    userGroupName: string;
}