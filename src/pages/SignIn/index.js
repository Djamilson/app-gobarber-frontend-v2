import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { FaEnvelope, FaUnlockAlt } from 'react-icons/fa';
import { ContatinerLoding } from '~/styles/components';

import { signInRequest } from '~/store/modules/auth/actions';
import Loading from '~/components/Loading';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(1, 'No mínimo 1 caracter')
    .required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return loading ? (
    <ContatinerLoding loading={loading.toString()}>
      <Loading />
    </ContatinerLoding>
  ) : (
    <>
      <img src={logo} alt="GoBarber"></img>
      <span> Acesse a área segura </span>

      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input name="email" type="email" placeholder="Seu email" />
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>
        <div>
          <Input name="password" type="password" placeholder="Sua Senha" />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

        <button type="submit">{loading ? 'Carregando ...' : 'Acessar'}</button>

        <span>
          <Link to="/register">Criar conta</Link>
          <Link to="/forgetformemail">Esqueceu senha?</Link>
        </span>
      </Form>
    </>
  );
}
