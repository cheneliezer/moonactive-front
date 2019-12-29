import * as React from "react";
//@ts-ignore
import classes from './login.module.scss';
import {ApplicationState} from "app/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AuthField from "app/components/auth-field/auth-field.component";
import Card from "app/components/card/card.component";
import { loginRequest } from 'app/store/auth/auth.actions';

import PrimaryButton from "app/components/primary-button/primary-button.component";
import { Link } from "react-router-dom";
import { REGISTER_ROUTE } from "app/constants/local-related";
import LoginDTO from "app/models/dtos/login.dto";
import { LoadingKey, ErrorKey } from "app/store/user-interface";
import { getLoadingState, getErrorState } from "app/store/user-interface/user-interface.public-selectors";
interface PropsFromDispatch {
    login: typeof loginRequest;
}
interface PropsFromState {
    loading: boolean;
    error: string ;
}

interface Props {

}
interface State {
    email: string;
    password: string;
}

type AllProps = Props & PropsFromDispatch & PropsFromState & RouteComponentProps;
class LoginScreen extends React.Component<AllProps, State> {
    state = {
        email: "",
        password: "",
    }
    onLogin = () => {
        const { email, password } = this.state;
        this.props.login({email,password});

    }
    onEmailChanged = (email: string) => {
        this.setState({email});
    }
    onPasswordChanged = (password: string) => {
        this.setState({password});
    }
    render() {
        const { email, password } = this.state;
        const { loading,error } = this.props;
        return (
            <div className={classes.mainGrid}>
                <Card className={classes.card}>
                    <div className={classes.authFieldWrapper}>
                        <AuthField 
                            label={"Your email"}
                            textfieldProps={{
                                    value: email,
                                    onChange: this.onEmailChanged,
                                    placeholder: "Email"
                                }}
                        />
                    </div>
                    <div className={classes.authFieldWrapper}>
                        <AuthField 
                            label={"Password"}
                            textfieldProps={{
                                    value: password,
                                    type:"password",
                                    onChange: this.onPasswordChanged,
                                    placeholder: "Password"
                                }}
                        />
                    </div>
                    <div className={classes.errorLine}>
                        {error}
                    </div>
                    <div className={classes.buttonWrapper}>
                        <PrimaryButton
                            loading={loading}
                            onClick={this.onLogin}
                            text={"Login"}
                        />
                     </div>
                     <div className={classes.registerWrapper}>
                        <Link to={REGISTER_ROUTE} className={classes.link}>
                            Register
                        </Link>
                        <span>
                            for a new account
                        </span>
                    </div>
                </Card>
              

            </div>
        );

    }
}


const mapStateToProps = (state: ApplicationState, props: AllProps) => {
    return {
        loading: getLoadingState(state,LoadingKey.LOGIN),
        error: getErrorState(state, ErrorKey.LOGIN)
    }

};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (data: LoginDTO) => dispatch(loginRequest(data)),
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginScreen));