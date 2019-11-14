import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';
import { signInFaileru} from '../user/actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador de serviço, acesse o APP!');

      yield put(signFailure());
      return;
    }

    api.defaults.headers.Authorization = ` Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      toast.warn('Não foi possível encontra um usuário, crie sua conta!');
      yield put(signFailure());
      return;
    }

    // Make sure the user has been verified
    if (final === '401') {
      toast.warn(
        'Seu email ainda não foi validado, acesse sua conta de email e confirme a validação do acesso!'
      );
      yield put(signFailure());
      return;
    }

    // Make sure the user has been verified
    if (final === '402') {
      toast.warn(
        'No momento esse usuário está desativado, entre em contato com o administrador!'
      );
      yield put(signFailure());
      return;
    }
    if (final === '403') {
      toast.error('Usuário não encontrado!');
      yield put(signFailure());
      return;
    }
    if (final === '404') {
      toast.error('Usúario ou senha incorreta, verifique seus dados!');
      yield put(signFailure());
      return;
    }

    toast.error('Não foi possível conectar, tente novamente!');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, cod_company } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
      cod_company,
    });
    toast.success(
      `Cadastro efetuado com sucesso, acesse o email ${email} para a tivar sua conta!`
    );

    history.push('/dashboard');
  } catch (error) {

    const str = error.toString();
    const final = str.replace(/\D/g, '');

    if (final === '400') {
      toast.error('Campos inválidos!');
      //yield put(signFailure());
      yield put(signInFaileru());
      return;
    }

    if (final === '401') {
      toast.error('Usuário já cadastrado!');
      yield put(signInFaileru());
      //yield put(signFailure());
      return;

    }

    if (final === '402') {
      toast.error('Não foi possível encontrar o grupo para associar.');
      yield put(signInFaileru());
      //yield put(signFailure());
      return;

    }

    if (final === '403') {
      toast.error('Código da empresa está incorreto, tente novamente!');
      yield put(signInFaileru());
      //yield put(signFailure());
      return;

    }

    yield put(signInFaileru());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = ` Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@user/SIGN_UP_SUCCESS', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
