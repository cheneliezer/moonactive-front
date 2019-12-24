import {FilterItem} from "app/components/filters/filters.types";
import classNames from 'classnames';
//@ts-ignore
import classes from './filter.module.scss';
import * as React from "react";
interface Props {
    filter: FilterItem
    isActive: boolean;
}
const Filter: React.SFC<Props> = (props: Props) => {
    return (
        <div className={classNames(classes.mainGrid, props.isActive && classes.active)}>
            <span className={classes.textGrid}>
                {
                    props.filter.name
                }
            </span>
        </div>
    )
};

export default Filter;