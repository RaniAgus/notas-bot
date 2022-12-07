# notas-bot

Un bot que te avisa si te cargaron la nota.

## Variables

- `URL`: Url al documento a revisar.
- `FILTER`: Texto a filtrar en cada fila. Si querés filtrar varios nombres, cada
  uno va separado por comas. Ejemplo: `FILTER=FOO,BAR,BAZ`
- `OUTPUT_FILE`: Ruta en donde se van a guardar los resultados para luego
  compararlos con la siguiente consulta.
- `DISCORD_TOKEN`: API Token del bot de Discord
- `DISCORD_CHANNEL`: ID del canal de Discord donde enviar las notificaciones
