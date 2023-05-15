# Twitch follows

Aplicación para saber qué usuarios/streamers sigue un usuario de twitch proporcionado.

## Cómo montar la aplicación?

1. `npm install`
2. Renombramos .env.sample a .env y los editamos con los valores correspondientes.
3. `npm run dev`

## Infomación adicional acerca de .env

- En Vite, es importante que las variables de entorno empiecen por "VITE_".
- Para conseguir el **TWITCH_CLIENT_ID** y el **TWITCH_SECRET_ID**, es necesario registrar una aplicación en [la consola de twitch](https://dev.twitch.tv/console).
- El TWITCH_STATE existe para una mayor seguridad del usuario (evitar ataques CSRF). Se ha de usar una cadena alfanúmerica.