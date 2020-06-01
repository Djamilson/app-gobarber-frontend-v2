import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdPhoto } from 'react-icons/md';

import { signInFaileru } from '~/store/modules/user/actions';

import { colors } from '~/styles';

import { toast } from 'react-toastify';

import { createImage, updateImage } from '~/store/modules/user/actions';

import Loading from '~/components/Loading';

import { Avatar, ItemAvatar, ContaineIcon } from './styles';

import api from '~/_services/api';

export default function AvatarInput() {
  const dispatch = useDispatch();
  const loadingCriateImage = useSelector(state => state.user.loading);
  const [loadingUpdateImage, setLoadingUpdateImage] = useState(false);

  const inputRef = useRef();
  const profile = useSelector(state => state.user.profile);
  const [color] = useState(`${colors.serven}`);

  const [image, setImage] = useState({ preview: '', file: '', id_file: '' });

  async function loadSchedule() {
    if (!!profile.avatar) {
      const { id, url } = profile.avatar;
      setImage({
        preview: `${url}-sm`,
        id_file: id,
      });
    }
  }

  useEffect(() => {
    loadSchedule();
  }, [profile]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    try {
      if (profile.avatar !== null) {
        setLoadingUpdateImage(true);

        const avatar_id = profile.avatar === null ? '' : profile.avatar.id;
        data.append('id', avatar_id);

        const res = await api.put(`files/${avatar_id}`, data);
        dispatch(updateImage({ data: res.data }));
        setLoadingUpdateImage(false);
      } else {
        dispatch(createImage({ data }));
      }
    } catch (error) {
      setLoadingUpdateImage(false);
      dispatch(signInFaileru());
      toast.error('Erro no upload da imagem, tente novamente!');
    }
  }

  return (
    <Avatar>
      <section>
        <ItemAvatar color={color}>
          <span>
            <label>
              {image.preview ? (
                <img
                  src={
                    image.preview ||
                    'https://api.adorable.io/avatars/50/abott@adorable.png'
                  }
                  alt={profile.name}
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
          </span>
        </ItemAvatar>
      </section>
      {loadingCriateImage === true && (
        <Loading isActive={loadingCriateImage}>
          Aguarde um momento, pois estamos redimensionado a imagem para vários
          tamanhos, para ter uma melhor usabilidade em diferentes dispositivos.
        </Loading>
      )}

      {loadingUpdateImage === true && (
        <Loading isActive={loadingUpdateImage}>
          Aguarde um momento, pois estamos redimensionado a imagem para vários
          tamanhos, para ter uma melhor usabilidade em diferentes dispositivos.
        </Loading>
      )}
    </Avatar>
  );
}
