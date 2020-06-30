let express = require("express")
let app = express()

let rutasSucursales = require("./routes/rutasSucursales.js")
let rutasAutos = require("./routes/rutasAutos.js")
let rutasMarcas = require("./routes/rutasMarcas.js")
let rutasMain = require("./routes/rutasMain.js")

// Levantando el Servidor en el puerto 3030
app.listen(3030, () => console.log('Server running in 3030 port'));

app.use("/sucursales", rutasSucursales);
app.use("/autos", rutasAutos);
app.use("/marcas", rutasMarcas);
app.use("/", rutasMain);


// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!')
});