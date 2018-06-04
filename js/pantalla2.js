//4
function validarPantalla2 (direccion) {
	var procesador = $('input[name=resultadosProcesadores]:checked').val();
	//console.log("iii");
	//console.log(procesador);
	/*
	if (typeof procesador != "undefined" && tomarDatoDelDOM(procesador) != "") {
		return true;
	} else {
		return false;
	}
	*/

	if ( direccion == "adelante"  &&  (typeof procesador == "undefined" || procesador == "") ) {
		
		mostrarErrores([{ campo: "selectPlataformaProcesador", error: "Debe seleccionar un procesador"}]);
		return false;
		//return (typeof procesador != "undefined" && procesador != "");
	}

	return true;
};

// 15
function ordenarProcesadoresDesdeBD (data) {
    return data.concat().sort(function(a, b){
    	return parseInt(a.precio) > parseInt(b.precio)
    });
};

// 16
function construirResultadoProcesadores (data) {
	// data = TODOS los procesadores traidos desde BD

	// Separar en 2 arreglos: 1 de destacados y otro del restante
	var destacados = obtenerProcesadoresDestacados(data);

	for (var i=destacados.indexes.length-1; i>=0; i--)
			data.splice(destacados.indexes[i], 1);

	$(".resultados-procesadores").empty();

	var checked = "";
	// Destacados
	for (var i=0; i<destacados.data.length; i++) {
		checked = (i == 0) ? " checked" : "";
		var result = '<div class="form-check">'+
		  	'<input class="form-check-input is-valid" type="radio" name="resultadosProcesadores" id="procesador'+i+'" value="'+i+'"'+checked+'>'+
		  	'<label class="form-check-label" for="procesador'+i+'">'+
		    	destacados.data[i].nombre+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(destacados.data[i]))+'">'+
		'</div>';

		$(".resultados-procesadores").append(result);
	}

	// Restantes
	for (var j=0, k=i; j<data.length; j++, k++) {
		checked = (j == 0 && checked == "") ? " checked" : "";

		var result = '<div class="form-check">'+
		  	'<input class="form-check-input" type="radio" name="resultadosProcesadores" id="procesador'+k+'" value="'+k+'"'+checked+'>'+
		  	'<label class="form-check-label" for="procesador'+k+'">'+
		    	data[j].nombre+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(data[j]))+'">'+
		'</div>';

		$(".resultados-procesadores").append(result);
	}

	// Se coloca aquí debido a que el DOM que controla recién se creó
	$('input[name=resultadosProcesadores]').change(function() {
        // Cambiar imagen de procesador:
        var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-procesadores input[name=resultadosProcesadores]:checked").parent().find("input[type=hidden]").val() ) ).imagen;

		$(".img-procesador").empty().append("<img src='"+imgSrc+"'>");

    	$(".img-procesador").addClass("loader-in-bg");
    	setTimeout(function(){
    		calcularTamanoImagenPantalla2();
    	}, 500);
    });

	// Poner imagen inicial:
    var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-procesadores input[name=resultadosProcesadores]:checked").parent().find("input[type=hidden]").val() ) ).imagen;
	$(".img-procesador").empty().append("<img src='"+imgSrc+"'>");
		
	$(".img-procesador").addClass("loader-in-bg");
	setTimeout(function(){
		calcularTamanoImagenPantalla2();
	}, 500);	
};

// 17
function obtenerProcesadoresDestacados (procesadores) {
	var ultimaGeneracion = 0;
	/* Obtención de la última generación de los procesadores */
	for (var i=0; i<procesadores.length; i++) {
		if ( parseInt(procesadores[i].generacion)>ultimaGeneracion )
			ultimaGeneracion = parseInt(procesadores[i].generacion);
	}

	var destacados = {
		data: [],
		indexes: []
	};
	var presupuesto = parseFloat( $("#inputPresupuesto").val() );
	for (var i=0; i<procesadores.length; i++) {
		if ( ( parseInt(procesadores[i].generacion) == ultimaGeneracion ) && ( parseFloat(procesadores[i].precio) >= (presupuesto*0.13) && parseFloat(procesadores[i].precio) <= (presupuesto*0.15) ) ) {
			destacados.data.push(procesadores[i]);
			destacados.indexes.push(i);
		}
	}

	return destacados;
};

// 18
function calcularTamanoImagenPantalla2 () {
	$(".img-procesador > img").css("visibility", "hidden");

	$(".img-procesador > img").removeClass("imagen-ancho imagen-largo");
	if( $(".img-procesador > img").width() > $(".img-procesador > img").height() ) {
		$(".img-procesador > img").addClass("imagen-ancho");
	} else {
		$(".img-procesador > img").addClass("imagen-largo");
	}

	$(".img-procesador").removeClass("loader-in-bg");
	$(".img-procesador > img").css("visibility", "visible");
};

// 19
function construccionSelectResultadoPantalla2 (valor) {
	$("#selectResultadoPantalla2").empty(); // Quitar todos los OPTIONS del SELECT
	$("#selectResultadoPantalla2").append("<option>Ninguno</option>").attr("disabled", true);

	switch (valor) {
		case "0": // Ninguno
			$("#selectResultadoPantalla2").attr("disabled", true);
			// Arreglar filtrado para TODOS
			$(".resultados-procesadores .form-check").show();
		break;
		case "1": // Sockets
			var sockets = [];

			$(".resultados-procesadores > .form-check" ).each(function(index) {

				if(index == 0) {
					$("#selectResultadoPantalla2").empty().removeAttr("disabled");
				}

				var procesadorObject = JSON.parse(decodeURIComponent( $(this).find("input[type=hidden]").val() ) );
				var socket = procesadorObject.socket;

				// Busca sockets dintintos
				if( -1 == $.inArray( socket, sockets) ) {
					
					var result = '<option value="'+socket+'">'+socket+'</option>';
					$("#selectResultadoPantalla2").append(result);

					sockets.push(socket);
				}
			});

			filtrarPantalla2();
		break;
		case "2":  // Número de núcleos
			var nucleos = [];

			$(".resultados-procesadores > .form-check" ).each(function(index) {

				if(index == 0) {
					$("#selectResultadoPantalla2").empty().removeAttr("disabled");
				}

				var procesadorObject = JSON.parse(decodeURIComponent( $(this).find("input[type=hidden]").val() ) );
				var nucleo = procesadorObject.nroNucleos;

				// Busca sockets dintintos
				if( -1 == $.inArray( nucleo, nucleos) ) {
					
					var result = '<option value="'+nucleo+'">'+nucleo+'</option>';
					$("#selectResultadoPantalla2").append(result);

					nucleos.push(nucleo);
				}
			});

			filtrarPantalla2();
		break;
		default:
			alert("Error en switch");
	}
};

// 20
function filtrarPantalla2 () {   // el value que llegaba era el valor del INPUT TEXT

	$('input[name=resultadosProcesadores]').prop('checked', false);

    $(".resultados-procesadores .form-check").hide();
    $(".resultados-procesadores .form-check").filter(function(i, v) {

    	var elemento = JSON.parse(decodeURIComponent( $(v).find("input[type=hidden]").val() ));
		
    	switch ( $("#selectFiltradoPantalla2").val() ) {
    		case "1": // Socket
    			if( elemento.socket == $("#selectResultadoPantalla2").val() )
    				return true;
    		break;
    		case "2": // Núcleos
    			if( elemento.nroNucleos == $("#selectResultadoPantalla2").val() )
    				return true;
    		break;
    		default:
    			alert("Error en switch del filter");
    	}
    	
    	return false;    
    }).show();
};

$(document).ready(function() {

	// 10
	$("#selectPlataformaProcesador").change(function() {
		var plataforma = $(this).val();

		$(".resultados-procesadores").empty();
		$(".img-procesador").empty();
		quitarErroresDeTodo();
		$("#selectFiltradoPantalla2").val("0");
		$("#selectResultadoPantalla2").empty(); // Quitar todos los OPTIONS del SELECT
		$("#selectResultadoPantalla2").append("<option>Ninguno</option>").attr("disabled", true);


		$(".mostrarPreviaSeleccionPlataforma").removeClass("mostrar");	
				
		if (plataforma == "intel") {
			/* AQUÍ HACER BÚSQUEDA A LA BD de los procesadores Intel
			//
			*/

			$(".loader-plat-proc").addClass("mostrar");

			(function($) {
			    $.get("backend/obtenerProcesadoresIntel.php")
				.done(function(data) {
					//console.log(data);
					//console.log(ordenarProcesadoresDesdeBD(data));
					construirResultadoProcesadores( ordenarProcesadoresDesdeBD(data) );
				})
				.fail(function() {
					alert( "error" );
				})
				.always(function() {
					$(".loader-plat-proc").removeClass("mostrar");
					$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");
				});
			})(jQuery);


			/* SIMULACIÓN */
			/*
			$(".loader-plat-proc").addClass("mostrar");
			setTimeout(function(){
				$(".loader-plat-proc").removeClass("mostrar");
				$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");	
			}, 500);
			*/
		} else if (plataforma == "amd") {
			/* AQUÍ HACER BÚSQUEDA A LA BD de los procesadores AMD
			//
			*/

			/* SIMULACIÓN */
			$(".loader-plat-proc").addClass("mostrar");
			setTimeout(function(){
				$(".loader-plat-proc").removeClass("mostrar");
				$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");	
			}, 500);

			//$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");	
		} /*else {

			$(".mostrarPreviaSeleccionPlataforma").removeClass("mostrar");			
		}*/
	});

	// 13
	$("#selectFiltradoPantalla2").change(function() {
		var valor = $(this).val();
		construccionSelectResultadoPantalla2(valor);
		if (valor!="0") {
			filtrarPantalla2();
		    $(".resultados-procesadores .form-check").filter(":visible").filter(":first").find("input[name=resultadosProcesadores]").prop('checked', true).change();
		} else {
			$('input[name=resultadosProcesadores]').prop('checked', false);
			$("input[name=resultadosProcesadores]:first").prop('checked', true).change();
		}
	});

	// 14
	$("#selectResultadoPantalla2").change(function() {
		var valor = $(this).val();
		if (valor!="") {
			filtrarPantalla2();
		    $(".resultados-procesadores .form-check").filter(":visible").filter(":first").find("input[name=resultadosProcesadores]").prop('checked', true).change();
		}
	});

});