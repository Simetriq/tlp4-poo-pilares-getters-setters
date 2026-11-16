// Ejercicio 4 — Polimorfismo
// Se reutiliza la jerarquía del ejercicio 3 y se agregan dos tipos de empleado más.
// Cada uno responde a calcularSueldo() a su manera, y el código que los recorre no pregunta de qué tipo son.

import { Empleado, EmpleadoFijo } from './ej3.ts';

export class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  /** Horas × valor hora, sin bono por antigüedad. */
  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

export class EmpleadoPorComision extends Empleado {
  private ventasDelMes: number;
  private porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  /** Ventas × porcentaje de comisión. */
  override calcularSueldo(): number {
    return (this.ventasDelMes * this.porcentajeComision) / 100;
  }
}

/** Función (no método) que suma el sueldo de todos, sin importar el tipo de empleado. */
export function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (const empleado of empleados) {
    total += empleado.calcularSueldo();
  }
  return total;
}

// --- Bloque de prueba ---
if (import.meta.main) {
  const empleados: Empleado[] = [
    new EmpleadoFijo('Juan', 3, 500000),
    new EmpleadoPorHoras('Sofía', 1, 120, 3000),
    new EmpleadoPorComision('Pedro', 5, 4000000, 10),
    new EmpleadoFijo('Marta', 10, 800000),
    new EmpleadoPorHoras('Tomás', 2, 80, 3500),
  ];

  for (const empleado of empleados) {
    // Mismo mensaje (calcularSueldo), distinto comportamiento según la clase real del objeto
    console.log(`${empleado.describir()}  [calcularSueldo(): ${empleado.calcularSueldo()}]`);
  }

  console.log('Total de la nómina: $' + calcularNomina(empleados));
}
