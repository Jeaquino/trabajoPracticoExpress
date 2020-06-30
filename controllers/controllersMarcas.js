const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);

let controllerMarcas = {
    
    chequearMarcas: function(){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                if(!lista.includes(element.marca)){
                    lista.push(element.marca)
                }
            })        
        })
        return lista
    },

    listarMarcas: function(req,res){
        res.send("Las marcas con la cuales trabajamos son:\n" + controllerMarcas.chequearMarcas())
    },


    listarAutos:function(req,res){
        let lista=[]
        let id = req.params.marca
        if(!controllerMarcas.chequearMarcas().includes(id)){
            res.send("Disculpe la marca que ingreso no se encuentra en nuestro catalogo")
        }
        else{
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                if(element.marca==id){
                    auto = {
                        marca: element.marca,
                        modelo: element.modelo,
                        anio: element.anio
                    }
                    lista.push(auto)
                }
            })        
        })
        res.send(lista)
    }
},

}
module.exports = controllerMarcas