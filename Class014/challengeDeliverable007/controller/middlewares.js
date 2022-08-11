const admin = true;

const isAdmin = (req, res, next) => {
  if (!admin) {
    return res.status(403).json({error: 403, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizado`});
  } else {
    return next();
  }
}

const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(400).json({"error": 400, "descripcion": error.message});
}

const notFound = (req, res, next) => {
  return res.status(404).json({error: 404, descripcion: `Ruta ${req.url} método ${req.method} no implementados`});
}

module.exports = { isAdmin, errorHandler, notFound };