const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);

let controllersSucursal = {

    cantidadAutos: function(){
        let cantidad = 0;
        consecionarias.forEach(element => {
            cantidad += element.autos.length
        })
        return cantidad;
    },

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
        res.send("Bienvenido, Automotores DH cuenta con las siguientes sucursales: \n\n  " + 
        lista.map(producto =>
              `\n${producto.localidad}, 
              dirección:${producto.direccion}
              teléfono:${producto.telefono}\n
              \nTenemos en lista un total de ${controllersSucursal.cantidadAutos()} vehiculos, distribuidos en nuestras sucursales.`   
            ).join('')
            )
    },

    datosSucursales: function(req,res){
        let id = req.params.sucursal.toUpperCase()
        consecionarias.forEach(element => {
            if (element.sucursal.toUpperCase()==id){
                res.send("La sucurusal que usted eligio cuenta con un total de " + element.autos.length + " vehiculos.\n\nAqui tiene a su disposición los datos de la sucursal, y la lista de vehiculos disponibles\n\nSucursal: " + element.sucursal + "\nTeléfono: " + element.telefono + "\nDirección: " + element.direccion + "\n\n" + "Vehiculos: \n" + 
                element.autos.map(producto =>
                      `\n${producto.marca}\n
                      ${producto.modelo}\n
                      ${producto.anio}\n
                      ${producto.color}\n
                      `     
                    ).join('')
                )
            }
        })
        res.send("Disculpe la sucursal que usted ingreso no existe, por intente con otra")
    },
}
module.exports = controllersSucursal