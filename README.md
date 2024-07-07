# notas-bot

Un bot que te avisa si te cargaron la nota.

## Variables

- `PUBLISHED_SHEET_URL`: Url al documento publicado a revisar.
- `QUERY`: Texto a filtrar para cada fila. Si querés filtrar varios nombres,
  cada uno va separado por comas. Esto permite que te notifique solo si te
  cargaron la nota a vos o a un compa. Ejemplo: `QUERY=FOO,BAR,BAZ`
- `COLUMN_NAMES`: Nombres de las columnas a revisar y mostrar en el mensaje de
  Discord. Las columnas que tienen celdas combinadas y las que empiezan con `_`
  son ignoradas. Discord soporta 3 columnas por fila. Ejemplo:
  `COLUMN_NAMES=_Nombre,Apellido,Nota`
- `OUTPUT_FILE`: Ruta en donde se van a guardar los resultados para luego
  compararlos con la siguiente consulta.
- `DISCORD_TOKEN`: API Token del bot de Discord
- `DISCORD_CHANNEL`: ID del canal de Discord donde enviar las notificaciones

## Setup del Bot

1. Ir a [Discord Developer Portal - My Applications](https://discord.com/developers/applications)
2. Hacer click en `New Application`
3. Ir a `Bot` > `Add Bot`
4. Crear un `token`, que vamos a usar para setear `DISCORD_TOKEN`
5. Ir a `OAuth2` > `URL Generator`
6. Darle permisos de `bot`
7. Abajo, darle todos los `Text Permissions` y además
   `Read Messages/View Channels`.
8. Ir a la uri generada e invitar el bot a tu server.

## Ejecución en local

```bash
npm start
```

## Despliegue en fly.io

1. [Instalar `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)
2. Crear una cuenta con `fly auth signup` o loguearse con `fly auth login`
3. [Desplegar via Dockerfile](https://fly.io/docs/languages-and-frameworks/dockerfile/)

Tener en cuenta que, al ser un bot de Discord y no una Web App, debemos quitar
toda la parte de `[services]` que se encuentra en el archivo `fly.toml`.
