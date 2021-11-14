export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};
export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};
export const setPermission = (role) => {
  localStorage.setItem("permission", role);
};
export const getPermission = () => {
  return localStorage.getItem("permission") || null;
};
export const removePermission = () => {
  return localStorage.removeItem("permission");
};

