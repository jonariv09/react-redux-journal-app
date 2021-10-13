import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';

import { onAuthStateChanged } from "firebase/auth";
import { Auth } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes, startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isloggedIn, setIsloggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(Auth, async (user) => {
            if (user) {
                const { uid, displayName } = user;
                dispatch(login(uid, displayName));
                setIsloggedIn(true);
                
                dispatch(startLoadingNotes(uid));

            } else {
                setIsloggedIn(false);
            }

            setChecking(false);
        })
    }, [dispatch])

    if(checking) {
        return (
            <h1> Espere... </h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route
                        path="/auth"
                        component={ AuthRouter }
                    /> */}

                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={isloggedIn}
                    />

                    <PrivateRoute
                        isAuthenticated={isloggedIn}
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
