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

  
   editarPregunta: function(id) {
    this.modelo.editarPregunta(id);
  },

  
  borrarTodasPreguntas: function() {
    this.modelo.borrarTodasPreguntas();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.sumarUnVotoRespuesta(nombrePregunta,respuestaSeleccionada);
  },

};
