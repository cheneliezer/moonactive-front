import * as React from "react";
//@ts-ignore
import classes from './urls.module.scss';
import {ApplicationState} from "app/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Card from "app/components/card/card.component";
import TextField from "app/components/text-field/text-field.component";
import PrimaryButton from "app/components/primary-button/primary-button.component";
import { saveUrl } from "app/store/main/main.actions";
import { getLoadingState } from "app/store/user-interface/user-interface.public-selectors";
import { LoadingKey } from "app/store/user-interface";
import { validateUrl } from "app/utils";

interface PropsFromDispatch {
    saveUrl: typeof saveUrl;
}
interface PropsFromState {
    loading: boolean;
}

interface Props {

}
interface State {
    url: string;
    error: string;
}

type AllProps = Props & PropsFromDispatch & PropsFromState & RouteComponentProps;
class UrlsScreen extends React.Component<AllProps, State> {
    state = {
        url: "",
        error: "",
    }
    onUrlChanged = (url: string) => {
        this.setState({url})
    }
    onSubmitUrl = () => {
        if(validateUrl(this.state.url)) {
            this.props.saveUrl(this.state.url)
        } else {
            this.setState({error: "Not a valid URL"})
        }
    }
    render() {

        return (
            <div className={classes.mainGrid}>

                <Card className={classes.card}>
                    <div className={classes.textWrapper}>
                        Enter a url
                    </div>
                    <div className={classes.textfieldWrapper}>
                        <TextField
                            placeholder={"Url"}
                            value={this.state.url}
                            error={this.state.error}
                            onChange={this.onUrlChanged} 
                        />
                    </div>

                        <div className={classes.buttonWrapper}>
                            <PrimaryButton
                                text={"Save"}
                                loading={this.props.loading}
                                onClick={this.onSubmitUrl}
                            />
                        </div>
                </Card>
            </div>
        );

    }
}

const mapStateToProps = (state: ApplicationState, props: AllProps) => {
    return {
        loading: getLoadingState(state, LoadingKey.SAVE_URL)
    }

};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveUrl: (url: string) => dispatch(saveUrl(url))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UrlsScreen));