function validacionDeFormulario(){
$('#localStorageForm')
  .formValidation({
    framework: 'bootstrap',
    icon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      question: {
        validators: {
          notEmpty: {
            message: 'La pregunta no puede ser vacía'
          }
        }
      },
      'option[]': {
        validators: {
          notEmpty: {
            message: 'La respuesta no puede ser vacía'
          },
          stringLength: {
            max: 100,
            message: 'La respuesta debe tener menos de 100 caracteres'
          }
        }
      }
    }
  })
  .on('click', '.botonAgregarRespuesta', function() {
    var $template = $('#optionTemplate'),
      $clone = $template
      .clone()
      .removeClass('hide')
      .attr('id', "respuesta" + this.cantRespuestas)
      .insertBefore($template),
      $option = $clone.find('[name="option[]"]');

    // agregado de nuevo campo al formulario
    $('#localStorageForm').formValidation('addField', $option);
  })

  // Manejo del boton agregar respuesta
  .on('click', '.botonBorrarRespuesta', function() {
    var $row = $(this).parents('.form-group'),
      $option = $row.find('[name="option[]"]');

    // Eliminar elemento conteniendo la opcion
    $row.remove();

    // Eliminar campo del formulario
    $('#localStorageForm').formValidation('removeField', $option);
  })

  // Llamada después de eliminar el campo
  .on('added.field.fv', function(e, data) {
    // data.field   --> nombre del campo
    // data.element --> el nuevo elemento del campo
    // data.options --> las nuevas opciones del campo

    if (data.field === 'option[]') {
      if ($('#localStorageForm').find(':visible[name="option[]"]').length >= 5) {
        $('#localStorageForm').find('.botonAgregarRespuesta').attr('disabled', 'disabled');
      }
    }
  })

  // Llamada después de eliminar el campo
  .on('removed.field.fv', function(e, data) {
    if (data.field === 'option[]') {
      if ($('#localStorageForm').find(':visible[name="option[]"]').length < 5) {
        $('#localStorageForm').find('.botonAgregarRespuesta').removeAttr('disabled');
      }
    }
  });
}