import * as React from "react";
//@ts-ignore
import classes from './register.module.scss';
import {ApplicationState} from "app/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AuthField from "app/components/auth-field/auth-field.component";
import Card from "app/components/card/card.component";
import PrimaryButton from "app/components/primary-button/primary-button.component";
import RegisterDTO from "app/models/dtos/register.dto";
import { register } from 'app/store/auth/auth.actions';
import { getLoadingState } from "app/store/user-interface/user-interface.public-selectors";
import { LoadingKey } from "app/store/user-interface";
import { getRegisterErrors } from "app/store/auth/auth.public-selectors";
import FieldErrorVM from "app/models/vms/field-error.vm";
import { FieldType } from "app/models/server-models/field-type.enum";
interface PropsFromDispatch {
    register: typeof register;
}
interface PropsFromState {
    loading: boolean;
    errors: FieldErrorVM[];
}

interface Props {

}
interface State {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

type AllProps = Props & PropsFromDispatch & PropsFromState & RouteComponentProps;
class RegisterScreen extends React.Component<AllProps, State> {
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }
    onRegister = () => {
        const { email, password, firstName, lastName } = this.state;
       this.props.register({ email, password, firstName, lastName })
    }
    onBack = () => {
        this.props.history.goBack();
    }
    onEmailChanged = (email: string) => {
        this.setState({email});
    }
    onPasswordChanged = (password: string) => {
        this.setState({password});
    }
    onFirstNameChanged = (firstName: string) => {
        this.setState({firstName});
    }
    onLastNameChanged = (lastName: string) => {
        this.setState({lastName});
    }
    render() {
        const { email, password, firstName, lastName } = this.state;
        const { loading, errors } = this.props;
        let emailError : FieldErrorVM | undefined = errors.find((error: FieldErrorVM) => error.field === FieldType.EMAIL);
        let firstNameError : FieldErrorVM | undefined = errors.find((error: FieldErrorVM) => error.field === FieldType.FIRST_NAME);
        let lastNameError : FieldErrorVM | undefined = errors.find((error: FieldErrorVM) => error.field === FieldType.LAST_NAME);
        let passwordError : FieldErrorVM | undefined = errors.find((error: FieldErrorVM) => error.field === FieldType.PASSWORD);

        return (
            <div className={classes.mainGrid}>
                <Card className={classes.card}>
                    <div className={classes.authFieldWrapper}>
                        <AuthField 
                            label={"Your email"}
                            textfieldProps={{
                                    value: email,
                                    onChange: this.onEmailChanged,
                                    placeholder: "Email",
                                    error: emailError ? emailError.message : undefined,
                                }}
                        />
                    </div>
                    <div className={classes.doubleAuthFieldWrapper}>
                        <div className={classes.authFieldWrapper}>
                            <AuthField 
                                label={"First Name"}
                                textfieldProps={{
                                        value: firstName,
                                        onChange: this.onFirstNameChanged,
                                        placeholder: "First Name",
                                        error: firstNameError ? firstNameError.message : undefined,
                                    }}
                            />
                        </div>
                        <div className={classes.authFieldWrapper}>
                            <AuthField 
                                    label={"Last Name"}
                                    textfieldProps={{
                                            value: lastName,
                                            onChange: this.onLastNameChanged,
                                            placeholder: "Last Name",
                                            error: lastNameError ? lastNameError.message : undefined,

                                        }}
                                />
                        </div>
                    </div>
                    <div className={classes.authFieldWrapper}>
                        <AuthField 
                            label={"Password"}
                            textfieldProps={{
                                    value: password,
                                    type:"password",
                                    onChange: this.onPasswordChanged,
                                    placeholder: "Password",
                                    error: passwordError ? passwordError.message : undefined,
                                }}
                        />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <PrimaryButton 
                            loading={loading}
                            onClick={this.onRegister}
                            text={"Get started"}
                        />
                     </div>
                </Card>
              

            </div>
        );

    }
}

const mapStateToProps = (state: ApplicationState, props: AllProps) => {
    return {
        loading: getLoadingState(state,LoadingKey.REGISTER),
        errors: getRegisterErrors(state),
    }
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    register: (data: RegisterDTO) => dispatch(register(data)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RegisterScreen));