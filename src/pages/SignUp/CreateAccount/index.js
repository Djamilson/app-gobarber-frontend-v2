import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import Loading from '~/components/Loading';

import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O e-mail é obrigatório!'),
  password: Yup.string()
    .min(1, 'No mínimo 1 caracter!')
    .required('A senha é obrigatória!'),
  cod_company: Yup.string().required('O código da empresa é obrigatório!'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password, cod_company }) {
    dispatch(signUpRequest(name, email, password, cod_company));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <span> Criar conta </span>
      <Loading isActive={loading} />
      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input name="name" placeholder="Nome" />
          <label>
            <FaUser size="19" color="#fff" />
          </label>
        </div>

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

        <div>
          <Input name="cod_company" placeholder="Código da empresa" />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

        <button type="submit">
          {loading ? 'Carregando ...' : 'Criar conta'}
        </button>
        <span>
          <Link to="/">Já tenho conta</Link>
        </span>
      </Form>
    </>
  );
}
