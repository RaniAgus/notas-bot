# notas-bot

Un bot que te avisa si te cargaron la nota.

## Variables

- `PUBLISHED_SHEET_URL`: Url al documento publicado a revisar.
- `QUERY`: Texto a filtrar en cada fila. Si querés filtrar varios nombres, cada
  uno va separado por comas. Ejemplo: `QUERY=FOO,BAR,BAZ`
- `OUTPUT_FILE`: Ruta en donde se van a guardar los resultados para luego
  compararlos con la siguiente consulta.
- `DISCORD_TOKEN`: API Token del bot de Discord
- `DISCORD_CHANNEL`: ID del canal de Discord donde enviar las notificaciones

## Build & Run desde Docker

```bash
docker build . --rm -t raniagus/notas-bot
docker run --rm -d --init --env-file=./.env raniagus/notas-bot
```
