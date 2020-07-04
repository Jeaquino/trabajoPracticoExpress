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

    cantidadAutos: function(){
        return controllersAutos.listarAutos().length
    },
    

    enviarAutos: function(req,res){
        res.send("Bienvenido, aqui podra encontrar las lista de nuestro vehiculos\n\n" + 
            controllersAutos.listarAutos().map(producto =>
            `\n*${producto.marca}, Modelo:${producto.modelo}, Año:${producto.anio}, Color:${producto.color}\n
            `   
          ).join(''))
    },

    filtrarPorMarca: function(marca){
        let lista=[]
        consecionarias.forEach(element => {
            element.autos.forEach(producto => {
                    if(producto.marca==marca){
                        vehiculo = {
                            modelo: producto.modelo,
                            color: producto.color,
                            anio: producto.anio,
                            sucursal: element.sucursal
                        }
                    lista.push(vehiculo)
                    }
                })        
        })
        return lista
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
                if( typeof dato == Number){
                res.send("No tenemos modelos de ese año")
                }
                else{
                    res.send("En color ingresado no se encuentra disponible " + typeof dato + " " + (typeof dato == Number))
                }
            }
         }

        let listaFiltradaPorMarca = controllersAutos.filtrarPorMarca(marca)

        if(dato == undefined){
            res.send(" Contamos con " + listaFiltradaPorMarca.length + " vehiculos de la marca selecionada.\nLos modelos son:\n" +
            listaFiltradaPorMarca.map(producto =>
                `\n*Modelo:${producto.modelo}, Año:${producto.anio}, Color:${producto.color}, Sucursal:${producto.sucursal}\n
                `   
              ).join('')
            )
        }
        else{
            listaFiltradaPorMarca.forEach(element => {
            if((element.color == dato) || (element.anio == dato)){
                lista.push(element)
            }
        })
        res.send(" Estos son los elemntos que coinciden con su busqueda, son " + lista.length + " vehiculos.\nLos modelos son:\n" +
        lista.map(producto =>
            `\n*Modelo:${producto.modelo}, Año:${producto.anio}, Color:${producto.color}, Sucursal:${producto.sucursal}\n
            `   
          ).join('')
        )
    }        
}

}
module.exports = controllersAutos