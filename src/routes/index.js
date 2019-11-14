import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Routes';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Token from '~/pages/Token';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Horario from '~/pages/Horario';
import RecuperarPassword from '~/pages/Recuperarpassword';
import NovoPassword from '~/pages/NovoPassword';
import Company from '~/pages/Company';
import CompanyPerfil from '~/pages/CompanyPerfil';
import CadUser from '~/pages/CadUser';
import Financeiro from '~/pages/Financeiro';

import AtivaContaMobil from '~/pages/AtivaContaMobil';

const Routes = () => (
<Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/register" component={SignUp} />
    <Route path="/recuperarpassword" component={RecuperarPassword} />
    <Route path="/novopassword/:token" component={NovoPassword} />

    <Route path="/confirmation/:token" component={Token} />

    <Route path="/ativacontamobil/:token" component={AtivaContaMobil} />

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
