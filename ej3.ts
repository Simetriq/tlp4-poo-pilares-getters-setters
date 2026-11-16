// Ejercicio 3 — Herencia
// Empleado define lo común (nombre, antigüedad, describir) y cada subclase decide cómo calcular el sueldo.

export class Empleado {
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  /** La clase base no sabe calcular un sueldo real: cada subclase lo sobreescribe. */
  calcularSueldo(): number {
    return 0;
  }

  /** No se reescribe en las subclases: funciona para todas gracias al polimorfismo de calcularSueldo(). */
  describir(): string {
    return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
  }
}

export class EmpleadoFijo extends Empleado {
  private sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad);
    this.sueldoBase = sueldoBase;
  }

  /** Sueldo base + bono del 2% del sueldo base por cada año de antigüedad. */
  override calcularSueldo(): number {
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

// --- Bloque de prueba ---
if (import.meta.main) {
  const generico = new Empleado('Ana', 1);
  const juan = new EmpleadoFijo('Juan', 3, 500000);
  const marta = new EmpleadoFijo('Marta', 10, 800000);

  console.log(generico.describir()); // la clase base devuelve 0
  console.log(juan.describir()); // 500000 + 3 * 2% = 530000
  console.log(marta.describir()); // 800000 + 10 * 2% = 960000
}
