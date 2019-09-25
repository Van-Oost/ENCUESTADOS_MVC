/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
      this.modelo.borrarPregunta(id);
  },

  agregaRespuesta: function() {
    this.modelo.agregaRespuesta();
  },

   
   sumarUnVotoRespuesta: function() {
    this.modelo.sumarUnVotoRespuesta();
  },

  
   editarPregunta: function() {
    this.modelo.editarPregunta();
  },

  
   borrarTodasPreguntas: function() {
    this.modelo.borrarTodasPreguntas();
  },
};
