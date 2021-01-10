import React from "react";
import classes from './text-field.module.scss';

export interface TextFieldProps {
    value: string;
    placeholder?: string;
    onChange: (text: string) => void,
    error?: string;
    type?: string;
}
const TextField: React.SFC<TextFieldProps> = (props: TextFieldProps) => {
    const { value, placeholder, error, type} = props;
    const onChange = (e: any) => {
        props.onChange(e.target.value);
    }
    return (
        <div className={classes.mainGrid}>
            <input 
                type={type}
                className={classes.input} 
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <div className={classes.errorWrapper}>
                {error}
            </div>
        </div>
    )
};

export default TextField;