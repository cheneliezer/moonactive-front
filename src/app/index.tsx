import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';

import { hot } from 'react-hot-loader';
import classes from './index.module.scss';

import PromotionsPage from './pages/promotions/promotions-page.component';
import { MAIN_ROUTE } from './constants/local-related';


class App extends React.Component<{}> {
    render() {
        return (
            <div className={classes.mainGrid}>
                <div className={classes.body}>
                    <Router>
                        <Switch>
                            <Route exact path={MAIN_ROUTE} component={PromotionsPage} />
                        </Switch>
                    </Router>
                </div>
            </div>
        );
}
}

export default hot(module)(App)
