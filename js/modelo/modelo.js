/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = this.abrir("preguntas");
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas = this.abrir("preguntas");
    this.preguntas.push(nuevaPregunta);
    this.guardar("preguntas", this.preguntas);
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    this.preguntas = this.abrir("preguntas");
    var index = this.preguntas.indexOf(id);
    this.preguntas.splice(index, 1);
    this.guardar("preguntas", this.preguntas);
    this.preguntaEliminada.notificar();
    
  },

  agregaRespuesta: function() {
  },

   
   sumarUnVotoRespuesta: function() {
  },

  
   editarPregunta: function() {
  },

  
   borrarTodasPreguntas: function() {
    this.preguntas = [];
    this.guardar("preguntas", this.preguntas);
  },


  abrir: function(clave){
    if (localStorage.getItem(clave) !== null){
      var string = localStorage.getItem(clave);
      return JSON.parse(string)
    } else return [];
  },

  guardar: function(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
  }

};
