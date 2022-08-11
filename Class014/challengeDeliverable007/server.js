const express = require("express");
const app = express();
const middlewares = require("./controller/middlewares");
const PORT = process.env.PORT || 8080;
const apiProductos = require('./router/productos')
const apiCarritos = require('./router/carritos')
const server = app.listen(PORT, () => {
  console.log(`Server running on port:  ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error server ${error}`));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', apiProductos);
app.use('/api/carrito', apiCarritos);
app.use(middlewares.errorHandler);
app.use(middlewares.notFound);


