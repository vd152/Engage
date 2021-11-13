export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};
export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};
