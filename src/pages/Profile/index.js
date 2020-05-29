import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdPhoto } from 'react-icons/md';

import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import { ContatinerLoding } from '~/styles/components';

import {
  updateProfileRequest,
  updateProfileAvatarRequest,
  updateProfileSuccess,
} from '~/store/modules/user/actions';

import { FaUser, FaEnvelope, FaUnlockAlt } from 'react-icons/fa';
import { colors } from '~/styles';

import api from '~/_services/api';

import { Container, Avatar, ImagemDiv, ContaineIcon } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const profile = useSelector(state => state.user.profile);
  const [color] = useState(`${colors.serven}`);

  const [image, setImage] = useState({ preview: '', file: '', id_file: '' });

  async function loadSchedule() {
    if (!!profile.avatar) {
      const { id, url } = profile.avatar;
      setImage({
        preview: `${url}-sx`,
        id_file: id,
      });
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  async function handleChange(e) {
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

        setImage({
          preview: `${res.url}-sx`,
          id_file: res.data.id,
        });

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

        setImage({
          preview: `${url}-sx`,
          id_file: _id,
        });
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
      <Form initialData={profile} onSubmit={handleSubmit}>
        <ImagemDiv>
          <Avatar color={color}>
            <label>
              {image.preview ? (
                <img
                  src={
                    `${image.preview}-xs` ||
                    'https://api.adorable.io/avatars/50/abott@adorable.png'
                  }
                  alt={profile.person.name}
                />
              ) : (
                <ContaineIcon>
                  <MdPhoto size={40} color={colors.serven} />
                  Adicionar foto
                </ContaineIcon>
              )}
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleChange}
                ref={inputRef}
              />
            </label>
          </Avatar>
        </ImagemDiv>

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
