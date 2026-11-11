# Notificaciones de contactos

El formulario guarda `email_estado = pending` antes del envío interno al equipo.
El servidor usa las credenciales de superusuario existentes para registrar:

- `email_estado`: `pending`, `sending`, `sent` o `failed`.
- `email_intentos` y `email_ultimo_intento`.
- `email_enviado_en`: aceptación por ZeptoMail, no entrega en la bandeja.
- `email_ultimo_error`: resumen sin datos privados de la respuesta del proveedor.

Los registros anteriores conservan el estado vacío: su entrega se desconoce y
no deben reenviarse masivamente. No se cambian las reglas de acceso de PocketBase.

Desde la raíz, con las variables de `.env` configuradas:

```sh
# Revisar campos faltantes; no cambia nada.
node --env-file=.env scripts/contact-notifications.mjs schema
# Agregar campos, guardando antes el esquema en tmp/; no modifica contactos.
node --env-file=.env scripts/contact-notifications.mjs schema --apply
# Reintentar un contacto pending o failed.
node --env-file=.env scripts/contact-notifications.mjs retry ID_CONTACTO
# Reintentar todos los failed.
node --env-file=.env scripts/contact-notifications.mjs retry --failed
# Pruebas sin red ni correos reales.
node --test scripts/contact-notifications.test.mjs
```

Los reintentos son manuales y envían al equipo configurado en
`TEAM_FORM_NOTIFICATION_EMAILS`, nunca al visitante. Ejecutar un solo proceso a
la vez, sin reintentar un contacto mientras su formulario se está procesando.
`sent`, `sending` y estado vacío se omiten. Un registro atascado en `sending`
requiere revisar ZeptoMail antes de cambiarlo a `failed` manualmente; el correo
pudo aceptarse aunque no se haya registrado el resultado en PocketBase.
Un timeout de red también puede dejar incierta la aceptación: revisar el
proveedor antes de reintentar ese caso para evitar duplicados.

Las credenciales son las de PocketBase y ZeptoMail ya utilizadas por la app.
Cambiar el código requiere desplegar el servicio comercial; agregar el esquema
por sí solo no activa el seguimiento de envíos.
