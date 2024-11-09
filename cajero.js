class Billete {
  //se establece la clase y el constructor primero.
  constructor(v, c) {
    this.valor = v;
    this.cantidad = c;
  }
}

function entregarDinero() {
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);
  for (var bi of caja) {
    if (dinero > 0) {
      div = Math.floor(dinero / bi.valor);

      if (div > bi.cantidad) {
        papeles = bi.cantidad;
      } else {
        papeles = div;
      }
      entregado.push(new Billete(bi.valor, papeles));
      dinero = dinero - bi.valor * papeles;
    }
  }

  if (dinero > 0) {
    resultado.innerHTML = "soy un cajero pobre y no tengo dinero :(";
  } else {
    for (var e of entregado) {
      if (e.cantidad > 0) {
        resultado.innerHTML +=
          e.cantidad + " billetes de $" + e.valor + "<br />";
      }
    }
  }
}

var caja = []; //se crea la variable caja con un array vacio.
var entregado = []; //variable vacia, billetes que se entregan al usuario.
caja.push(new Billete(100, 5));
caja.push(new Billete(50, 10)); //se hace .push de objetos.
caja.push(new Billete(20, 30));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 5));
var dinero = 0; //var plana y se coloca de una manera abierta.
var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultados");
var b = document.getElementById("Extraer");
b.addEventListener("click", entregarDinero);
