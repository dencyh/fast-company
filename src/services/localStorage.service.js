const ACCESS_KEY = "jwt_token";
const REFRESH_KEY = "jwt_refresh_token";
const EXPIRES_IN = "jwt_expires_in";

export function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(ACCESS_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_IN, expiresDate);
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
