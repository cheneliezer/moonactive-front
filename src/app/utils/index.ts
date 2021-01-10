import PromotionSModel from "app/models/server-models/promotion.smodel"
import PromotionVM from "app/models/vms/promotion.vm"

export const createPromotionsVM = (promotions: Array<PromotionSModel>) : Array<PromotionVM> => promotions.map(createPromotionVM)

export const createPromotionVM = ( ({id, name, type, startDate, endDate, userGroupName} : PromotionSModel) => (
    {
        id,
        name,
        type,
        startDate: new Date(startDate).toLocaleDateString(),
        endDate: new Date(endDate).toLocaleDateString(),
        userGroupName,
    }
))