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

    saludo: function(req,res){
        res.send("Bienvenido a Automotores DH, donde encontraba su vehiculo ideal. Visitenos en nuestras sucrusales de: \n" + controllersMain.listarSucursales())        
    },
    
}
module.exports = controllersMain