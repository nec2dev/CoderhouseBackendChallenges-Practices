const Contenedor = require("./challengueDeliverable002.js").default;

const run = async function () {
  let contenedor = new Contenedor("products.txt");

  contenedor.save({
    title: "Wow! Box001",
    precio: 560.0,
    thumbnail: "../assets/img/Box001.png"
  })

  contenedor.save({
    title: "Wow! Box002",
    price: 940.5,
    thumbnail: "../assets/img/Box002.png"
  })

  contenedor.save({
    title: "Wow! Box003",
    price: 320.0,
    thumbnail: "../assets/img/Box003.png"
  })

  contenedor.save({
    title: "Wow! Box004",
    price: 450.0,
    thumbnail: "../assets/img/Box004.png"
  })

  contenedor.save({
    title: "Wow! Box005",
    price: 500.0,
    thumbnail: "../assets/img/Box005.png"
  })

  contenedor.save({
    title: "Wow! Box006",
    price: 1028.0,
    thumbnail: "../assets/img/Box006.png"
  })

  contenedor.save({
    title: "Wow! Box007",
    price: 560.0,
    thumbnail: "../assets/img/Box007.png"
  })

  contenedor.save({
    title: "Wow! Box008",
    price: 1360.0,
    thumbnail: "../assets/img/Box008.png"
  })

  contenedor.save({
    title: "Wow! Box009",
    precio: 360.0,
    thumbnail: "../assets/img/Box009.png"
  })

  console.log(contenedor.getById(2));
  console.log(contenedor.getById(5));
  console.log(contenedor.getAll());
  console.log(contenedor.deleteById(1));
  console.log(contenedor.deleteById(6));
  console.log(contenedor.getAll());
  // contenedor.deleteAll();
  // console.log(contenedor.getAll());
};

run();
