import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import { tokenInRequest } from '~/store/modules/token/actions';
import Loading from '~/components/Loading';
import logo from '~/assets/logo.svg';

import { ContentButtons } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O e-mail é obrigatório!'),
  code_active: Yup.string()
    .min(4, 'São 4 caracteres!')
    .required('O código de ativação é obrigatoŕio!'),
});

export default function CodeReset({ match, history }) {
  const dispatch = useDispatch();
  const { email } = match.params;
  const loading = useSelector(state => state.token.loading);

  const [initialData] = useState({ email });

  function newCodeActive() {
    history.push('/forgetformemail');
  }

  async function handleSubmit(data) {
    const { email: newEmail, code_active } = data;

    dispatch(tokenInRequest(newEmail, code_active));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <span> Valida o código </span>
      <Loading isActive={loading} />
      <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input name="email" type="email" placeholder="Seu email" />
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>
        <div>
          <Input name="code_active" placeholder="Seu código de redefinição!" />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

        <button type="submit">
          {loading ? 'Carregando ...' : 'Validar código'}
        </button>
      </Form>

      <ContentButtons>
        <button onClick={newCodeActive}>
          Novo código de redefina de senha{' '}
        </button>

        <span>
          <Link to="/">Já tenho conta</Link>
        </span>
      </ContentButtons>
    </>
  );
}

CodeReset.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
