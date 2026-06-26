import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "../constants";
import { authApi } from "../services/api";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    case "UPDATE_USER":
      return { ...state, user: state.user ? { ...state.user, ...action.payload } : null };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const persistLogin = useCallback((user, accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    dispatch({ type: "LOGIN_SUCCESS", payload: { user, accessToken, refreshToken } });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (token && refreshToken && userJson) {
      try {
        const user = JSON.parse(userJson);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user, accessToken: token, refreshToken } });
      } catch {
        dispatch({ type: "LOGOUT" });
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = useCallback(async (payload) => {
    const res = await authApi.login(payload);
    const { user, accessToken, refreshToken } = res.data.data;
    persistLogin(user, accessToken, refreshToken);
  }, [persistLogin]);

  const register = useCallback(async (payload) => {
    const res = await authApi.register(payload);
    const { user, accessToken, refreshToken } = res.data.data;
    persistLogin(user, accessToken, refreshToken);
  }, [persistLogin]);

  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      try { await authApi.logout(refreshToken); } catch { /* silent */ }
    }
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    dispatch({ type: "LOGOUT" });
  }, []);

  const updateUser = useCallback((data) => {
    dispatch({ type: "UPDATE_USER", payload: data });
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        localStorage.setItem(USER_KEY, JSON.stringify({ ...user, ...data }));
      } catch { /* silent */ }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
