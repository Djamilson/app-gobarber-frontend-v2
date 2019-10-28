import React, { useState, useEffect } from 'react';

import { Form, Input} from '@rocketseat/unform';
import { Link, Redirect } from 'react-router-dom';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import logo from '~/assets/logo.svg';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  password: Yup.string().min(1).required('Senha obrigatória'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')], 'Senhas são diferentes!') : field),
});

export default function NovoPassword({ match }) {
  const [success, setSuccess] = useState(false);

  const { token } = match.params;

  async function loadToken() {
    await api
      .get(`validatetoken/${token}`)
      .then(() => {})
      .catch(err => {
        const { stack } = err;
        const finall = stack.split('status code ')[1].substring(0, 3);

        if (finall === '400') {
          toast.error(
            'Esse token não existe, gere novo token, em esqueceu a senha!'
          );
        }

        if (finall === '401') {
          toast.error('Token expirado, gere novo token, em esqueceu a senha!');
        }

        if (finall === '402') {
          toast.error('Token já foi usado, gere novo token, em esqueceu a senha!');
        }

        if (finall === '403') {
          toast.warning('Token expirado, gere novo token, em esqueceu a senha!');
        }

        setSuccess(true);
      });
  }

  useEffect(() => {
    loadToken();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(data) {
    await api
      .post(`/novopassword`, { data, token })
      .then(() => {
        setSuccess(true);
        toast.success(
          `Senha redefinida com sucesso, já pode acessar sua conta!`
        );
      })
      .catch(err => {
        const { stack } = err;
        const finall = stack.split('status code ')[1].substring(0, 3);

        if (finall === '400') {
          toast.error('As senhas estão diferentes!');
        }

        if (finall === '401' || finall === '403') {
          toast.warning(
            'Não foi possível encontra um usuário, crie sua conta!'
          );
        }
      });
    }

  if (success) {
    return <Redirect to="/horario" />;
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <span> Cadastre uma nova senha! </span>
      </Content>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirma senha"
        />

        <button type="submit">Salvar nova senha</button>
        <div>
          <Link to="/">Já tenho conta</Link>
        </div>
      </Form>
    </Container>
  );
}

NovoPassword.propTypes = {
  match: PropTypes.object.isRequired,
};
