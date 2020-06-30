let express = require ("express");
const controllersMain  = require("../controllers/controllersMain");
let router = express.Router()

// Ruta Raíz / ➝ Home
router.get('/', controllersMain.saludo)


module.exports = router;
