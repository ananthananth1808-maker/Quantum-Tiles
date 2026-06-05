const AUTH_KEY = 'quantum_tiles_user';

const parseStorage = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const getAuthUser = () => parseStorage();

export const isAuthenticated = () => Boolean(getAuthUser());

export const isAdmin = () => getAuthUser()?.role === 'admin';

export const isCustomer = () => getAuthUser()?.role === 'customer';

export const login = ({ email, role = 'customer' }) => {
  const user = { email, role };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
};

export const register = ({ name, email, role = 'customer' }) => {
  const user = { name, email, role };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
