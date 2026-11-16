// Ejercicio 1 — Abstracción
// El Producto solo modela lo que importa para vender: nombre, precio, categoría y stock.
// Datos como el color del embalaje o el peso exacto existen en la realidad, pero no se usan para vender.

export class Producto {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  hayStock(cantidad: number): boolean {
    return cantidad > 0 && cantidad <= this.stock;
  }

  /**
   * Si no hay stock suficiente lanza un Error en lugar de solo mostrar un mensaje.
   * Justificación: una venta fallida es una situación que quien llama DEBE enterarse;
   * un console.log se puede ignorar sin querer, mientras que un Error obliga a manejarlo
   * (por ejemplo, con try/catch para avisarle al cliente que no se pudo vender).
   */
  venderUnidades(cantidad: number): void {
    if (!this.hayStock(cantidad)) {
      throw new Error(`No hay stock suficiente de "${this.nombre}" para vender ${cantidad} unidades (disponibles: ${this.stock})`);
    }
    this.stock -= cantidad;
  }

  /** Simula un descuento: devuelve el precio final sin modificar this.precio. */
  aplicarDescuento(porcentaje: number): number {
    if (porcentaje < 0 || porcentaje > 100) {
      throw new Error('El porcentaje de descuento debe estar entre 0 y 100');
    }
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

// --- Bloque de prueba ---
if (import.meta.main) {
  const teclado = new Producto('Teclado', 10000, 'electrónica', 5);
  const yerba = new Producto('Yerba 1kg', 4500, 'almacén', 20);

  console.log(teclado.describir());
  console.log(yerba.describir());

  console.log('¿Hay stock para 3 teclados?', teclado.hayStock(3));
  console.log('¿Hay stock para 10 teclados?', teclado.hayStock(10));

  teclado.venderUnidades(3);
  console.log('Después de vender 3:', teclado.describir());

  try {
    teclado.venderUnidades(10);
  } catch (error) {
    console.log('Venta rechazada:', (error as Error).message);
  }

  console.log('Precio con 20% de descuento:', teclado.aplicarDescuento(20));
  console.log('El precio original no cambia:', teclado.precio);
}
