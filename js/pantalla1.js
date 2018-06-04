//3
function validarPantalla1 () {
	var presupuestoMax = tomarDatoDelDOM( $("#inputPresupuesto") );
	var nombre = tomarDatoDelDOM( $("#inputNombre") );
	var apellido = tomarDatoDelDOM( $("#inputApellido") );
	var correo = tomarDatoDelDOM( $("#inputEmail") );
	var errores = [];
	quitarErroresDeTodo();

	//alert(presupuestoMax+"-"+nombre+"-"+apellido+"-"+correo);

	// Presupuesto
	if (presupuestoMax=="") {
		errores.push({ campo: "inputPresupuesto", error: "No puede quedar vacío"});
	} else if (isNaN(presupuestoMax)) {
		errores.push({ campo: "inputPresupuesto", error: "Debe ingresar un número válido"});
	}

	// Nombre
	if (nombre=="") {
		errores.push({ campo: "inputNombre", error: "No puede quedar vacío"});
	}

	// Apellido
	if (apellido=="") {
		errores.push({ campo: "inputApellido", error: "No puede quedar vacío"});
	}

	// Correo
	if (correo=="") {
		errores.push({ campo: "inputEmail", error: "No puede quedar vacío"});
	} else if( !isValidEmailAddress( correo ) ) {
		errores.push({ campo: "inputEmail", error: "Debe ingresar un corre válido"});
	}

	// Resultados de la evaluación
	if (errores.length>0) {
		mostrarErrores(errores);
		return false;
	}

	return true; 
}

// 6
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

$(document).ready(function() {

});