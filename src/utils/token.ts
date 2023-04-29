export const tokenKey = "user_token";

export function getToken() {
  const token = localStorage.getItem(tokenKey);
  return token;
}

export function setToken(token: string) {
  localStorage.setItem(tokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
}
