export function tokenInRequest(email, code_active) {
  return {
    type: '@token/TOKEN_IN_REQUEST',
    payloadToken: { email, code_active },
  };
}

export function tokenInSuccess(token) {
  return {
    type: '@token/TOKEN_IN_SUCCESS',
    payloadToken: { token },
  };
}

export function tokenFailure() {
  return { type: '@token/TOKEN_FAILURE' };
}
