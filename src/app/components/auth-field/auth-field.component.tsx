//@ts-ignore
import classes from './auth-field.module.scss';
import * as React from "react";
import TextField, { TextFieldProps } from "../text-field/text-field.component";

interface Props {
    label: string;
    textfieldProps: TextFieldProps;
}
const AuthField: React.SFC<Props> = (props: Props) => {
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

export default AuthField;