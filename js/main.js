$(document).ready(function(){

	//$('#armado-navigation li:last-child a').tab('show');


	$('[data-toggle="tooltip"]').tooltip();


	$('.presupuesto-nav').click(function(event){
		event.preventDefault();
		var data = $(this).attr('data-button');
	  	var direccion = data.split("-")[0];
		var pantallaActual = data.split("-")[1];

	  	//alert(pantallaActual);


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


	function checkearCampos (pantActual, direccion) {
		switch (pantActual) {
			case "1": return validarPantalla1(); break;
			case "2": return validarPantalla2(direccion); break;
			case "3": /* return validarPantalla3(); */ break;
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
	};

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

	function tomarDatoDelDOM (elemento) {
		return elemento.val().trim();
	};

	function isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	};

	function mostrarErrores (errores) {
		//console.log(errores);
		for (var i=0; i<errores.length; i++) {
			$("#"+errores[i].campo).addClass("is-invalid");
			$("#"+errores[i].campo).next(".invalid-feedback").text(errores[i].error);
		}
	};

	function quitarErroresDeTodo () {
		$("input.form-control").removeClass("is-invalid");
		$("select.form-control").removeClass("is-invalid");
	};

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
			$('#'+elemento+"-tab").tab('show');
		}
	}



	$("#selectPlataformaProcesador").change(function() {
		var plataforma = $(this).val();

		$(".resultados-procesadores").empty();
		$(".img-procesador").empty();
		quitarErroresDeTodo();


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


			//$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");	
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
	})


	$("#selectFiltradoPantalla2").change(function() {
		var valor = $(this).val();
		construccionSelectResultadoPantalla2(valor);		
	});

	$("#selectResultadoPantalla2").change(function() {
		var valor = $(this).val();
		if (valor!="") {
			filtrarPantalla2();
		}
	});

	function ordenarProcesadoresDesdeBD (data) {
	    return data.concat().sort(function(a, b){
	    	return parseInt(a.precio) > parseInt(b.precio)
	    });
	};

	function construirResultadoProcesadores (data) {
		// data = TODOS los procesadores traidos desde BD

		// Separar en 2 arreglos: 1 de destacados y otro del restante
		var destacados = obtenerProcesadoresDestacados(data);

		for (var i=destacados.indexes.length-1; i>=0; i--)
   			data.splice(destacados.indexes[i], 1);

		//var restantes = obtenerProcesadoresRestantes(data);


		$(".resultados-procesadores").empty();

		// Destacados
		for (var i=0; i<destacados.data.length; i++) {
			var checked = (i == 0) ? " checked" : "";
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
		for (var i=0; i<data.length; i++) {
			var checked = (i == 0) ? " checked" : "";
			var result = '<div class="form-check">'+
			  	'<input class="form-check-input" type="radio" name="resultadosProcesadores" id="procesador'+i+'" value="'+i+'"'+checked+'>'+
			  	'<label class="form-check-label" for="procesador'+i+'">'+
			    	data[i].nombre+
			  	'</label>'+
			  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(data[i]))+'">'+
			'</div>';

			$(".resultados-procesadores").append(result);
		}




		// Se coloca aquí debido a que el DOM que controla recién se creó
		$('input[name=resultadosProcesadores]').change(function() {
	        // Cambiar imagen de procesador:
			$(".img-procesador").empty().append("<img src='"+data[ parseInt($('input[name=resultadosProcesadores]:checked').val()) ].imagen+"'>");

	    	$(".img-procesador").addClass("loader-in-bg");
	    	setTimeout(function(){
	    		calcularTamanoImagenPantalla2();
	    	}, 500);
	    });

		// Poner imagen inicial:
		$(".img-procesador").empty().append("<img src='"+data[ parseInt($('input[name=resultadosProcesadores]:checked').val()) ].imagen+"'>");
			
		$(".img-procesador").addClass("loader-in-bg");
		setTimeout(function(){
    		calcularTamanoImagenPantalla2();
    	}, 500);	
	};

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

	function filtrarPantalla2 () {   // el value que llegaba era el valor del INPUT TEXT
		//var rex = new RegExp($(this).val(), 'i');
		//var rex = new RegExp( $("#selectResultadoPantalla2").val(), 'i');

        // var $t = $(this).children(":eq(4))"); ESTO VENÍA YA COMENTADO
        //$('.search tr ').hide();
        $(".resultados-procesadores .form-check").hide();

        //Recusively filter the jquery object to get results.
        $(".resultados-procesadores .form-check").filter(function(i, v) {
        //$('.search tr ').filter(function(i, v) {

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
        	
          	//Get the 3rd column object here which is userNamecolumn
          	/*
        	var indiceBusqueda = $("#selectFiltradoPantalla2").val();
            var $t = $(this).children(":eq(" + indiceBusqueda + ")");
            return rex.test($t.text());
            */
        
        }).show();
	};

});