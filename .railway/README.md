# Infraestructura de ISOlegal Web en Railway

Configuración importada de producción el 11 de noviembre de 2026. Esta carpeta
administra el proyecto completo: web comercial, administrador, PocketBase, Redis,
los dos cron jobs, los dos volúmenes y el bucket **Blog Media**.

Migración aplicada en production el 11 de noviembre de 2026 a las 10:49 de
Santiago. Solo se actualizaron Risk Calculator Cron y sus nueve variables nuevas.
Despliegue: `59522bb3-6efe-42ea-b5f4-c4bb2c4de2c1` (SUCCESS / cron Ready).
Seguimiento de envíos y PostHog desplegados el 11 de noviembre de 2026:

- Web comercial: `10803494-5abc-48d6-b873-eba78a20211e` (SUCCESS).
- Risk Calculator Cron: `47e29d5a-4390-4f8b-82ee-f1e574794fc7` (SUCCESS / Ready).

Se actualizaron únicamente la web y el cron. Los 16 diagnósticos históricos
conservaron sus marcas, fechas e intentos, sin ejecutar envíos manuales.
El código del cron publicado coincide con el archivo generado; el plan posterior
no muestra cambios pendientes. No hay despliegues automáticos de IaC configurados.
La web se publicó inicialmente mediante upload local. Los despliegues desde
GitHub usan `main`; los cambios de IaC requieren aplicar su plan por separado.

## Validar antes de aplicar

Usar Railway CLI 5.71.0 o posterior y pnpm 11.17.0.

```sh
railway link --project 33e159cb-7447-46a8-8a1b-0dae6d11df4a --environment e6eca4d8-22b4-441c-8b5f-0afb791082d4 --service 658f0cc8-57ad-4097-8903-21ec5f3f8997
pnpm railway:plan
```

`railway:plan` genera la función de correos y ejecuta un plan de solo lectura,
limitado al ambiente production. Sale con código 2 si propone cambios, 0 si no.

La importación inicial produjo cero cambios tras usar el nombre actual del
bucket. El cambio propuesto después modifica únicamente Risk Calculator Cron:
su código y nueve variables para consultar PocketBase y enviar con ZeptoMail.
No debe crear, eliminar ni reemplazar recursos, volúmenes o archivos.

## Reglas para preservar los datos

- Conservar los seis servicios y todos los recursos en `railway.ts`. Omitir uno
  puede proponer su eliminación porque esta configuración abarca todo el proyecto.
- Conservar los volúmenes `pocketbase-volume` y `redis-volume`, su región
  `us-west2`, su tamaño de 5000 MB y sus montajes actuales. No sustituirlos por
  volúmenes nuevos. PocketBase mantiene `/pb/pb_data` y Redis `/data`.
- El bucket ahora se llama **Blog Media**. Su ID es
  `9ec757a2-2bb6-46a5-91f0-cba32214d827`, el mismo que tenía `stocked-flask`.
  No cambiarlo al nombre anterior: el plan lo interpreta como reemplazo.
- Mantener `preserve()` para variables existentes; los valores siguen en Railway.
  Las nuevas variables del cron referencian el servicio comercial sin copiar
  credenciales al repositorio.
- Mantener el commit fijado de PocketBase. No actualizar su versión como parte
  de esta migración.
- Ante cualquier eliminación, recreación, cambio de volumen o cambio inesperado,
  detenerse y revisar el plan. No usar `--confirm-destructive`.

AWS `isolegal-web-backups` es un recurso externo: no está administrado por este SDK.
El backup del blog copió 48 archivos en su primera ejecución. Falta verificar una
restauración de PocketBase y del blog en un entorno aislado antes del corte.

## Funciones

- `functions/blog-media-backup.mjs`: copia diaria a AWS a las 07:00 UTC, conserva
  rutas y archivos eliminados del origen. No implementa borrado ni retención.
- `src/risk-calculator-cron.ts`: entrada del envío directo. Reutiliza
  `lib/email/dispatchPendingRiskEmails.ts`, el envío ZeptoMail, la plantilla HTML
  y la generación de tokens de la web. Se ejecuta a las 13:00 UTC.
- `functions/risk-calculator-cron.mjs`: archivo generado y versionable, con las
  plantillas incluidas para que la función no dependa del disco de la web.
  Se genera con `pnpm railway:build`; no editarlo directamente.

El endpoint HTTP anterior reutiliza la misma lógica y conserva su autenticación.
El nuevo cron no lo llama y marca la ejecución como fallida si algún correo falla.
El código publicado registra estado, intentos, fecha y error en `diagnosticos_riesgo`.
Los orígenes enviados y los estados `sent`/`sending` bloquean reenvíos. El cron
reintenta los fallidos, usando copia del formulario si tienen reserva confirmada.
Si el proveedor acepta y falla la actualización, o la entrega es incierta, queda
`sending` y requiere revisión. No ejecutar simultáneamente endpoint, reserva y
cron para el mismo diagnóstico: todavía no hay una reserva atómica entre procesos.
Ver `scripts/risk-email-tracking.md` para la migración y los límites.

## Comprobaciones locales

```sh
pnpm format
pnpm lint
pnpm exec tsc --noEmit
pnpm exec tsc --noEmit -p .railway/tsconfig.json
node --test .railway/risk-calculator-cron.test.mjs
node --experimental-vm-modules --test .railway/functions/blog-media-backup.test.mjs
pnpm railway:plan
```

Los tests del cron usan PocketBase y ZeptoMail simulados: no envían correos reales.

## Cambios futuros

Tras revisar y aprobar cada nuevo plan y comprobar los respaldos, aplicar manualmente
con `railway config apply --environment production`. Revisar de nuevo su plan
antes de confirmar. La aplicación de IaC es independiente del despliegue del
código de la web desde GitHub; no hay workflow de apply automático configurado.
