const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);

let controllersSucursal = {

    listarSucursales: function(req,res){
        let lista=[]
        consecionarias.forEach(element => {
            sucursal={
                localidad: element.sucursal,
                direccion: element.direccion,
                telefono: element.telefono
            }
            lista.push(sucursal)
        })
        res.send(lista)
    },

    datosSucursales: function(req,res){
        let id = req.params.sucursal.toUpperCase()
        consecionarias.forEach(element => {
            if (element.sucursal.toUpperCase()==id){
                res.send(element)
            }
        })
        res.send("Disculpe la sucursal que usted ingreso no existe, por intente con otra")
    },
}
module.exports = controllersSucursal