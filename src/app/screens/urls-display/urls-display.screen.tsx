import * as React from "react";
//@ts-ignore
import classes from './urls-display.module.scss';
import {ApplicationState} from "app/store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Card from "app/components/card/card.component";
import SavedUrlVM from "app/models/vms/saved-url.vm";
import { getGrid } from "app/store/main/main.public-selectors";
import { getGridRequest } from "app/store/main";

interface PropsFromDispatch {
    getGrid: typeof getGridRequest;
}
interface PropsFromState {
    grid: any;
}

interface Props {

}
interface State {
    url: string;
}

type AllProps = Props & PropsFromDispatch & PropsFromState & RouteComponentProps;
class UrlsDisplayScreen extends React.Component<AllProps, State> {
    state = {
        url: ""
    }
    componentDidMount() {
        this.props.getGrid();
    }
    
    render() {
      
        return (
            <div className={classes.mainGrid}>
                {
                    this.props.grid.map((urlData: SavedUrlVM) => (
                        <Card key={urlData.createdAt.toLocaleString()} className={classes.card}>
                            <div className={classes.textWrapper}>
                                Saved at : {urlData.createdAt.toLocaleString()}
                            </div>
                            <div className={classes.urlWrapper}>
                                <a target="_blank" href={urlData.url} >
                                    {urlData.url}
                                </a>
                            </div>
                    </Card>
                    ))
                }

               
            </div>
        );

    }
}

const mapStateToProps = (state: ApplicationState, props: AllProps) => {
    return {
        grid: getGrid(state)
    }

};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getGrid: () => dispatch(getGridRequest())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UrlsDisplayScreen));