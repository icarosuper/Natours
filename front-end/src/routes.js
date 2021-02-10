import {Home} from './pages/home/home'
import {Tours} from './pages/tours/tours'
import {Route, Switch} from 'react-router-dom'
import React from "react";

const Routes = () => {
    return (
            <Switch>
                <Route path='/tours'>
                    <Tours/>
                </Route>
                <Route path='/'>
                    <Home/>
                </Route>
            </Switch>

    );
}

export default Routes;
