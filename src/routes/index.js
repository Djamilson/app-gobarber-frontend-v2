import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Routes';

import SignIn from '~/pages/SignIn';
import SignUpCreate from '~/pages/SignUp/CreateAccount';
import SignUpActive from '~/pages/SignUp/ActiveAccount';

import Token from '~/pages/Token';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Horario from '~/pages/Horario';

import ForgetCodeReset from '~/pages/ForgetPassword/CodeReset';
import ForgetFormEmail from '~/pages/ForgetPassword/FormEmail';
import ForgetNewPassword from '~/pages/ForgetPassword/NewPassword';

import Company from '~/pages/Company';
import CompanyPerfil from '~/pages/CompanyPerfil';
import CadUser from '~/pages/CadUser';
import Financeiro from '~/pages/Financeiro';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/register" component={SignUpCreate} />
    <Route path="/confirmation/:token" component={Token} />

    <Route path="/forgetcodereset/:email" component={ForgetCodeReset} />
    <Route path="/forgetformemail" component={ForgetFormEmail} />
    <Route path="/forgetnewpassword" component={ForgetNewPassword} />

    <Route path="/activeaccount/:email" component={SignUpActive} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/horario" component={Horario} isPrivate />
    <Route path="/company" component={Company} isPrivate />
    <Route path="/caduser" component={CadUser} isPrivate />
    <Route path="/financeiro" component={Financeiro} isPrivate />

    <Route path="/companyPerfil" component={CompanyPerfil} isPrivate />
  </Switch>
);

export default Routes;
