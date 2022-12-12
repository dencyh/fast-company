const ACCESS_KEY = "jwt_token";
const REFRESH_KEY = "jwt_refresh_token";
const EXPIRES_IN = "jwt_expires_in";
const LOCAL_ID = "user_local_id";

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(ACCESS_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_IN, expiresDate);
  localStorage.setItem(LOCAL_ID, localId);
}

export function getUserLocalId() {
  return localStorage.getItem(LOCAL_ID);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresIn() {
  return localStorage.getItem(EXPIRES_IN);
}
