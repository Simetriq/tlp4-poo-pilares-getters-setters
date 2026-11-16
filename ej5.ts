// Ejercicio 5 — Getters y setters
// Los setters validan antes de guardar; los getters de solo lectura calculan valores al leerlos.

export class Persona {
  private readonly dni: string;
  nombre: string;
  private _edad: number = 0;
  private _email: string = '';

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    // Se usan los setters para que la validación también se aplique al crear la persona
    this.edad = edad;
    this.email = email;
  }

  get edad(): number {
    return this._edad;
  }

  set edad(valor: number) {
    if (valor < 0) throw new Error('La edad no puede ser negativa');
    if (valor > 120) throw new Error('La edad no puede ser mayor a 120');
    this._edad = valor;
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    if (!valor.includes('@')) throw new Error(`Email inválido: "${valor}" no contiene "@"`);
    this._email = valor;
  }

  /** Solo lectura y calculado: no se guarda, se evalúa cada vez que se lee. */
  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  /** Solo nombre y mayoría de edad: el dni y el email son datos sensibles y no se exponen acá. */
  get datosPublicos(): string {
    return `${this.nombre} — ${this.esMayorDeEdad ? 'mayor' : 'menor'} de edad`;
  }
}

// --- Bloque de prueba ---
if (import.meta.main) {
  const lucas = new Persona('40123456', 'Lucas', 25, 'lucas@mail.com');
  const sofia = new Persona('50987654', 'Sofía', 15, 'sofia@mail.com');

  console.log(lucas.datosPublicos);
  console.log(sofia.datosPublicos);
  console.log(`Edad de ${lucas.nombre}: ${lucas.edad} | email: ${lucas.email}`);

  sofia.edad = 18; // pasa por el setter
  console.log(`Sofía cumplió 18 → esMayorDeEdad: ${sofia.esMayorDeEdad}`);

  for (const edadInvalida of [-5, 150]) {
    try {
      lucas.edad = edadInvalida;
    } catch (error) {
      console.log(`Edad ${edadInvalida} rechazada:`, (error as Error).message);
    }
  }

  try {
    lucas.email = 'lucas.mail.com';
  } catch (error) {
    console.log('Email rechazado:', (error as Error).message);
  }

  lucas.nombre = 'Lucas Z.'; // público, sin restricciones
  console.log(lucas.datosPublicos);

  // lucas.dni;                  // Error de TypeScript: 'dni' es private
  // lucas.esMayorDeEdad = true; // Error de TypeScript: es un getter de solo lectura
}
