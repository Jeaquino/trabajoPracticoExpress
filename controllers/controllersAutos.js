const fs = require("fs")
const concesionariasjson = fs.readFileSync('./data/concesionarias.json', 'utf-8');
const consecionarias = JSON.parse(concesionariasjson);
let controllersAutos = {

    listarAutos: function(){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                    lista.push(element)
                })        
        })
        return lista
    },

    listarMarcas: function(){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                if(!lista.includes(element.marca))
                    lista.push(element.marca)
                })        
        })
        return lista
    },

    listarColores: function(){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                if(!lista.includes(element.color))
                    lista.push(element.color)
                })        
        })
        return lista
    },

    listarAnios: function(){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(element => {
                if(!lista.includes(element.anio))
                    lista.push(element.anio)
                })        
        })
        return lista
    },
    

    enviarAutos: function(req,res){
        res.send(controllersAutos.listarAutos())
    },


    filtrarAutos:function(req,res){
        var autos = controllersAutos.listarAutos()
        var marcas = controllersAutos.listarMarcas()
        var colores = controllersAutos.listarColores()
        var anios = controllersAutos.listarAnios()
        var dato = req.params.dato
        var marca = req.params.marca
        var lista = []
        
        if(!marcas.includes(marca)){
            res.send("Disculpe la marca que ingreso no se encuentra en nuestro catalogo")
        }
        
        if(dato != undefined){
            if(!colores.includes(dato) && !anios.includes(dato) ){
                res.send("Por favor verifique el dato ingresado, el mismo no se encuentra en nuestros filtros")
            }
         }

        let listaFiltradaPorMarca = autos.filter( element => element.marca.toUpperCase() == marca.toUpperCase())

        if(dato == undefined){
            res.send(listaFiltradaPorMarca)
        }
        else{
            listaFiltradaPorMarca.forEach(element => {
            if((element.color == dato) || (element.anio == dato)){
                lista.push(element)
            }
        })
        res.send(lista)
    }        
}

}
module.exports = controllersAutos