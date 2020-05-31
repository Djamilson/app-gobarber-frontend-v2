export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function signUpSuccess() {
  return {
    type: '@user/SIGN_UP_SUCCESS',
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function signInFaileru() {
  return {
    type: '@user/SIGN_IN_FAILURE',
  };
}

export function createImage(data) {
  return {
    type: '@user/CREATE_IMAGE',
    payload: { data },
  };
}

export function updateImage(data) {
  return {
    type: '@user/UPDATE_IMAGE',
    payload: { data },
  };
}
