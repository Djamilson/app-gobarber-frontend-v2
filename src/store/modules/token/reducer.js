import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  loading: false,
};

export default function token(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@token/TOKEN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@token/TOKEN_IN_SUCCESS': {
        draft.token = action.payloadToken.token;
        draft.loading = false;
        break;
      }

      case '@token/TOKEN_FAILURE': {
        draft.token = null;
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
