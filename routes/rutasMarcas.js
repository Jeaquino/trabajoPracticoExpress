let express = require ("express");
const controllersMarcas  = require("../controllers/controllersMarcas");
let router = express.Router()

// Ruta Raíz / ➝ Home
router.get('/', controllersMarcas.listarMarcas)

router.get('/:marca', controllersMarcas.listarAutos)

module.exports = router;