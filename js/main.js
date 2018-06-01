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

		if ( checkearCampos(pantallaActual) ) {
			cambiarPantalla(pantallaActual, direccion);
		}
	  	


	});


	function checkearCampos (pantActual) {
		switch (pantActual) {
			case "1": return validarPantalla1(); break;
			case "2": return true; /* return validarPantalla2(); */ break;
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

		$(".mostrarPreviaSeleccionPlataforma").removeClass("mostrar");	
				
		if (plataforma == "intel") {
			/* AQUÍ HACER BÚSQUEDA A LA BD de los procesadores Intel
			//
			*/

			/* SIMULACIÓN */
			$(".loader-plat-proc").addClass("mostrar");
			setTimeout(function(){
				$(".loader-plat-proc").removeClass("mostrar");
				$(".mostrarPreviaSeleccionPlataforma").addClass("mostrar");	
			}, 500);


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
		} else {
			$(".mostrarPreviaSeleccionPlataforma").removeClass("mostrar");			
		}
	});


	/* FILTRADO: Pantalla 2 */
	$("#pantalla2Lista tbody").addClass("search");
    
    $('#filterPantalla2').keyup(function() {
        filtrarPantalla2( $(this).val() );
    });

	$("#selectFiltradoPantalla2").change(function() {
	  	filtrarPantalla2( $('#filterPantalla2').val() );
	});


	function filtrarPantalla2 (value) {
		//var rex = new RegExp($(this).val(), 'i');
		var rex = new RegExp(value, 'i');

        // var $t = $(this).children(":eq(4))");
        $('.search tr ').hide();

        //Recusively filter the jquery object to get results.
        $('.search tr ').filter(function(i, v) {
          	//Get the 3rd column object here which is userNamecolumn
        	var indiceBusqueda = $("#selectFiltradoPantalla2").val();
            var $t = $(this).children(":eq(" + indiceBusqueda + ")");
            return rex.test($t.text());
        }).show();

        var element = $("#pantalla2Lista .search > tr:visible").length;
   		if( !element ) {
   			$("#pantalla2Lista tfoot").addClass("mostrar");
   		} else {
   			$("#pantalla2Lista tfoot").removeClass("mostrar");
   		}
	};




});