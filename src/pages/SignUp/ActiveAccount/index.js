import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { FaUnlockAlt } from 'react-icons/fa';

import Loading from '~/components/Loading';

import logo from '~/assets/logo.svg';

import { toast } from 'react-toastify';
import api from '~/_services/api';

import { ContentButtons } from './styles';

const schema = Yup.object().shape({
  code_active: Yup.string()
    .min(4, 'São 4 caracteres!')
    .required('O código de ativação é obrigatoŕio!'),
});

export default function ActiveAccount({ match, history }) {
  const { email } = match.params;
  const [loading, setLoading] = useState(false);

  function handlerSignIn() {
    history.push('/');
  }

  async function newCodeActive() {
    setLoading(true);
    await api
      .put(`proccess_active_account/new_code_active`, {
        data: {
          email,
        },
      })
      .then(() => {
        setLoading(false);
        toast.success(
          `Novo código criando com sucesso, acesse seu email para vê o código de ativação!`
        );
      })
      .catch(error => {
        setLoading(false);
        const str = error.toString();
        const final = str.replace(/\D/g, '');

        if (final === '401' || final === '403') {
          toast.error('Gerar um novo código, tente novamente!');
        }
      });
  }

  async function handleActiveAccount({ code_active }) {
    setLoading(true);

    await api
      .put(`proccess_active_account`, {
        data: {
          email,
          code_active,
        },
      })
      .then(() => {
        setLoading(false);
        handlerSignIn();
        toast.success('Conta ativada com sucesso!');
      })
      .catch(error => {
        setLoading(false);
        const str = error.toString();
        const final = str.replace(/\D/g, '');

        if (final === '400') {
          toast.error(
            'Código de ativação incorreto, crie um novo código ou tente novamente!'
          );
        }

        if (final === '401' || final === '403') {
          toast.error('Não foi possível encontra um usuário, crie sua conta!');
        }

        if (final === '402') {
          toast.error('Código de ativação incorreto, tente novamente!');
        }
      });
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <span> Ativando sua conta </span>
      <Loading isActive={loading} />
      <Form schema={schema} onSubmit={handleActiveAccount}>
        <div>
          <Input name="code_active" placeholder="Seu código de ativação!" />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

        <button type="submit">
          {loading ? 'Carregando ...' : 'Ativar conta'}
        </button>
      </Form>
      <ContentButtons>
        <button onClick={newCodeActive}>Novo código de ativação </button>
        <span>
          <Link to="/">Já tenho conta ativa</Link>
        </span>
      </ContentButtons>
    </>
  );
}

ActiveAccount.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
