export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/api/auth";

export const SIGNUP_ROUTE = `${HOST}${AUTH_ROUTES}/signup`;

export const LOGIN_ROUTE = `${HOST}${AUTH_ROUTES}/login`;

export const USERINFO_ROUTE = `${HOST}${AUTH_ROUTES}/userinfo`;

export const UPDATE_PROFILE_ROUTE = `${HOST}${AUTH_ROUTES}/update-profile`;

export const ADD_PROFILE_IMAGE_ROUTE = `${HOST}${AUTH_ROUTES}/add-profile-image`;
