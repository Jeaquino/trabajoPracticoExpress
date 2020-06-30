let express = require ("express");
const controllersSucursales  = require("../controllers/controllersSucursales");
let router = express.Router()

// Ruta Raíz / ➝ Home
router.get('/', controllersSucursales.listarSucursales)

router.get('/:sucursal', controllersSucursales.datosSucursales)

// Ruta Créditos
//router.get('/creditos', controllersSucursales.creditos)
  
module.exports = router;