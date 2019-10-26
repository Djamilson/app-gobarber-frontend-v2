import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaEnvelope } from 'react-icons/fa';

import api from '~/services/api';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function Recuperarpassword() {
  const [success, setSuccess] = useState(false);
  async function handleSubmit(data) {
    const { email } = data;

    await api
      .post(`recuperarpassword/${email}`)
      .then(() => {
        setSuccess(true);

        toast.success(
          `Foi enviado instruções de recuperação de senha, para o email ${email}, acesse para criar nova senha!`
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
      <span> Recuperar Senha </span>
      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input name="email" type="email" placeholder="Seu email" />
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>
        <button type="submit">Recuperar a senha</button>
        <span>
          <Link to="/">Já tenho conta</Link>
        </span>
      </Form>
    </>
  );
}
