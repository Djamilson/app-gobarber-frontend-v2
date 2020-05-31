import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import AvatarInput from './AvatarInput';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <AvatarInput />
      <Form initialData={profile} onSubmit={handleSubmit}>
        <div>
          <Input name="name" placeholder="Nome completo" />
          <label>
            <FaUser size="19" color="#fff" />
          </label>
        </div>

        <div>
          <Input
            name="email"
            type="email"
            placeholder="Seu endereço de email"
          />
          <label>
            <FaEnvelope size="19" color="#fff" />
          </label>
        </div>

        <hr />

        <div>
          <Input
            type="password"
            name="oldPassword"
            placeholder="Sua senha atual"
          />

          <label>
            <FaUnlockAlt size="19" color="#fff" />
          </label>
        </div>

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

        <button type="submit">
          {loading ? 'Atualizando ...' : 'Atualizar perfil'}
        </button>
      </Form>
    </Container>
  );
}
