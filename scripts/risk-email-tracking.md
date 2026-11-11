# Estado del correo del diagnóstico

`diagnosticos_riesgo` usa `email_estado`, `email_intentos`,
`email_ultimo_intento`, `email_enviado_en` y `email_ultimo_error`, igual que
`contactos`. Estos campos corresponden al correo de resultados del diagnóstico,
no al correo separado de confirmación de la reunión.

```sh
node --env-file=.env scripts/risk-email-schema.mjs
node --env-file=.env scripts/risk-email-schema.mjs --apply
node --test .railway/risk-calculator-cron.test.mjs
```

La migración guarda un snapshot en `tmp/`, conserva campos y reglas existentes y
solo marca `sent` los registros cuya marca `origen` ya indica envío. No inventa
fechas ni número de intentos históricos. Nunca envía correos.

El formulario nuevo guarda `pending`. El cron y la reserva usan el mismo helper:

- `origen` enviado siempre bloquea el reenvío, incluso si el estado nuevo difiere.
- `sent` y `sending` también bloquean nuevos envíos.
- Cada intento registra `sending`, suma uno y guarda fecha antes de contactar a
  ZeptoMail. Si no puede guardar el intento, no envía.
- Un rechazo HTTP deja `failed` y un error resumido sin datos del proveedor.
- Una entrega incierta por corte de red deja `sending` para revisión manual.
- La aceptación guarda `sent`, fecha y el `origen` correspondiente juntos.
- El cron reintenta los fallidos. Si hay reserva confirmada, envía la copia del
  formulario; los pendientes sin intento y con reserva siguen omitiéndose.

No cambiar un registro `sending` a `failed` sin consultar antes ZeptoMail.
No ejecutar cron y endpoint de despacho simultáneamente: no existe una reserva
atómica entre procesos; incorporar un bloqueo si se habilitan trabajadores
paralelos. `sent` significa aceptación del proveedor, no entrega a la bandeja.

Desplegar el servicio comercial activa los cambios del formulario y de la reserva.
Generar y aplicar la configuración de Railway publica el cambio del cron.

## PostHog

Los envíos de contacto y diagnóstico registran `email_send_result` con
`email_status` (`accepted`, `failed`, `uncertain`), `email_type`, `email_attempt`,
`submission_id`, `collection`, proveedor y código de error resumido. No incluyen
correos, nombres, contenido ni tokens de agenda. Los eventos de formulario
completado incluyen el mismo `submission_id` para cruzar ambos resultados.
Los envíos usan una identidad técnica por registro; no se asocian automáticamente
al perfil del visitante en PostHog. Filtrar por `submission_id` para relacionarlos.

`accepted` es aceptación de ZeptoMail, incluso si después falla guardar el
resultado en PocketBase. No demuestra entrega a la bandeja, apertura ni lectura.
Los fallos de PostHog no marcan el correo como fallido ni provocan su reenvío.
No se generan eventos retroactivos para los correos históricos.

La función de Railway referencia token y host de PostHog desde el servicio web;
quedaron aplicados con el despliegue de IaC del 11 de noviembre de 2026. El SDK `posthog-node` existente se
incluye como dependencia externa con su versión instalada fijada al generar.
