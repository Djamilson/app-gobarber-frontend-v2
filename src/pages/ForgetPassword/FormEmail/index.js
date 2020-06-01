import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa';

import api from '~/_services/api';
import Loading from '~/components/Loading';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function FormEmail({ history, match }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);

    const { email } = data;

    await api
      .get(`forgetpassword/mobile/${email}`)
      .then(() => {
        setLoading(false);

        history.push(`/forgetcodereset/${email}`);

        toast.success(
          `Novo código de redefinição de senha criando com sucesso, acesse seu email ${email} para vê o código de ativação!`
        );
      })
      .catch(error => {
        setLoading(false);
        const str = error.toString();
        const final = str.replace(/\D/g, '');

        if (final === '401' || final === '403') {
          toast.error(`Não foi possível encontra um usuário, crie sua conta!`);
        }
      });
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <span> Recuperar Senha </span>
      <Loading isActive={loading} />
      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input name="email" type="email" placeholder="Seu email" />
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>
        <button type="submit">Enviar</button>
        <span>
          <Link to="/">Já tenho conta</Link>
        </span>
      </Form>
    </>
  );
}

FormEmail.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
