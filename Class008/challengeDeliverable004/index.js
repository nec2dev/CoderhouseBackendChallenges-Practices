const express = require ('express');
const app = express();
const port = 8080;
const routes = require('./router/routes.js');
const serverExpress = app.listen(port, () => {
    console.log(`Server running on port: ${serverExpress.address().port}`);
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('view'));
app.use('/api/productos', routes.allProducts);
app.use('/api/productos', routes.idProduct);
app.use('/api/productos', routes.newProduct);
app.use('/api/productos', routes.newProductHtml);
app.use('/api/productos', routes.updateProduct);
app.use('/api/productos', routes.deleteProduct);
serverExpress.on('error', (error) => {`Error server: ${error}`});
