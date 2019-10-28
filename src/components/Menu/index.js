import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container, Time } from './styles';

export default function Menu({ profile }) {
  const [group, setGroup] = useState(false);
  const [admin, setAdmin] = useState(false);


  useMemo(() => {

    const load = () => {
        profile.group_users.forEach(g => {
          if (g.Group.name === 'role_master') setGroup(true);
          if (g.Group.name === 'role_administrador') setAdmin(true);
        });
    };

    load();
  }, [profile]);

  function menuDinamico() {
    return (
      <ul>
        {group !== true ? (
          <Time>
            <Link to="/horario">Horário</Link>
          </Time>
        ) : null}

        {admin === true ? (
          <Time>
            <Link to="/caduser">Usuário</Link>
          </Time>
        ) : null}
        {admin === true ? (
          <Time>
            <Link to="/financeiro">Financeiro</Link>
          </Time>
        ) : null}

        {admin === true ? (
          <Time>
            <Link to="/companyPerfil">Empresa</Link>
          </Time>
        ) : null}

        {group === true ? (
          <Time>
            <Link to="/company">Empresa</Link>
          </Time>
        ) : null}
      </ul>
    );
  }

  return <Container>{menuDinamico()}</Container>;
}

Menu.propTypes = {
  profile: PropTypes.object.isRequired,
};

Menu.defaultProps = {
  profile: '',
};
