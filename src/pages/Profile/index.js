import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import { signOut } from '~/store/modules/auth/actions';

import Loading from '~/components/Loading';
import { ContatinerLoding } from '~/styles/components';

import {
  updateProfileRequest,
  updateProfileAvatarRequest,
} from '~/store/modules/user/actions';

import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import api from '~/services/api';

import { Container, Logo } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  const profile = useSelector(state => state.user.profile);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

  async function loadSchedule() {
    if (!!profile.avatar) {
      const { id, url } = profile.avatar;
      setFile(id);
      setPreview(url);
    }
  }

  useEffect(() => {
    loadSchedule();
    // eslint-disable-next-line
  }, []);

  async function handleChange(e) {
    setPreview(undefined);

    const data = new FormData();
    data.append('file', e.target.files[0]);

    if (profile.avatar !== null) {

      data.append('id_logo', profile.avatar.id);
      data.append('url_logo', profile.avatar.url);
      data.append('path_logo', profile.avatar.path);

      await api.put('files', data).then(d => {
        toast.success(`Avatar editado com sucesso!`);
        setFile(d.id);
        setPreview(d.url);
      });
    } else {
      await api.post('files', data).then(async file => {
        const profileNovo = Object.assign({
          avatar_id: file.data.id,
        });

        dispatch(updateProfileAvatarRequest(profileNovo));
        setFile(file.data.id);
        setPreview(file.data.url);
      });
    }
  }

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return loading ? (
    <ContatinerLoding loading={loading.toString()}>
      <Loading />
    </ContatinerLoding>
  ) : (
    <Container>
      <Logo>
        <label>
          {preview ? (
            <img
              src={
                preview ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt=""
            />
          ) : (
            'Click aqui para selecione sua imagem'
          )}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
          />
        </label>
      </Logo>

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

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        {' '}
        Sair do GoBarber{' '}
      </button>
    </Container>
  );
}
