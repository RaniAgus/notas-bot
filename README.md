# notas-bot

Un bot que te avisa si te cargaron la nota.

## Variables

- `PUBLISHED_SHEET_URL`: Url al documento publicado a revisar.
- `QUERY`: Texto a filtrar para cada fila. Si querés filtrar varios nombres,
  cada uno va separado por comas. Esto permite que te notifique solo si te
  cargaron la nota a vos o a un compa. Ejemplo: `QUERY=FOO,BAR,BAZ`
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
6. Darle permisos de `guilds` y `bot`
7. Abajo, darle todos los `Text Permissions` y además `Messages/View Channels`.
8. Ir a la uri generada e invitar el bot a tu server.

## Build & Run en local

```bash
npm start
```

## Build & Run desde Docker

```bash
docker build . --rm -t raniagus/notas-bot
docker run --rm -d --init --env-file=./.env raniagus/notas-bot
```
