const TWITCH_CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID
const LOGIN_REDIRECT_URL = import.meta.env.VITE_VERCEL_URL ? `https://${import.meta.env.VITE_VERCEL_URL}` : import.meta.env.VITE_LOGIN_REDIRECT_URL
const TWITCH_STATE = import.meta.env.VITE_TWITCH_STATE

export {
  TWITCH_CLIENT_ID,
  LOGIN_REDIRECT_URL,
  TWITCH_STATE
}
