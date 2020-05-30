import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/_services/api';

import {
  signInFaileru,
  updateProfileSuccess,
  updateProfilefailure,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      {
        name,
        email,
      },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      toast.error('Campos inválidos!');
      yield put(updateProfilefailure());
      return;
    }

    toast.error('Erro ao atualizar o perfil, confira os seus dados!');

    yield put(updateProfilefailure());
  }
}

export function* updateProfileAvatar({ payload }) {
  try {
    const { avatar_id } = payload.data;

    const profile = Object.assign({
      avatar_id,
    });

    const response = yield call(api.put, 'usersavatar', profile);

    toast.success('Avatar atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar o avatar, tente novamente!');
    yield put(updateProfilefailure());
  }
}

export function* createImage({ payload }) {
  try {
    const { data } = payload.data;

    const resp = yield call(api.post, 'files/mobile', data);

    yield put(updateProfileSuccess(resp.data.user));

    toast.success('Imagem inserida com sucesso!');
  } catch (error) {
    toast.error('Houve uma falha ao tentar inserir a imagem,  tente novamente');

    yield put(signInFaileru());
  }
}

export function* updateImage({ payload }) {
  try {
    const { user } = payload.data.data;
    console.log('data::', user);

    yield put(updateProfileSuccess(user));

    toast.success('Imagem atualizada com sucesso!');
  } catch (error) {
    toast.error('Não foi possível alterar a imagem, tente novamente!');

    yield put(signInFaileru());
  }
}

export default all([
  takeLatest('@user/CREATE_IMAGE', createImage),
  takeLatest('@user/UPDATE_IMAGE', updateImage),

  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_PROFILE_AVATAR_REQUEST', updateProfileAvatar),
]);
