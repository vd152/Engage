export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};
export const removeAuthToken = () => {
  return localStorage.removeItem("token");
};
export const setUser = (id) => {
  localStorage.setItem("user", id);
};
export const getUser = () => {
  return localStorage.getItem("user") || null;
};
export const removeUser = () => {
  return localStorage.removeItem("user");
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

