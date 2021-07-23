import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

function ProfessionalRoute({ component: Component, isLoggedIn, isProfessional, ...rest }) {
  
	return <Route {...rest} render={props => (!isProfessional ? <Component {...props} /> : <Redirect to="/home" />)} />;
}

export default withAuth(ProfessionalRoute);
