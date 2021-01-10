import React from "react";
import classes from './action-menu.module.scss';
import classNames from 'classnames';
interface Props {
    children: React.ReactNode;
    open: boolean;
}

const ActionMenu: React.SFC<Props> = ({children, open}: Props) => (
    <div className={classNames(classes.wrapper, {[classes.open] : open})} >
        {children}
    </div>);

export default ActionMenu;