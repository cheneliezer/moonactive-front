import React from "react";
import TextField, { TextFieldProps } from "../text-field/text-field.component";
import classes from './field.module.scss';

interface Props {
    label: string;
    textfieldProps: TextFieldProps;
}
const Field: React.SFC<Props> = (props: Props) => {
    const { label, textfieldProps} = props;

    return (
        <div className={classes.mainGrid}>
            <div className={classes.labelGrid}>
                {label}
            </div>
            <div className={classes.inputGrid}>
                <TextField {...textfieldProps}/>   
            </div>

        </div>
    )
};

export default Field;