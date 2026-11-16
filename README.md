# Práctica — Los 4 pilares de la POO + getters y setters

**Taller de Lenguajes de Programación IV** · Lucas Zigaran

Proyecto de TypeScript armado desde cero. Node.js (22.18 o superior) ejecuta los archivos `.ts` directamente, y `tsc` se usa solo para verificar tipos.

## Cómo ejecutar

```bash
npm install
npm run ej1   # Abstracción — Producto
npm run ej2   # Encapsulamiento — CuentaBancaria
npm run ej3   # Herencia — Empleado / EmpleadoFijo
npm run ej4   # Polimorfismo — EmpleadoPorHoras, EmpleadoPorComision y calcularNomina()
npm run ej5   # Getters y setters — Persona
npm run typecheck
```

## Decisiones

- **Ej. 1 — `venderUnidades()` lanza un `Error`** cuando no hay stock. Una venta fallida es algo de lo que quien llama tiene que enterarse sí o sí: un `console.log` se puede ignorar sin querer, mientras que un `Error` obliga a manejarlo (por ejemplo, con `try/catch` para avisarle al cliente).
- **Ej. 1 — `aplicarDescuento()`** devuelve el precio final y no modifica `precio`: es una simulación.
- **Ej. 2 — Historial como `string[]`** (`"depósito: +2000"`, `"retiro: -1500"`). `obtenerHistorial()` devuelve una copia (`[...this.historial]`), así que modificar lo devuelto no altera el historial real.
- **Ej. 4 reutiliza la jerarquía del Ej. 3** importando `Empleado` y `EmpleadoFijo` desde `ej3.ts`. Cada bloque de prueba está dentro de `if (import.meta.main)`, para que solo se ejecute al correr ese archivo y no al importarlo.
- **Ej. 5 — el constructor usa los setters** (`this.edad = edad`), así la validación de edad y email también se aplica al crear la persona.
- **`tsconfig.json`** usa `erasableSyntaxOnly`: solo se permite sintaxis que Node puede ejecutar borrando los tipos (por eso no se usan *parameter properties* como `constructor(private x)`).
