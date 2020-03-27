<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok'){

    $usuario = $_SESSION['idUsuario'];

    $sql = "select sondas.idSonda, parcelas.idParcela, posiciones.longitud, posiciones.latitud from parcelas, posiciones, sondas, usuarios_parcelas where usuarios_parcelas.idUsuario = $usuario and usuarios_parcelas.idParcela = parcelas.idParcela and parcelas.idParcela = posiciones.idParcela and posiciones.idPosicion = sondas.idPosicion";

    // Filtro
    //and parcelas.idParcela = 2

    $filtros = array();

    if (isset($_GET['nombre'])) {
        array_push($filtros, 'parcelas.nombre = ' .  '"' . $_GET['nombre'] . '"');
    }

    if (count($filtros) > 0) $sql .= ' AND ' . join(' AND ', $filtros);

    $res = mysqli_query($conexion, $sql);


    while ($fila = mysqli_fetch_assoc($res)) {

        $sonda = array(
                "idSonda" => $fila["idSonda"],
                "idParcela" => $fila["idParcela"],
                "lat" =>  floatval($fila["latitud"]),
                "lng" =>  floatval($fila["longitud"]
            )
        );

        array_push($salida, $sonda);

    }

    $http_code = 200;
}else{
    $http_code = 401;
}