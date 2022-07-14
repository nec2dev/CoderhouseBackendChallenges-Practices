const contenedor = require('../model/model.js')

exports.consultaProductos = async (req,res)=>{
	let allProducts = await contenedor.getAll();
	res.status(200).json(allProducts);
};

exports.consultaProductoId = async (req,res)=>{
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.send({ error: `El parámetro ${req.params.id} no es un número.`});
    } else {
        let product = await contenedor.getById(id);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(400).json({error: `Producto no encontrado con el id número: ${id}.`});
        }
    }
};

exports.saveProducto = async (req,res)=>{
    let product = req.body;
	let id = await contenedor.save(product);
	res.status(201).json({id});
};

exports.saveProductoHtml = async (req,res)=>{
    let product = req.body;
    let id = await contenedor.save(product)
    res.redirect('/');
};

exports.updateProductoId = async (req,res)=>{
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.send({ error: `El parámetro ${req.params.id} no es un número.`});
    } else {
        let product = await contenedor.getById(id);
        if(product !== null){
            console.log(id, req.body);
            await contenedor.updateById(id, req.body);
            res.status(200).json({mensaje: `Se ha actualizado el producto ${id}`});
        }else{
            res.status(400).json({error: `Producto no encontrado con el id número: ${id}.`});
        }
    }
};

exports.deleteProductoId = async (req,res)=>{
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.send({ error: `El parámetro ${req.params.id} no es un número.`});
    } else {
        let product = await contenedor.getById(id);
        if(product){
            await contenedor.deleteById(id)
            res.status(200).json({mensaje: `Se ha eliminado el producto ${id}`});
        }else{
            res.status(400).json({error: `Producto no encontrado con el id número: ${id}.`});
        }
    }
};
