import React from "react";
import classNames from 'classnames';
import classes from './primary-button.module.scss';

interface Props {
    text: React.ReactNode;
    variant?: 'empty' | 'filled'
    onClick: () => void;
    className?: string;
    loading?: boolean;
}

const PrimaryButton: React.SFC<Props> = ({text, variant, onClick , className, loading }: Props) => (
    <button onClick={onClick} className={classNames(classes.mainGrid, {[classes.empty]: variant === 'empty'}, className)} >
        { loading ? <div className={classes.spinner} />  : text}
    </button>);

export default PrimaryButton;