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

## Validación después de implementar

Al terminar cualquier implementación:

1. Formatea los archivos con `pnpm format`.
2. Ejecuta el lint con `pnpm lint`.
3. Si modificaste TypeScript o TSX, valida los tipos con
   `pnpm exec tsc --noEmit`.

Corrige los errores encontrados antes de dar la tarea por terminada.
