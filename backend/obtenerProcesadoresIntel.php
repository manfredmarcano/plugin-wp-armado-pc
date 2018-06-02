<?php 
header("Access-Control-Allow-origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Accept-Charset: UTF-8");
header("Cache-Control: no-cache");

//include("conexion.php");
//$data = json_decode(file_get_contents('php://input'));
//print_r($data);

//$sql = "SELECT * FROM casos WHERE cedula='".$data->cedula."'";
//$sql = "SELECT * FROM casos WHERE cedula='".$data->cedula."' ORDER BY idCaso DESC";  //ORDER BY 'idCaso' DESC    ORDER BY `casos`.`idCaso` DESC
/*
if (!$result = $mysqli->query($sql)) {
    header("HTTP/1.0 404 Error");
    $response['mensajeInformal'] = "Query fállido";
    $response['mensajeTecnico'] = "Query: ".$sql." - Errno: ".$mysqli->errno." - Error: ".$mysqli->error."\n";
    echo json_encode($response);
    flush();
    exit;
}

if ($result->num_rows === 0) {
	header("HTTP/1.0 201 Exito");
	$response['mensajeInformal'] = "Cédula no encontrada";
    echo json_encode($response);
    flush();
    exit;
}

while($row = $result->fetch_assoc()) {
    $casos[] = $row;
}

header("HTTP/1.0 200 Exito");
echo json_encode($casos);
flush();

include("cerrar-sesion.php");
*/

$resultado = array (
    array("nombre"=>"Intel A - Generación V - 5 Núcleos ($785)", "generacion"=>"5", "socket"=>"1155", "nroNucleos"=>"5", "precio"=>"785", "imagen"=>"images/procesadorIntel1.png"),
    array("nombre"=>"Intel B - Generación IV - 6 Núcleos ($965)", "generacion"=>"4", "socket"=>"1156", "nroNucleos"=>"6", "precio"=>"965", "imagen"=>"images/procesadorIntel2.png"),
    array("nombre"=>"Intel C - Generación III - 4 Núcleos ($256)", "generacion"=>"3", "socket"=>"370", "nroNucleos"=>"4", "precio"=>"256", "imagen"=>"images/larga.png"),
    array("nombre"=>"Intel Prueba 1 - Generación X - 4 Núcleos ($42)", "generacion"=>"10", "socket"=>"370", "nroNucleos"=>"4", "precio"=>"42", "imagen"=>"images/larga.png"),    
    array("nombre"=>"Intel Prueba 2 - Generación X - 4 Núcleos ($30)", "generacion"=>"10", "socket"=>"370", "nroNucleos"=>"4", "precio"=>"30", "imagen"=>"images/larga.png"),    
    array("nombre"=>"Intel D - Generación II - 5 Núcleos ($698)", "generacion"=>"2", "socket"=>"426", "nroNucleos"=>"5", "precio"=>"698", "imagen"=>"images/procesadorIntel4.png"),
    array("nombre"=>"Intel E - Generación VI - 8 Núcleos ($458)", "generacion"=>"6", "socket"=>"370", "nroNucleos"=>"8", "precio"=>"458", "imagen"=>"images/procesadorIntel5.png"),
);

header("HTTP/1.0 200 Exito");
echo json_encode($resultado);

?>