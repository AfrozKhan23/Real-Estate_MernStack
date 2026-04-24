export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;

    const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);
    const exp = payload?.exp;

    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
};
