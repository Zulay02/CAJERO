class Billete {
  //se establece la clase y el constructor primero.
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
  }
}

function entregarDinero() {
  // Se limpia el resultado del retiro anterior.
  resultado.innerHTML = "";
  let entregado = []; // billetes que se entregan en ESTE retiro.

  let t = document.getElementById("dinero");
  let dinero = parseInt(t.value);

  // Se revisa que la cantidad escrita sea valida.
  if (isNaN(dinero) || dinero <= 0) {
    resultado.innerHTML = "Escribe una cantidad mayor que cero.";
    return;
  }
  if (dinero % 5 != 0) {
    resultado.innerHTML = "La cantidad debe ser múltiplo de 5.";
    return;
  }

  // Primero se calcula cuantos billetes de cada valor se necesitan,
  // sin tocar todavia la caja.
  let pendiente = dinero;
  for (let bi of caja) {
    if (pendiente > 0) {
      let div = Math.floor(pendiente / bi.valor);
      let papeles = Math.min(div, bi.cantidad);
      if (papeles > 0) {
        entregado.push(new Billete(bi.valor, papeles));
        pendiente = pendiente - bi.valor * papeles;
      }
    }
  }

  if (pendiente > 0) {
    // No alcanza: no se descuenta nada de la caja.
    resultado.innerHTML = "soy un cajero pobre y no tengo dinero :(";
  } else {
    // Si alcanza: se entregan los billetes y se descuentan de la caja.
    for (let e of entregado) {
      for (let bi of caja) {
        if (bi.valor == e.valor) {
          bi.cantidad = bi.cantidad - e.cantidad;
        }
      }
      resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br />";
    }
  }

  mostrarSaldo();
}

function mostrarSaldo() {
  // Muestra cuanto dinero le queda al cajero.
  let total = 0;
  for (let bi of caja) {
    total = total + bi.valor * bi.cantidad;
  }
  saldo.innerHTML = "Dinero disponible en el cajero: $" + total;
}

var caja = []; //se crea la variable caja con un array vacio.
caja.push(new Billete(100, 5));
caja.push(new Billete(50, 10)); //se hace .push de objetos.
caja.push(new Billete(20, 30));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 5));

var resultado = document.getElementById("resultados");
var saldo = document.getElementById("saldo");
var b = document.getElementById("Extraer");
b.addEventListener("click", entregarDinero);
mostrarSaldo();
