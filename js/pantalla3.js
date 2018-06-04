function validarPantalla3 (direccion) {
	var placa = $('input[name=resultadosPlacasMadres]:checked').val();

	if ( direccion == "adelante"  &&  (typeof placa == "undefined" || placa == "") ) {
		$(".msj-error-placasMadres-2").addClass("mostrar");
		//mostrarErrores([{ campo: "selectPlataformaProcesador", error: "Debe seleccionar una placa madre"}]);
		return false;
	}

	return true;
};

function ordenarPlacasMadresDesdeBD (data) {
    return data.concat().sort(function(a, b){
    	return parseInt(a.precio) > parseInt(b.precio)
    });
};

function construirResultadoPlacasMadres (data) {
	// data = TODOS las placas madres traidas desde BD

	// Separar en 2 arreglos: 1 de destacados y otro del restante
	var destacados = obtenerPlacasMadresDestacadas(data);

	for (var i=destacados.indexes.length-1; i>=0; i--)
		data.splice(destacados.indexes[i], 1);

	$(".resultados-placa-madre").empty();

	var checked = "";
	// Destacados
	for (var i=0; i<destacados.data.length; i++) {
		checked = (i == 0) ? " checked" : "";
		var result = '<div class="form-check">'+
		  	'<input class="form-check-input is-valid" type="radio" name="resultadosPlacasMadres" id="placaMadre'+i+'" value="'+i+'"'+checked+'>'+
		  	'<label class="form-check-label" for="placaMadre'+i+'">'+
		    	destacados.data[i].nombre+" ("+destacados.data[i].precio+")"+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(destacados.data[i]))+'">'+
		'</div>';

		$(".resultados-placa-madre").append(result);
	}

	// Restantes
	for (var j=0, k=i; j<data.length; j++, k++) {
		checked = (j == 0 && checked == "") ? " checked" : "";

		var result = '<div class="form-check">'+
		  	'<input class="form-check-input" type="radio" name="resultadosPlacasMadres" id="placaMadre'+k+'" value="'+k+'"'+checked+'>'+
		  	'<label class="form-check-label" for="placaMadre'+k+'">'+
		    	data[j].nombre+" ("+data[j].precio+" $)"+
		  	'</label>'+
		  	'<input type="hidden" value="'+encodeURIComponent(JSON.stringify(data[j]))+'">'+
		'</div>';

		$(".resultados-placa-madre").append(result);
	}

	// Se coloca aquí debido a que el DOM que controla recién se creó
	$('input[name=resultadosPlacasMadres]').change(function() {
        // Cambiar imagen de placa madre:
        var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-placa-madre input[name=resultadosPlacasMadres]:checked").parent().find("input[type=hidden]").val() ) ).imagen;

		$(".img-placa-madre").empty().append("<img src='"+imgSrc+"'>");

    	$(".img-placa-madre").addClass("loader-in-bg");
    	setTimeout(function(){
    		calcularTamanoImagenPantalla3();
    	}, 500);
    });

	// Poner imagen inicial:
    var imgSrc = JSON.parse(decodeURIComponent( $(".resultados-placa-madre input[name=resultadosPlacasMadres]:checked").parent().find("input[type=hidden]").val() ) ).imagen;
	$(".img-placa-madre").empty().append("<img src='"+imgSrc+"'>");
		
	$(".img-placa-madre").addClass("loader-in-bg");
	setTimeout(function(){
		calcularTamanoImagenPantalla3();
	}, 500);
};

function obtenerPlacasMadresDestacadas (placas) {
	var destacados = {
		data: [],
		indexes: []
	};
	var presupuesto = parseFloat( $("#inputPresupuesto").val() );
	for (var i=0; i<placas.length; i++) {
		if ( parseFloat(placas[i].precio) >= (presupuesto*0.05) && parseFloat(placas[i].precio) <= (presupuesto*0.07) ) {
			destacados.data.push(placas[i]);
			destacados.indexes.push(i);
		}
	}

	return destacados;
};

function calcularTamanoImagenPantalla3 () {
	$(".img-placa-madre > img").css("visibility", "hidden");

	$(".img-placa-madre > img").removeClass("imagen-ancho imagen-largo");
	if( $(".img-placa-madre > img").width() > $(".img-placa-madre > img").height() ) {
		$(".img-placa-madre > img").addClass("imagen-ancho");
	} else {
		$(".img-placa-madre > img").addClass("imagen-largo");
	}

	$(".img-placa-madre").removeClass("loader-in-bg");
	$(".img-placa-madre > img").css("visibility", "visible");
};

function construccionSelectResultadoPantalla3 (valor) {
	$("#selectResultadoPantalla3").empty(); // Quitar todos los OPTIONS del SELECT
	$("#selectResultadoPantalla3").append("<option>Ninguno</option>").attr("disabled", true);

	switch (valor) {
		case "0": // Ninguno
			$("#selectResultadoPantalla3").attr("disabled", true);
			// Arreglar filtrado para TODOS
			$(".resultados-placa-madre .form-check").show();
		break;
		case "1": // Marca
			var marcas = [];

			$(".resultados-placa-madre > .form-check" ).each(function(index) {

				if(index == 0) {
					$("#selectResultadoPantalla3").empty().removeAttr("disabled");
				}

				var placaObject = JSON.parse(decodeURIComponent( $(this).find("input[type=hidden]").val() ) );
				var marca = placaObject.marca;

				// Buscar marcas dintintos
				if( -1 == $.inArray(marca, marcas) ) {
					
					var result = '<option value="'+marca+'">'+marca+'</option>';
					$("#selectResultadoPantalla3").append(result);

					marcas.push(marca);
				}
			});

			filtrarPantalla3();
		break;
		default:
			alert("Error en switch");
	}
};

function filtrarPantalla3 () {   // el value que llegaba era el valor del INPUT TEXT
	//$('input[name=resultadosPlacasMadres]').removeAttr('checked');
	$('input[name=resultadosPlacasMadres]').prop('checked', false);

    $(".resultados-placa-madre .form-check").hide();
    $(".resultados-placa-madre .form-check").filter(function(i, v) {

    	var elemento = JSON.parse(decodeURIComponent( $(v).find("input[type=hidden]").val() ));
		
    	switch ( $("#selectFiltradoPantalla3").val() ) {
    		case "1": // Marca
    			if( elemento.marca == $("#selectResultadoPantalla3").val() )
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

		if (tabActual == "#tres") {

			/* Limpiar campos previamente */
			$(".mostrarPreviaObtencionPlacasMadres").removeClass("mostrar");	
			$(".resultados-placa-madre").empty();
			$(".img-placa-madre").empty();
			$(".msj-error-placasMadres-1").removeClass("mostrar");
			$(".msj-error-placasMadres-2").removeClass("mostrar");
			

			var socket = JSON.parse(decodeURIComponent( $(".resultados-procesadores input[name=resultadosProcesadores]:checked").parent().find("input[type=hidden]").val() ) ).socket;

			$(".loader-placas-madres").addClass("mostrar");
			(function($) {
			    $.post("backend/obtenerPlacasMadresSegunSocket.php", { socket: socket })
				.done(function(data) {
					console.log(data);
					if(data.length == 0) {
						$(".msj-error-placasMadres-1").addClass("mostrar");
					} else {
						$(".mostrarPreviaObtencionPlacasMadres").addClass("mostrar");
						construirResultadoPlacasMadres( ordenarPlacasMadresDesdeBD(data) );
					}
				})
				.fail(function() {
					alert( "error" );
				})
				.always(function() {
					$(".loader-placas-madres").removeClass("mostrar");
				});
			})(jQuery);
		}
	});

	$("#selectFiltradoPantalla3").change(function() {
		var valor = $(this).val();
		construccionSelectResultadoPantalla3(valor);
		if (valor!="0") {
			filtrarPantalla3();
		    $(".resultados-placa-madre .form-check").filter(":visible").filter(":first").find("input[name=resultadosPlacasMadres]").prop('checked', true).change();
		} else {
			$('input[name=resultadosPlacasMadres]').prop('checked', false);
			$("input[name=resultadosPlacasMadres]:first").prop('checked', true).change();
		}
	});

	$("#selectResultadoPantalla3").change(function() {
		var valor = $(this).val();
		// console.log("Cambió marca: ", valor);
		if (valor!="") {
			filtrarPantalla3();
		    $(".resultados-placa-madre .form-check").filter(":visible").filter(":first").find("input[name=resultadosPlacasMadres]").prop('checked', true).change();
		}
	});

});