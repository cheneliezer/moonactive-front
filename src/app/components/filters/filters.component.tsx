import * as React from "react";
//@ts-ignore
import classes from './filters.module.scss';
import {FilterItem} from "app/components/filters/filters.types";
import Filter from "app/components/filters/filter/filter.component";
interface Props {
    filters: Array<FilterItem>;
    activeFilterId: string | null;
    searchValue: string;
    placeholder: string;
    onSearchValueChanged : (newValue: string) => void;
    onFilterClicked: (filterId: string) => void;
}
const Filters : React.SFC<Props> = (props: Props) => {
    const onSearchChanged = (e: any) => {
        props.onSearchValueChanged(e.target.value)
    };
    return (
        <div className={classes.mainGrid}>

            <div className={classes.searchGrid}>
                <input
                    placeholder={props.placeholder}
                    onChange={onSearchChanged}
                    value={props.searchValue}
                    className={classes.search}
                />
            </div>
            <div className={classes.filtersGrid}>
                 <span className={classes.sortTitle}>
                        Sort (Alphabetic) :
                    </span>
                <div className={classes.filters}>
                    {
                        props.filters.map((filter: FilterItem) => (
                            <div onClick={() => props.onFilterClicked(filter.value)} key={filter.value}  className={classes.filterWrapper}>
                                <Filter isActive={filter.value === props.activeFilterId} filter={filter}/>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
};

export default Filters;