import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

function HomeRoute({ component: Component, isLoggedIn, ...rest }) {
	return <Route {...rest} render={props => (isLoggedIn ? <Component {...props} rest={rest} /> : <Redirect to="/login" />)} />;
}

export default withAuth(HomeRoute);