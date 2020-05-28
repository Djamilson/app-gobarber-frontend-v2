import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import { ContatinerLoding } from '~/styles/components';

import {
  updateProfileRequest,
  updateProfileAvatarRequest,
  updateProfileSuccess,
} from '~/store/modules/user/actions';

import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';

import api from '~/_services/api';

import { Container, Logo } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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
  }, []);

  async function handleChange(e) {
    setPreview(undefined);
    setLoading(true);
    const data = new FormData();
    data.append('file', e.target.files[0]);

    if (profile.avatar !== null) {
      data.append('id_logo', profile.avatar.id);
      data.append('url_logo', profile.avatar.url);
      data.append('path_logo', profile.avatar.path);

      try {
        const res = await api.put('files', data);
        dispatch(updateProfileSuccess({ ...profile, avatar: data }));
        toast.success(`Avatar editado com sucesso!`);
        setFile(res.data.id);
        setPreview(res.data.url);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Não foi possível editar, tente novamente!');
      }
    } else {
      try {
        const resData = await api.post('files', data);

        const { _id, url } = resData.data;

        setLoading(false);

        const profileNovo = Object.assign({
          avatar_id: _id,
        });
        dispatch(updateProfileAvatarRequest(profileNovo));
        setFile(_id);
        setPreview(url);
      } catch (error) {
        setLoading(false);
        toast.error('Erro no upload da imagem, tente novamente!');
      }
    }

  }

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
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
    </Container>
  );
}
