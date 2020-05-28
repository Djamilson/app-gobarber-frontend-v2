import React from 'react';

import { FaSignOutAlt } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Menu from '~/components/Menu';
import Notifications from '~/components/Notifications';
import logo from '~/assets/logo-purple.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, Badge } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <Menu profile={profile} />

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar !== null
                  ? `${profile.avatar.url}-xs`
                  : 'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Não tem Avatar"
            />
          </Profile>
          <Badge onClick={handleSignOut} title="Sair">
            {' '}
            <FaSignOutAlt color="#7159c1" size={28} />{' '}
          </Badge>
        </aside>
      </Content>
    </Container>
  );
}
