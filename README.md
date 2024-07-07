# notas-bot

Un ~~bot~~ webhook que te avisa si te cargaron la nota.

## Variables

- `PUBLISHED_SHEET_URL`: Url al documento publicado a revisar.
- `QUERY`: Texto a filtrar para cada fila. Si querés filtrar varios nombres,
  cada uno va separado por comas. Esto permite que te notifique solo si te
  cargaron la nota a vos o a un compa. Ejemplo: `QUERY=FOO,BAR,BAZ`
- `COLUMN_NAMES`: Nombres de las columnas a revisar y mostrar en el mensaje de
  Discord. Las columnas que tienen celdas combinadas y las que empiezan con `_`
  son ignoradas. Discord soporta 3 columnas por fila. Ejemplo:
  `COLUMN_NAMES=_Nombre,Apellido,Nota`
- `CACHE_URL` (opcional): Url de una caché Redis para guardar el estado de las
  notas. Esto permite que no te notifique si no te cargaron la nota a pesar de
  que se haya apagado el servidor. Si no se setea, se guarda en un archivo
  local.
- `CACHE_KEY`: Clave para guardar el estado de las notas en la caché. Ejemplo:
  `CACHE_KEY=notas:dds`.
- `WEBHOOK_URL`: Url del webhook de Discord donde enviar las notificaciones.

## Setup del Webhook

1. Ir a la configuración del canal de Discord donde se quiera recibir las
   notificaciones.
2. Ir a la sección de Integraciones.
3. Crear un webhook.
4. Copiar la url del webhook y setearla en la variable de entorno `WEBHOOK_URL`.

## Ejecución en local

```bash
bun start
```

## Despliegue

- Web service: [Render](https://render.com/)
- Cron job: [cron-job.org](https://cron-job.org/)
