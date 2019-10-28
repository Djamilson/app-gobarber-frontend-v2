import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfilefailure } from './actions';

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

    console.log('Profile vai salvar: ', profile);

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');
    console.log('Retorno::: ', response);
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');
    console.log('Detrno do Saga::: ', error);
    if (final === '400') {
      toast.error('Campos inválidos!');
      yield put(updateProfilefailure());
      return;
    }

    console.log('Error::: ', error);
    toast.error('Erro ao atualizar o perfil, confira os seus dados!');

    yield put(updateProfilefailure());
  }
}

export function* updateProfileAvatar({ payload }) {
  try {
    const { avatar_id } = payload.data;
    console.log('Estou aqui: ', payload.data);

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

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/UPDATE_PROFILE_AVATAR_REQUEST', updateProfileAvatar),
]);
