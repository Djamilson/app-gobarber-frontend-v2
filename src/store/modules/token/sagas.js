import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/_services/history';
import api from '~/_services/api';

import { tokenInSuccess, tokenFailure } from './actions';

export function* tokenIn({ payloadToken }) {
  const { email, code_active } = payloadToken;
  try {
    const response = yield call(
      api.get,
      `mobile/valida_code_forget_password/${email}`
    );
    const { data } = response;
    if (code_active !== data.code_active) {
      toast.error('Código de redefinição incorreto, tente novamente!');
      yield put(tokenFailure());
      return;
    }

    yield put(tokenInSuccess(data));

    history.push('/forgetnewpassword');
  } catch (error) {
    toast.error(
      'Gere um novo código de redefinição e tente novamente, ou crie novo código!'
    );
    yield put(tokenFailure());
  }
}

export default all([takeLatest('@token/TOKEN_IN_REQUEST', tokenIn)]);
