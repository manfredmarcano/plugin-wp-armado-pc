function validarPantalla4 (direccion) {
	var gabinete = $('input[name=resultadosGabinetes]:checked').val();

	if ( direccion == "adelante"  &&  (typeof gabinete == "undefined" || gabinete == "") ) {
		$(".msj-error-gabinetes-2").addClass("mostrar");
		//mostrarErrores([{ campo: "selectPlataformaProcesador", error: "Debe seleccionar una placa madre"}]);
		return false;
	}
	return true;
};

function ordenarGabinetesDesdeBD (data) {
    return data.concat().sort(function(a, b){
    	return parseInt(a.precio) > parseInt(b.precio)
    });
};

function construirResultadosGabinetes (data) {
	// data = TODOS las placas madres traidas desde BD

	// Separar en 2 arreglos: 1 de destacados y otro del restante
	var destacados = obtenerGabinetesDestacados(data);

	for (var i=destacados.indexes.length-1; i>=0; i--)
		data.splice(destacados.indexes[i], 1);

	$(".resultados-gabinetes").empty();

	var checked = "";
	// Destacados
	for (var i=0; i<destacados.data.length; i++) {
		checked = (i == 0) ? " checked" : "";
		var result = '<div class="form-check">'+
		  	'<input class="form-check-input is-valid" type="radio" name="resultadosGabinetes" id="gabinete'+i+'" value="'+i+'"'+checked+'>'+
		  	'<label class="form-check-label" for="gabinete'+i+'">'+
		    	destacados.data[i].nombre+" ("+destacados.data[i].precio+")"+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(destacados.data[i]))+'">'+
		'</div>';

		$(".resultados-gabinetes").append(result);
	}

	// Restantes
	for (var j=0, k=i; j<data.length; j++, k++) {
		checked = (j == 0 && checked == "") ? " checked" : "";

		var result = '<div class="form-check">'+
		  	'<input class="form-check-input" type="radio" name="resultadosGabinetes" id="gabinete'+k+'" value="'+k+'"'+checked+'>'+
		  	'<label class="form-check-label" for="gabinete'+k+'">'+
		    	data[j].nombre+" ("+data[j].precio+" $)"+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(data[j]))+'">'+
		'</div>';

		$(".resultados-gabinetes").append(result);
	}

	// Se coloca aquí debido a que el DOM que controla recién se creó
	$('input[name=resultadosGabinetes]').change(function() {
        // Cambiar imagen de placa madre:
        var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-gabinetes input[name=resultadosGabinetes]:checked").parent().find("input[type=hidden]").val() ) ).imagen;

		$(".img-gabinete").empty().append("<img src='"+imgSrc+"'>");

    	$(".img-gabinete").addClass("loader-in-bg");
    	setTimeout(function(){
    		calcularTamanoImagenPantalla4();
    	}, 500);
    });

	// Poner imagen inicial:
    var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-gabinetes input[name=resultadosGabinetes]:checked").parent().find("input[type=hidden]").val() ) ).imagen;
	$(".img-gabinete").empty().append("<img src='"+imgSrc+"'>");
		
	$(".img-gabinete").addClass("loader-in-bg");
	setTimeout(function(){
		calcularTamanoImagenPantalla4();
	}, 500);
};

function obtenerGabinetesDestacados (gabinetes) {
	var destacados = {
		data: [],
		indexes: []
	};
	var presupuesto = parseFloat( $("#inputPresupuesto").val() );
	for (var i=0; i<gabinetes.length; i++) {
		if ( parseFloat(gabinetes[i].precio) >= (presupuesto*0.05) && parseFloat(gabinetes[i].precio) <= (presupuesto*0.07) ) {
			destacados.data.push(gabinetes[i]);
			destacados.indexes.push(i);
		}
	}

	return destacados;
};

function calcularTamanoImagenPantalla4 () {
	$(".img-gabinete > img").css("visibility", "hidden");

	$(".img-gabinete > img").removeClass("imagen-ancho imagen-largo");
	if( $(".img-gabinete > img").width() > $(".img-gabinete > img").height() ) {
		$(".img-gabinete > img").addClass("imagen-ancho");
	} else {
		$(".img-gabinete > img").addClass("imagen-largo");
	}

	$(".img-gabinete").removeClass("loader-in-bg");
	$(".img-gabinete > img").css("visibility", "visible");
};

function construccionSelectResultadoPantalla4 (valor) {
	$("#selectResultadoPantalla4").empty(); // Quitar todos los OPTIONS del SELECT
	$("#selectResultadoPantalla4").append("<option>Ninguno</option>").attr("disabled", true);

	switch (valor) {
		case "0": // Ninguno
			$("#selectResultadoPantalla4").attr("disabled", true);
			// Arreglar filtrado para TODOS
			$(".resultados-gabinetes .form-check").show();
		break;
		case "1": // Marca
			var marcas = [];

			$(".resultados-gabinetes > .form-check" ).each(function(index) {

				if(index == 0) {
					$("#selectResultadoPantalla4").empty().removeAttr("disabled");
				}

				var gabineteObject = JSON.parse(decodeURIComponent( $(this).find("input[type=hidden]").val() ) );
				var marca = gabineteObject.marca;

				// Buscar marcas dintintos
				if( -1 == $.inArray(marca, marcas) ) {
					
					var result = '<option value="'+marca+'">'+marca+'</option>';
					$("#selectResultadoPantalla4").append(result);

					marcas.push(marca);
				}
			});

			filtrarPantalla4();
		break;
		default:
			alert("Error en switch");
	}
};

function filtrarPantalla4 () {   // el value que llegaba era el valor del INPUT TEXT
	//$('input[name=resultadosPlacasMadres]').removeAttr('checked');
	$('input[name=resultadosGabinetes]').prop('checked', false);

    $(".resultados-gabinetes .form-check").hide();
    $(".resultados-gabinetes .form-check").filter(function(i, v) {

    	var elemento = JSON.parse(decodeURIComponent( $(v).find("input[type=hidden]").val() ));
		
    	switch ( $("#selectFiltradoPantalla4").val() ) {
    		case "1": // Marca
    			if( elemento.marca == $("#selectResultadoPantalla4").val() )
    				return true;
    		break;
    		default:
    			alert("Error en switch del filter");
    	}
    	
    	return false;
    
    }).show(); 
};

$(document).ready(function() {

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var tabActual = $(e.target).attr('href');

		if (tabActual == "#cuatro") {

			/* Limpiar campos previamente */
			$(".mostrarPreviaObtencionGabinetes").removeClass("mostrar");	
			$(".resultados-gabinetes").empty();
			$(".img-gabinete").empty();
			$(".msj-error-gabinetes-1").removeClass("mostrar");
			$(".msj-error-gabinetes-2").removeClass("mostrar");
			

			var capacidadPlacaMadre = JSON.parse(decodeURIComponent( $(".resultados-placa-madre input[name=resultadosPlacasMadres]:checked").parent().find("input[type=hidden]").val() ) ).forma;

			$(".loader-gabinetes").addClass("mostrar");
			(function($) {
			    $.post("backend/obtenerGabinetesSegunPlacaMadre.php", { capacidadPlacaMadre: capacidadPlacaMadre })
				.done(function(data) {
					console.log(data);
					if(data.length == 0) {
						$(".msj-error-gabinetes-1").addClass("mostrar");
					} else {
						$(".mostrarPreviaObtencionGabinetes").addClass("mostrar");
						construirResultadosGabinetes( ordenarGabinetesDesdeBD(data) );
					}
				})
				.fail(function() {
					alert( "error" );
				})
				.always(function() {
					$(".loader-gabinetes").removeClass("mostrar");
				});
			})(jQuery);
		}
	});

	$("#selectFiltradoPantalla4").change(function() {
		var valor = $(this).val();
		construccionSelectResultadoPantalla4(valor);
		if (valor!="0") {
			filtrarPantalla4();
		    $(".resultados-gabinetes .form-check").filter(":visible").filter(":first").find("input[name=resultadosGabinetes]").prop('checked', true).change();
		} else {
			$('input[name=resultadosGabinetes]').prop('checked', false);
			$("input[name=resultadosGabinetes]:first").prop('checked', true).change();
		}
	});

	$("#selectResultadoPantalla4").change(function() {
		var valor = $(this).val();
		if (valor!="") {
			filtrarPantalla4();
		    $(".resultados-gabinetes .form-check").filter(":visible").filter(":first").find("input[name=resultadosGabinetes]").prop('checked', true).change();
		}
	});

});