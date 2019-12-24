//@ts-ignore
import classes from './field.module.scss';
import * as React from "react";
interface Props {
    title: string;
    description: string;
}
const Field: React.SFC<Props> = (props: Props) => {
    return (
        <div className={classes.mainGrid}>
            <div className={classes.titleGrid}>
                {
                    props.title
                }
            </div>
            <div className={classes.descriptionGrid}>
                {
                    props.description
                }
            </div>
        </div>
    )
};

export default Field;