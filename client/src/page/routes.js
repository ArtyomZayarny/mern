import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import LinksPage from './LinksPage';
import CreatePage from './CreatePage';
import DetailsPage from './DetailsPage';
import AuthPage from './AuthPage';

export const useRoutes = isAuthentificated => {
    if (isAuthentificated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/details:id" exact>
                    <DetailsPage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Redirect to="/create" />

            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )

    }
}