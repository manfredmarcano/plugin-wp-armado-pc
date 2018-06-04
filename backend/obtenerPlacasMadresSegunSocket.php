<?php 
header("Access-Control-Allow-origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept-Charset: UTF-8");
header("Cache-Control: no-cache");

//$data = json_decode(file_get_contents('php://input'));
$socket = $_POST['socket'];

$resultado = array (
    array(
    	"nombre"=>"MSI X470 Gaming Plus placa base",
    	"marca"=>"MSI", 
    	"modelo"=>"X470GPLUS",
        "forma"=>"XT",
    	"socket"=>"AM4",
    	"precio"=>"85",
    	"imagen"=>"images/placaMadre1.png"
    ),

    array(
    	"nombre"=>"ASUS PRIME B350-PLUS",
    	"marca"=>"Asus",
    	"modelo"=>"PRIME B350-PLUS",
        "forma"=>"AT",
    	"socket"=>"AM4",
    	"precio"=>"60",
    	"imagen"=>"images/placaMadre2.png"
    ),

    array(
    	"nombre"=>"Gigabyte X470 AORUS Gaming 7 WiFi",
    	"marca"=>"Gigabyte",
    	"modelo"=>"X470 AORUS Gaming 7 WIFI",
        "forma"=>"Micro-ATX",
    	"socket"=>"AM4",
    	"precio"=>"18",
    	"imagen"=>"images/placaMadre3.png"
    ),

    array(
    	"nombre"=>"ASUS TUF Z370-PRO GAMING - Placa base para gaming",
    	"marca"=>"Asus",
    	"modelo"=>"TUF Z370-PRO GAMING",
        "forma"=>"Mini-ITX",
    	"socket"=>"AM4",
    	"precio"=>"13",
    	"imagen"=>"images/placaMadre4.png"
    )  
);

//$resultado = [];

header("HTTP/1.0 200 Exito");
echo json_encode($resultado);
?>