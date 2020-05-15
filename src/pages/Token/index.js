import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/_services/api';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function Token({ match }) {
  const [success, setSuccess] = useState(false);
  const { token } = match.params;

  async function loadToken() {
    await api
      .get(`confirmation/${token}`)
      .then(res => {
        setSuccess(true);
        toast.success(res.data.msg);
      })
      .catch(error => {
        const str = error.toString();
        const finall = str.replace(/\D/g, '');

        if (finall === '401' || finall === '403') {
          toast.warning(
            'Não foi possível encontra um usuário para esse token, crie um novo usuário!'
          );
        }

        if (finall === '402') {
          toast.warning('Este email já foi verificado, acesse sua conta!');
          setSuccess(true);
        }

        if (finall === '403') {
          toast.warning('Token expirado, gere novo token, em recuperar senha!');
        }
      });
  }

  useEffect(() => {
    loadToken();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(data) {
    const { email } = data;

    await api
      .post(`token/${email}`)
      .then(res => {
        setSuccess(true);

        toast.success(
          `Token gerado com sucesso, acesse o email ${email} e ative sua conta!`
        );
      })
      .catch(err => {
        const { stack } = err;
        const finall = stack.split('status code ')[1].substring(0, 3);

        if (finall === '401' || finall === '403') {
          toast.warning(
            'Não foi possível encontra um usuário, crie sua conta!'
          );
        }
      });
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu email" />

        <button type="submit">Gerar novo token</button>
        <div>
          <Link to="/">Já tenho conta</Link>
        </div>
      </Form>
    </>
  );
}

Token.propTypes = {
  match: PropTypes.object.isRequired,
};
