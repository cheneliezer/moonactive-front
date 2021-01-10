import React, { useState } from 'react';
import PromotionVM from 'app/models/vms/promotion.vm';
import Field from 'app/components/field/field.component';
import Dialog from 'app/components/dialog/dialog.component';
import classes from './promotion-edit-dialog.module.scss'
import PromotionTypeView from '../promotion-type-view/promotion-type-view.component';
import { PromotionType } from 'app/models/enums/promotion-type.enum';

interface Props {
    promotion: PromotionVM;
    onClose: { () : void };
    onDone: { (newPromotion: PromotionVM) : void };
    visible: boolean;
    loading?: boolean;
}
const PromotionEditDialog = ({ visible, promotion, onClose, onDone, loading } : Props) => {
    const [editedPromotion, setEditedPromotion] = useState<PromotionVM>(promotion)
    const nameChanged = (name: string) => {
        setEditedPromotion({...editedPromotion, name})
    }
    const userGroupNameChanged = (userGroupName: string) => {
        setEditedPromotion({...editedPromotion, userGroupName})
    }
    const typeChanged = (type: PromotionType) => {
        setEditedPromotion({...editedPromotion, type})
    }
    const handleConfirm = () => {
        onDone(editedPromotion)
    }
    return (
        <Dialog loading={loading} title={"Edit Promotion"} className={classes.dialog} visible={visible} confirmButtonText="Update" closeButtonText="Cancel" onConfirm={handleConfirm} onClose={onClose}>
            <div className={classes.forms}>
                <Field label={"Name"} textfieldProps={{value: editedPromotion.name, onChange: nameChanged}} />
                <Field label={"User Group Name"} textfieldProps={{value: editedPromotion.userGroupName, onChange: userGroupNameChanged}} />
                <div>
                    <div className={classes.labelGrid}>
                        Type
                    </div>
                    <div>
                        <div className={classes.typeWrapper}>
                            <PromotionTypeView onClick={() => typeChanged(PromotionType.BASIC)} active type={PromotionType.BASIC} selected={PromotionType.BASIC === editedPromotion.type} />
                        </div>
                        <div className={classes.typeWrapper}>
                            <PromotionTypeView onClick={() => typeChanged(PromotionType.COMMON)} active type={PromotionType.COMMON} selected={PromotionType.COMMON === editedPromotion.type} />
                        </div>
                        <div className={classes.typeWrapper}>
                            <PromotionTypeView onClick={() => typeChanged(PromotionType.EPIC)} active type={PromotionType.EPIC} selected={PromotionType.EPIC === editedPromotion.type} />
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
  };

  export default PromotionEditDialog