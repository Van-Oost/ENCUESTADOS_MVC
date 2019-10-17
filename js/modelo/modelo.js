/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = this.abrir("preguntas");
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaModificada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length < 1) {
      return 0;
    };
   for (var i = 0; i < this.preguntas.length; i++) {
    if(this.preguntas[i].id > this.ultimoId) {
      this.ultimoId = this.preguntas[i].id;
    };
   };
   return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      "textoPregunta": nombre, 
      "id": id,
      "cantidadPorRespuesta": respuestas
      };
    this.preguntas = this.abrir("preguntas");
    this.preguntas.push(nuevaPregunta);
    this.guardar("preguntas", this.preguntas);
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    this.preguntas = this.abrir("preguntas");
    var index = this.posicionId(id);
    this.preguntas.splice(index, 1);
    this.guardar("preguntas", this.preguntas);
    this.preguntaEliminada.notificar();
    
  },

  agregaRespuesta: function() {
  },
   
  sumarUnVotoRespuesta: function(nombrePregunta,respuestaSeleccionada) {
    var pregunta = nombrePregunta;
    var respuesta = respuestaSeleccionada;
    console.log(preguntas);
    this.preguntas.forEach(preg => {
      if(preg.textoPregunta===pregunta){
        preg.cantidadPorRespuesta.forEach(resp => {
          if(resp.textoRespuesta===respuesta){
            resp.cantidad++;
          };
        });
      }
    });
    this.guardar("preguntas", this.preguntas);
  },



  
   editarPregunta: function(id) {
    var index = this.posicionId(id);
    var nuevoTexto = prompt("Ingrese nueva pregunta");
    this.preguntas[index].textoPregunta = nuevoTexto;
    this.guardar("preguntas", this.preguntas);
    this.preguntaModificada.notificar();
  },

  
   borrarTodasPreguntas: function() {
    this.preguntas.length = 0;
    this.guardar("preguntas", this.preguntas);
    this.preguntasBorradas.notificar();
  },


  abrir: function(clave){
    if (localStorage.getItem(clave) !== null){
      var string = localStorage.getItem(clave);
      return JSON.parse(string)
    } else return [];
  },

  guardar: function(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
  },

  posicionId: function(idBuscado) {
    var arrIds = this.preguntas.map(pregunta => pregunta.id)
    var index = arrIds.indexOf(parseInt(idBuscado));
    return index;
  },

};
