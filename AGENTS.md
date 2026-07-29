# Guía del proyecto

## PageTheme

`contexts/PageTheme.tsx` centraliza la configuración visual y de navegación que
cambia según la página. El `PageThemeProvider` envuelve el header, el contenido
y el footer, y expone la configuración mediante `usePageTheme()`.

Modifica `PageTheme` cuando una ruta necesite:

- Colores o estilos temáticos distintos en elementos compartidos.
- Un destino diferente para el CTA de cálculo de riesgo.
- Configuración que deban consumir tanto el header como el footer.

Evita agregar ternarios por ruta o colores hardcodeados directamente en
`Header.tsx` y `Footer.tsx`. Agrega el valor a `PageThemeConfig`, configúralo por
ruta y consúmelo mediante `usePageTheme()`. Los colores reutilizables deben
seguir definidos como variables CSS en `app/globals.css`.

## Arquitectura static-first

Las páginas públicas y de marketing deben mantenerse estáticas por defecto.

- Usa Server Components como opción predeterminada.
- Agrega `"use client"` únicamente a componentes pequeños que necesiten
  interacción, estado, efectos o APIs del navegador.
- Evita convertir una página o sección completa en Client Component.
- No introduzcas renderizado dinámico, consultas en cada request, `cookies`,
  `headers` o dependencias del usuario en páginas públicas salvo que el
  requerimiento lo exija.
- Los datos que cambian poco deben resolverse durante el build cuando sea
  posible.
- Aísla formularios, analítica, carruseles y otras interacciones en islas
  cliente, manteniendo estático el resto de la página.
- Los endpoints de `app/api` pueden ser dinámicos sin convertir en dinámicas las
  páginas que los consumen.
- Si un cambio impide que una ruta se genere estáticamente, debe justificarse y
  comprobarse mediante `pnpm build`.

## Validación después de implementar

Al terminar cualquier implementación:

1. Formatea los archivos con `pnpm format`.
2. Ejecuta el lint con `pnpm lint`.
3. Si modificaste TypeScript o TSX, valida los tipos con
   `pnpm exec tsc --noEmit`.

Corrige los errores encontrados antes de dar la tarea por terminada.
