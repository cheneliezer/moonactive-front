import React from "react";
import classNames from 'classnames';
import checkImg from 'app/images/check.png'
import classes from './checkbox.module.scss';

interface Props {
    onClicked: { (): void }
    checked: boolean;
}

const Checkbox: React.SFC<Props> = ({onClicked, checked}: Props) => (
    <div onClick={onClicked} className={classNames(classes.wrapper, {[classes.checked] : checked})} >
        {
            checked && <img src={checkImg} className={classes.checkImg}/>
        }
    </div>);

export default Checkbox;