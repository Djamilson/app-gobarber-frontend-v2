export function updateProfileAvatarRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_AVATAR_REQUEST',
    payload: { data },
  };
}
export function updateProfileRequest(data) {
  console.log('Data:::', data);
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfilefailure() {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
  };
}
