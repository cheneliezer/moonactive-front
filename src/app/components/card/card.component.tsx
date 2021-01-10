import React from "react";
import classes from './card.module.scss';
import classNames from 'classnames';
interface Props {
    children: React.ReactNode;
    className?: string;
}

const Card: React.SFC<Props> = (props: Props) => (
    <div className={classNames(classes.mainGrid, props.className)} >
        {props.children}
    </div>);

export default Card;