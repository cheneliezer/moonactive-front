import React from 'react';
import classes from './promotion-type-view.module.scss'
import { PromotionType } from 'app/models/enums/promotion-type.enum';
import epicImg from 'app/images/epic.png'
import commonImg from 'app/images/common.png'
import basicImg from 'app/images/basic.png'
import classNames from 'classnames';

interface Props {
    type: PromotionType;
    selected?: boolean;
    active?: boolean;
    onClick?: {() : void }
}
const PromotionTypeView = ({ type, onClick, selected, active } : Props) => {
    const getPromotionImage = () => {
        let img;
        switch(type) {          
            case PromotionType.BASIC:
                img = basicImg;
                break;
            case PromotionType.COMMON:
                img = commonImg;
                break;
            case PromotionType.EPIC:
                img = epicImg;
                break;
            default: 
                img = basicImg;
                break;
        }
        return img;
    }
    const mapPromotionTypeToName = {
        [PromotionType.BASIC]: "Basic",
        [PromotionType.COMMON]: "Common",
        [PromotionType.EPIC]: "Epic",
    }
    return (
        <div onClick={onClick} className={classNames(classes.wrapper, {[classes.active]: active}, {[classes.selected]: selected})}>
            <img src={getPromotionImage()} className={classes.img}/>
            <div className={classes.name}>
                {mapPromotionTypeToName[type]}
            </div>
        </div>
    );
  };

  export default PromotionTypeView