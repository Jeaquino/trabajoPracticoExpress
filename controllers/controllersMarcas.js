const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);

let controllerMarcas = {

    cantidadAutos: function(){
        let cantidad = 0;
        consecionarias.forEach(element => {
            cantidad += element.autos.length
        })
        return cantidad;
    },
    
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
        let lista = controllerMarcas.chequearMarcas(); 
        res.send("Las marcas con la cuales trabajamos son:\n" + 
        lista.map(producto =>
             `\n*${producto}`).join('')
        + "\n\nTenemos un total de " + controllerMarcas.cantidadAutos() + " vehiculos en nuestra lista"
        ) 
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
                        color: element.color,
                        modelo: element.modelo,
                        anio: element.anio
                    }
                    lista.push(auto)
                }
            })        
        })
        res.send("Contamos con los siguientes modelos de " + id + "\n\n" + 
        lista.map(producto =>
            `\n${producto.modelo}, 
            Color:${producto.color}
            año:${producto.anio}\n
            `   
          ).join('') + "\n\n en total son " + lista.length + " modelos"
        )
    }
},

}
module.exports = controllerMarcas