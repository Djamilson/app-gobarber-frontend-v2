import React, { useState} from 'react';

import Loading from '~/components/Loading';
import { ContatinerLoding } from '~/styles/components';
import { FaUnlockAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/_services/api';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  password: Yup.string()
    .min(1)
    .required('Senha obrigatória'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required().oneOf([Yup.ref('password')], 'Senhas são diferentes!')
      : field
  ),
});

export default function NewPassword({ match, history }) {
  const token = useSelector(state => state.token.token);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    const { password, confirmPassword } = data;
    setLoading(true);
    await api
      .put(`forget/new_password`, {
        data: {
          password,
          confirmPassword,
          token,
        },
      })
      .then(() => {
        setLoading(false);
        toast.success(
          `Senha redefinida com sucesso, acesse sua conta no GoBarber!`
        );
        history.push('/');
      })
      .catch(error => {
        setLoading(false);

        const str = error.toString();
        const final = str.replace(/\D/g, '');
        if (final === '400') {
          toast.error('As senhas não conferem, tente novamente!');
          return;
        }

        if (final === '401' || final === '403') {
          toast.error(
            'Esse código não existe, crei um novo código de redefinição de senha!'
          );
          return;
        }

        if (final === '404') {
          toast.error('Token inválido, já foi usado, crie novo Token!');
          return;
        }
        toast.error(`Não foi possível redefinir a senha, tente novamente!`);
      });
  }

  return loading ? (
    <ContatinerLoding loading={loading.toString()}>
      <Loading />
    </ContatinerLoding>
  ) : (
    <>
      <img src={logo} alt="GoBarber" />
      <span> Cadastre uma nova senha! </span>

      <Form schema={schema} onSubmit={handleSubmit}>
        <div>
          <Input type="password" name="password" placeholder="Nova senha" />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>
        <div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirma senha"
          />
          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

        <button type="submit">{loading ? 'Carregando ...' : 'Salvar'}</button>
        <span>
          <Link to="/">Já tenho conta</Link>
        </span>
      </Form>
    </>
  );
}

NewPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
