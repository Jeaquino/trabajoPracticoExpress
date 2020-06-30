let express = require ("express");
const controllersAutos  = require("../controllers/controllersAutos");
let router = express.Router()

// Ruta Raíz / ➝ Home
router.get('/', controllersAutos.enviarAutos)

router.get('/:marca/:dato?', controllersAutos.filtrarAutos)

module.exports = router;