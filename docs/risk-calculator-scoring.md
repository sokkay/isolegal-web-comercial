# Risk Calculator Scoring

Esta documentación define los valores persistidos por el formulario (`value`) y la lógica de puntaje usada en backend para calcular el riesgo legal.

## Fuente de verdad en código

- `app/api/submitRiskCalculator/route.ts`
- `lib/schemas/riskCalculatorSubmission.ts`

## Preguntas que puntúan (3 a 8)

## Pregunta 3

¿Cómo se gestiona actualmente tu matriz legal?

- `planilla_excel_control_manual` -> 2 puntos
- `software_especializado_plataforma_legal` -> 1 punto
- `sin_matriz_estructurada` -> 3 puntos

## Pregunta 4

¿Cuándo fue la última actualización real de los requisitos de tu matriz?

- `menos_3_meses` -> 1 punto
- `entre_3_y_6_meses` -> 2 puntos
- `mas_6_meses_o_no_seguro` -> 3 puntos

## Pregunta 5 (selección múltiple)

¿Se encuentran tratadas en tu matriz alguna de estas normas?

Valores posibles:

- `ds_369`
- `ds_40`
- `ds_594`
- `ds_148`
- `ninguna`

Regla de puntaje:

- +3 por cada selección de `ds_369` o `ds_40`
- `ds_594`, `ds_148` y `ninguna` no suman
- Restricción de validación: `ninguna` no puede enviarse junto con otras normas

## Pregunta 6

Ante una ley que modifica el Código del Trabajo, ¿cómo actúas?

- `agregar_ley_completa_item_adicional` -> 1 punto
- `actualizar_articulos_modificados` -> 0 puntos
- `mantener_norma_hasta_proxima_auditoria` -> 2 puntos

## Pregunta 7

Si una fiscalización comenzara en 10 minutos, ¿tienes evidencia trazable?

- `evidencia_disponible_inmediata` -> 0 puntos
- `tomaria_tiempo_buscar_consolidar` -> 1 punto
- `sin_certeza_evidencia_vigente` -> 3 puntos

## Pregunta 8

¿Tu matriz incluye compromisos voluntarios, RCA o exigencias contractuales?

- `integrados_y_evaluados` -> 0 puntos
- `solo_leyes_y_decretos_nacionales` -> 1 punto
- `gestion_separada_o_informal` -> 3 puntos

## Fórmula de cálculo

`score = q3 + q4 + q5 + q6 + q7 + q8`

Donde:

- `q5 = (cantidad de seleccionados entre ds_369 y ds_40) * 3`

## Rango total

- Mínimo: `0`
- Máximo: `20`

Nota: El máximo es 20 porque en pregunta 5 pueden sumar simultáneamente `ds_369` y `ds_40` (6 puntos).

## Clasificación de riesgo

- `score <= 4` -> `bajo`
- `score <= 9` -> `alto`
- `score >= 10` -> `critico`

## Ejemplos rápidos

- Caso bajo:
  - q3=1, q4=1, q5=0, q6=0, q7=0, q8=0 -> score=2 -> `bajo`
- Caso alto:
  - q3=2, q4=2, q5=3, q6=0, q7=1, q8=1 -> score=9 -> `alto`
- Caso crítico:
  - q3=3, q4=3, q5=6, q6=2, q7=3, q8=3 -> score=20 -> `critico`

