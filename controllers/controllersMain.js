const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);
let controllersMain = {

    listarSucursales: function(){
        let lista=[]
        consecionarias.forEach(element => {
            lista.push(element.sucursal)
        })
        return lista
    },

    cantidadAutos: function(){
        let cantidad = 0;
        consecionarias.forEach(element => {
            cantidad += element.autos.length
        })
        return cantidad;
    },

    saludo: function(req,res){
        res.send("Bienvenido a Automotores DH, donde encontrara su vehiculo ideal. Visitenos en nuestras sucrusales de: \n" + controllersMain.listarSucursales() + "\n\nContamos con un total de " + controllersMain.cantidadAutos() + " vehiculos en lista, no dude en realizar su consulta")
           
    },
    
}

module.exports = controllersMain