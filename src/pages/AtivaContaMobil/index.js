import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FaEnvelope } from 'react-icons/fa';
import { MdChevronLeft } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function Token({ match }) {
  const [success, setSuccess] = useState(false);
  const { token } = match.params;
  const loading = useSelector(state => state.auth.loading);

  async function ativaConta() {
    await api
      .get(`confirmation/${token}`)
      .then(res => {
        console.log('===>>>>>: ',res.data);
        toast.success(res.data.msg);
      })
      .catch(err => {
        const str = err.toString();
        const final = str.replace(/\D/g, '');

        setSuccess(true);

        if (final === '401' || final === '403') {
          toast.warning(
            'Não foi possível encontra um usuário para esse token, crie um novo usuário!'
          );
        }

        if (final === '402') {
          toast.warning('Este email já foi verificado, acesse sua conta!');
        }

        if (final === '403') {
          toast.warning('Token expirado, gere novo token, em recuperar senha!');
        }

        if (final === '404') {
          toast.warning('Esse token não existe, crie um novo token!');
        }
      });
  }
/*
  useEffect(() => {
    ativaConta();
  }, []);*/

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
        toast.warning('Não foi possível encontra um usuário, crie sua conta!');
      });
  }

  return (
    <>
      <img src={logo} alt="GoBarber"></img>

      {success === false && (
        <>
          <span> Conta ativada com sucesso! </span>
          <span> Já pode acessar o APP do GoBarber! </span>
        </>
      )}

      <button type="button" onClick={ativaConta}>
        {loading ? 'Carregando ...' : 'Ativa conta'}

        <MdChevronLeft size={36} color="#FFF" />
      </button>

      {success === true && (
        <>
          <span> Crie um novo Token para ativar sua conta </span>

          <Form schema={schema} onSubmit={handleSubmit}>
            <div>
              <Input name="email" type="email" placeholder="Seu email" />
              <label>
                <FaEnvelope size="19" color="#fff" />
              </label>
            </div>

            <button type="submit">
              {loading ? 'Carregando ...' : 'Gerar novo token'}
            </button>
          </Form>
        </>
      )}
    </>
  );
}

Token.propTypes = {
  match: PropTypes.object.isRequired,
};
