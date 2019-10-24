/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = this.abrir("preguntas");
  this.ultimoId = 0;
  this.preguntaNueva = true;
  this.preguntaEditada = null;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
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
    if (this.preguntaNueva){
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      "textoPregunta": nombre, 
      "id": id,
      "cantidadPorRespuesta": respuestas
      };
    this.preguntas.push(nuevaPregunta);
    } else {
      this.editarExistente(nombre, respuestas)
    }
    this.guardar("preguntas", this.preguntas);
    this.preguntaAgregada.notificar();
    this.preguntaNueva = true;
    this.borrarInputs();
    this.blanquearInputs();
  },

  borrarPregunta: function(id) {
    this.preguntas = this.abrir("preguntas");
    var index = this.posicionId(id);
    this.preguntas.splice(index, 1);
    this.guardar("preguntas", this.preguntas);
    this.preguntaEliminada.notificar();
    
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
    this.blanquearInputs();
    
    this.preguntaNueva = false;    
    var index = this.posicionId(id);
    var pregunta = this.preguntas[index]
    this.preguntaEditada = pregunta;
    var cantRespuestas = pregunta.cantidadPorRespuesta.length;
    var inputsRespuestas = document.getElementsByClassName("form-control");
    
    this.crearInputs(inputsRespuestas, cantRespuestas);

    // scrollea la pantalla hasta arriba
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    // rellena los input fields con el nombre de la pregunta y sus respuestas
    $("#pregunta").val(pregunta.textoPregunta);
     for(i = 0; i < inputsRespuestas.length; i++) {
      if(typeof pregunta.cantidadPorRespuesta[i] !== "undefined"){
        inputsRespuestas[i].value = pregunta.cantidadPorRespuesta[i].textoRespuesta;
      }
    };   
  },
  
  // borra todas las preguntas y guarda la lista vacia en el storage local
   borrarTodasPreguntas: function() {
    this.preguntas.length = 0;
    this.guardar("preguntas", this.preguntas);
    this.preguntasBorradas.notificar();
  },

  // trae la lista de preguntas desde el storage local
  abrir: function(clave){
    if (localStorage.getItem(clave) !== null){
      var string = localStorage.getItem(clave);
      return JSON.parse(string)
    } else return [];
  },

  // guarda la lista de preguntas en el storage local
  guardar: function(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
  },

  // busca la posicion de una pregunta en la lista basandose en su id
  posicionId: function(idBuscado) {
    var arrIds = this.preguntas.map(pregunta => pregunta.id)
    var index = arrIds.indexOf(parseInt(idBuscado));
    return index;
  },

  // al apretar el boton Guardar Pregunta, si la pregunta ya existia la sobreescribe en su antiguo lugar en la lista
  editarExistente: function(nombre, respuestas){
    this.preguntas.forEach(preg => {
      pregEditada = this.preguntaEditada;
      if(preg.id===pregEditada.id){

        preg.textoPregunta = nombre
        preg.id = pregEditada.id
        var nuevasRespuestas = respuestas;
         for (i= 0; i < respuestas.length; i++) {
           if(typeof preg.cantidadPorRespuesta[i] != "undefined"){
            if (nuevasRespuestas[i].textoRespuesta === preg.cantidadPorRespuesta[i].textoRespuesta){
              nuevasRespuestas[i].cantidad = preg.cantidadPorRespuesta[i].cantidad;
            } 
          }
        }
      preg.cantidadPorRespuesta = nuevasRespuestas;
      }
    });
  },

  // Blanquea los inputs 
  blanquearInputs: function(){
    var inputsRespuestas = document.getElementsByClassName("form-control");
    for (i = 0; i < inputsRespuestas.length; i++) {
      inputsRespuestas[i].value="";
    };
  },

  // elimina inputs creados si hay mas de 5
  borrarInputs: function(){
    var inputsRespuestas = document.getElementsByClassName("form-group answer has-feedback");
    for (i = 0; i < inputsRespuestas.length; i++) {
        if(i > 5){
          inputsRespuestas[i].parentNode.removeChild(inputsRespuestas[i])
        };
      }; 
  },

  // crea los input fields necesarios para poder rellenarlos con las respuestas existentes
  crearInputs: function(inputsRespuestas, cantRespuestas){
    if(inputsRespuestas.length <= cantRespuestas ){
      for (let index = 0; index < cantRespuestas -1; index++) {
        var $template = $('#optionTemplate'),
        $clone = $template
        .clone()
        .removeClass('hide')
        .attr('id', "respuesta" + this.cantRespuestas)
        .insertBefore($template),
        $option = $clone.find('[name="option[]"]');
      }
    }
  }
  

};
