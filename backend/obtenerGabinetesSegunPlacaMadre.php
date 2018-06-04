<?php 
header("Access-Control-Allow-origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept-Charset: UTF-8");
header("Cache-Control: no-cache");

$capacidadPlacaMadre = $_POST['capacidadPlacaMadre'];

$resultado = array (
    array(
    	"nombre"=>"Carved", 
    	"marca"=>"Sentey",
    	"modelo"=>"Carved",
    	"capacidadPlacaMadre"=>"[ATX]", 
    	"tipo"=>"Mid ATX",
		"precio"=>"60",
		"imagen"=>"images/gabinete1.jpg"
	),
    array(
    	"nombre"=>"VORAX", 
    	"marca"=>"Sentey",
    	"modelo"=>"GS-6003",
    	"capacidadPlacaMadre"=>"[ATX, M-ATX]", 
    	"tipo"=>"Mid Tower",
		"precio"=>"70",
		"imagen"=>"images/gabinete2.jpg"
	),
	array(
    	"nombre"=>"Gabinete Gamer Thermaltake View 27 Mid Tower Ventana", 
    	"marca"=>"Thermaltake",
    	"modelo"=>"View 27",
    	"capacidadPlacaMadre"=>"[Mini-ITX, ATX, MicroATX]", 
    	"tipo"=>"Mid ATX",
		"precio"=>"30",
		"imagen"=>"images/gabinete3.jpg"
	),
	array(
    	"nombre"=>"Gabinete Gamer", 
    	"marca"=>"Powercase",
    	"modelo"=>"6820",
    	"capacidadPlacaMadre"=>"[All]", 
    	"tipo"=>"ATX",
		"precio"=>"18",
		"imagen"=>"images/gabinete4.jpg"
	)
);


header("HTTP/1.0 200 Exito");
echo json_encode($resultado);

?>