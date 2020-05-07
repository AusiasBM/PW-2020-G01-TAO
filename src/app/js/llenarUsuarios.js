let ModeloTecnicoLlenarUsuario = {
    url : '../api/v1.0/usuarios',
    controlador : {},
    datos : [],
    cargar : function (url = '') {
        if (url == ''){
            url = this.url;
        }

        fetch(url).then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            //console.log(datosJson);
            this.datos = datosJson;
            this.controlador.representar();
        });
    }
};

let VistaSelectorTecnicoLlenarUsuario = {
    seccionParcelas : {},
    usuarios : [],
    preparar : function (selectId) {
        this.seccionParcelas = document.getElementById(selectId);
        //this.seccionParcelas.innerHTML = '<h3>CARGANDO USUARIOS</h3>';
    },
    representar : async function (j) {
        //console.log(j);

        this.seccionParcelas.innerHTML = '';

        if (j[0] != null) {
            await j.forEach(usuario => this.creadorUsuario(usuario.nombre, usuario.nombreRol, usuario.id, usuario.numRol));
            await j.forEach(usuario => this.usuarios[usuario.id] = usuario);
        }else{
            this.seccionParcelas.innerHTML = '<h3>NO TIENES PARCELAS</h3>';
        }
    },
    creadorUsuario : function (nombreUsuario, nombreRol, id, numRol) {
        this.seccionParcelas.innerHTML += `<!-- Estilo cuando iniciamos la app -->
                                            <div class="card col-md-3 mt-3 mt-md-0">
                                                <div class="card-body">
                                                    <div class="col-12 d-flex flex-column justify-content-between border-bottom mb-4">
                                                        <h4 class="card-title">${nombreUsuario}</h4>
                                                        <h4 class="card-title">Rol: ${nombreRol}</h4>
                                                    </div>
                                                    <div class="d-flex">
                                                        <button type="button" class="btn btn-outline-info mr-auto" onclick="pasarAlUsuario('${nombreUsuario}', ${id}, ${numRol})">Acceder</button>
                                                        <button type="button" class="btn btn-outline-danger" onclick="quitarUsuario(${id})">Eliminar</button>
                                                    </div>
                                                </div>
                                            </div>`;
    },
};

let ControladorTecnicoLlenarUsuario = {
    modelo : ModeloTecnicoLlenarUsuario,
    vista : VistaSelectorTecnicoLlenarUsuario,
    iniciar : function () {
        ModeloTecnicoLlenarUsuario.controlador = this;
        ModeloTecnicoLlenarUsuario.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};