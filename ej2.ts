// Ejercicio 2 — Encapsulamiento
// El saldo y el historial son privados: solo se modifican a través de depositar() y retirar(),
// que validan los montos antes de tocar el estado interno.

export class CuentaBancaria {
  readonly titular: string;
  private saldo: number;
  private historial: string[] = [];

  constructor(titular: string, saldoInicial: number) {
    if (saldoInicial < 0) throw new Error('El saldo inicial no puede ser negativo');
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(monto: number): void {
    if (monto <= 0) throw new Error('El monto a depositar debe ser mayor a 0');
    this.saldo += monto;
    this.historial.push(`depósito: +${monto}`);
  }

  retirar(monto: number): void {
    if (monto <= 0) throw new Error('El monto a retirar debe ser mayor a 0');
    if (monto > this.saldo) throw new Error(`Saldo insuficiente: se pidió ${monto} y hay ${this.saldo}`);
    this.saldo -= monto;
    this.historial.push(`retiro: -${monto}`);
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  /** Devuelve una copia: modificar el arreglo devuelto no altera el historial real. */
  obtenerHistorial(): string[] {
    return [...this.historial];
  }
}

// --- Bloque de prueba ---
if (import.meta.main) {
  const cuenta = new CuentaBancaria('Lucas Zigaran', 5000);
  console.log(`Cuenta de ${cuenta.titular} — saldo inicial: $${cuenta.consultarSaldo()}`);

  cuenta.depositar(2000);
  cuenta.retirar(1500);
  console.log('Saldo actual:', cuenta.consultarSaldo());

  for (const monto of [0, -100]) {
    try {
      cuenta.depositar(monto);
    } catch (error) {
      console.log(`Depósito de ${monto} rechazado:`, (error as Error).message);
    }
  }

  try {
    cuenta.retirar(100000);
  } catch (error) {
    console.log('Retiro rechazado:', (error as Error).message);
  }

  const copia = cuenta.obtenerHistorial();
  copia.push('depósito: +999999 (trampa)');
  console.log('Copia modificada desde afuera:', copia);
  console.log('Historial real de la cuenta:', cuenta.obtenerHistorial());

  // cuenta.saldo = 1000000;   // Error de TypeScript: 'saldo' es private
  // cuenta.historial = [];    // Error de TypeScript: 'historial' es private
}
