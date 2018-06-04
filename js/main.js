
// 1
function ocultarTabsSuperiores (tab) {
	var i = -1;
	$("#armado-navigation .nav-link").removeClass("disabled");

	switch (tab) {
		case "#uno": 		i = 1; break;
		case "#dos": 		i = 2; break;
		case "#tres": 		i = 3; break;
		case "#cuatro": 	i = 4; break;
		case "#cinco": 		i = 5; break;
		case "#sies": 		i = 6; break;
		case "#siete": 		i = 7; break;
		case "#ocho": 		i = 8; break;
		case "#nueve": 		i = 9; break;
		case "#diez": 		i = 10; break;
		case "#once": 		i = 11; break;
		case "#doce": 		i = 12; break;
		case "#trece": 		i = 13; break;
		case "#catorce": 	i = 14; break;
		case "#quince": 	i = 15; break;
		default:
			alert("Error en switch");
	}

	for (var i=i+1; i<=15; i++) {
		switch (i) {
			case 1: $("#uno-tab").addClass("disabled"); break;
			case 2: $("#dos-tab").addClass("disabled"); break;
			case 3: $("#tres-tab").addClass("disabled"); break;
			case 4: $("#cuatro-tab").addClass("disabled"); break;
			case 5: $("#cinco-tab").addClass("disabled"); break;
			case 6: $("#seis-tab").addClass("disabled"); break;
			case 7: $("#siete-tab").addClass("disabled"); break;
			case 8: $("#ocho-tab").addClass("disabled"); break;
			case 9: $("#nueve-tab").addClass("disabled"); break;
			case 10: $("#diez-tab").addClass("disabled"); break;
			case 11: $("#once-tab").addClass("disabled"); break;
			case 12: $("#doce-tab").addClass("disabled"); break;
			case 13: $("#trece-tab").addClass("disabled"); break;
			case 14: $("#catorce-tab").addClass("disabled"); break;
			case 15: $("#quince-tab").addClass("disabled"); break;
			default:
				alert("Error en switch");
		}
	}
};

// 2
function checkearCampos (pantActual, direccion) {
	switch (pantActual) {
		case "1": return validarPantalla1(); break;
		case "2": return validarPantalla2(direccion); break;
		case "3": return validarPantalla3(direccion); break;
		case "4": /* return validarPantalla4(); */ break;
		case "5": /* return validarPantalla5(); */ break;
		case "6": /* return validarPantalla6(); */ break;
		case "7": /* return validarPantalla7(); */ break;
		case "8": /* return validarPantalla8(); */ break;
		case "9": /* return validarPantalla9(); */ break;
		case "10": /* return validarPantalla10(); */ break;
		case "11": /* return validarPantalla11(); */ break;
		case "12": /* return validarPantalla12(); */ break;
		case "13": /* return validarPantalla13(); */ break;
		case "14": /* return validarPantalla14(); */ break;
		case "15": /* return validarPantalla15(); */ break;
		default:
			alert("Error en switch de checkearCampos()");
	};
	return false;
};

// 5
function tomarDatoDelDOM (elemento) {

	return elemento.val().trim();
};

// 7
function mostrarErrores (errores) {
	//console.log(errores);
	for (var i=0; i<errores.length; i++) {
		$("#"+errores[i].campo).addClass("is-invalid");
		$("#"+errores[i].campo).next(".invalid-feedback").text(errores[i].error);
	}
};

// 8
function quitarErroresDeTodo () {
	$("input.form-control").removeClass("is-invalid");
	$("select.form-control").removeClass("is-invalid");
};

// 9
function cambiarPantalla(pantallaActual, direccion) {
	//console.log("Pantalla actual: ", pantallaActual);
	//console.log("Dirección: ", direccion);
	//adelante atras

	var incremento = 0;
	if (direccion == "adelante")
		incremento++;
	else if (direccion == "atras") {
		incremento--;
	} else {
		alert("Error en función cambiarPantalla()");
		exit;
	}

	var pantallaNueva = parseInt(pantallaActual) + incremento;
	//console.log("Pantalla nueva: ", pantallaNueva);

	var elemento = "";
	switch (pantallaNueva) {
		case 0:	alert("Cambio de pantalla imposible / IZQUIERDA"); break;
		case 1:	elemento = "uno"; break;
		case 2: elemento = "dos"; break;
		case 3:	elemento = "tres"; break;
		case 4:	elemento = "cuatro"; break;
		case 5:	elemento = "cinco";	break;
		case 6:	elemento = "seis"; break;
		case 7:	elemento = "siete";	break;
		case 8:	elemento = "ocho"; break;
		case 9:	elemento = "nueve";	break;
		case 10: elemento = "diez";	break;
		case 11: elemento = "once";	break;
		case 12: elemento = "doce"; break;
		case 13: elemento = "trece"; break;
		case 14: elemento = "catorce"; break;
		case 15: elemento = "quince"; break;
		case 16: alert("Cambio de pantalla imposible / DERECHA"); break;
	}

	//console.log("Elemento: ", elemento);
	if (elemento != "") {
		$("#armado-navigation .nav-link").removeClass("disabled");
		$('#'+elemento+"-tab").tab('show');
	}
}

$(document).ready(function() {

	// Activar tooltips
	$('[data-toggle="tooltip"]').tooltip();

	$("#uno-tab").tab('show');
	ocultarTabsSuperiores("#uno");

	$('.presupuesto-nav').click(function(event){
		event.preventDefault();
		var data = $(this).attr('data-button');
	  	var direccion = data.split("-")[0];
		var pantallaActual = data.split("-")[1];

		/*	  	
	  	if ( checkearCampos(pantallaActual) )
	  		console.log("SEGUIR");
	  	else
	  		console.log("DENEGADO");
		*/

		if ( checkearCampos(pantallaActual, direccion) ) {
			cambiarPantalla(pantallaActual, direccion);
		}
	});

	// 11
	$('a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
		var tabAnterior = $(e.target).attr('href');
		var tabDestino = $(e.relatedTarget).attr('href')
		//console.log("ANTERIOR: ", $(e.target).attr('href') );

		if( tabAnterior == "#dos" && tabDestino == "#uno") {
			$(".mostrarPreviaSeleccionPlataforma").removeClass("mostrar");	
			$(".resultados-procesadores").empty();
			$(".img-procesador").empty();
			quitarErroresDeTodo();
			$("#selectPlataformaProcesador").val("");
		}
	});

	// 12
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var tabActual = $(e.target).attr('href');
		console.log("Tabla actual: ", tabActual);

		ocultarTabsSuperiores(tabActual);
	});

});