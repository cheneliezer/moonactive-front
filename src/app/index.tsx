import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
//@ts-ignore
import classes from './index.module.scss';

import {ApplicationState} from "app/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import RegisterScreen from './screens/register/register.screen';
import LoginScreen from './screens/login/login.screen';
import UrlsScreen from './screens/urls/urls.screen';
import { MAIN_ROUTE,URLS_DISPLAY_ROUTE,REGISTER_ROUTE, LOGIN_ROUTE } from './constants/local-related';
import { getToken } from './store/auth/auth.public-selectors';
import { loginUsingToken } from './store/auth';
import { ConnectedRouter } from 'connected-react-router';
import urlsDisplayScreen from './screens/urls-display/urls-display.screen';
interface PropsFromState {
    history: any;
    token?: string;
}
interface PropsFromDispatch {
    loginUsingToken: typeof loginUsingToken;
}
type AllProps = PropsFromState & PropsFromDispatch;
class App extends React.Component<AllProps> {
    componentDidMount() {
        let token = sessionStorage.getItem("token");
        if(token) {
            this.props.loginUsingToken(token);
        }
    }
    render() {
        const authRoutes = () => <Switch>
                <Route exact path={`/${REGISTER_ROUTE}`} component={RegisterScreen} />
                <Route exact path={LOGIN_ROUTE} component={LoginScreen} />
            </Switch>
        const mainRoutes = () => <Switch>
            <Route exact path={`/${URLS_DISPLAY_ROUTE}`} component={urlsDisplayScreen} />
            <Route exact path={MAIN_ROUTE} component={UrlsScreen} />
        </Switch>;
        return (
            <div className={classes.mainGrid}>
                <div className={classes.body}>
                <ConnectedRouter history={this.props.history}>
                    {this.props.token ? mainRoutes() : authRoutes()}
                </ConnectedRouter>
                </div>
            </div>
        );
}
}

const mapStateToProps = (state: ApplicationState) => ({
    token: getToken(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loginUsingToken: (token: string) => dispatch(loginUsingToken(token)),
});

export default connect(mapStateToProps,mapDispatchToProps)(hot(module)(App));
