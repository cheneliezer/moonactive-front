import React from 'react';
import emptyStateImg from '../../images/empty-state.png'
import classes from './empty-state.module.scss';

const EmptyState = () => {
    return (
        <div className={classes.emptyStateWrapper}>
            <img src={emptyStateImg} className={classes.emptyStateImage}/>
            <div className={classes.textWrapper}>
                <div className={classes.title}>
                    Oh no!
                </div>
                <div className={classes.description}>
                    There are no promotions. Would you like to generate some ?
                </div>
            </div>
        </div>
    )
}

export default EmptyState
