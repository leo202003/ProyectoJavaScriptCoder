//DATOS YA INGRESADOS EN EL SISTEMA PREVIAMENTE
let Clientes = [
    {
        id: 1,
        nombre: "Leonardo",
        direccion: "Bulevar Artigas 1825, Montevideo", 
        telefono: "099 812 345",
    }, 
    {
        id: 2,
        nombre: "Jose",
        direccion: "18 de Julio 945, Maldonado",
        telefono: "092 456 789",
    },
    {
        id: 3,
        nombre: "Lara",
        direccion: "Avenida Italia 4567, Montevideo",
        telefono: "098 133 579",
    },
    {
        id: 4,
        nombre: "Ana",
        direccion: "Luis Alberto de Herrera 123, Rivera",
        telefono: "091 647 203",
    },
    {
        id: 5,
        nombre: "Lucia",
        direccion: "Ruta 3 Km 92.5, San José",
        telefono: "094 321 887",
    },
    {
        id: 6,
        nombre: "Manuel",
        direccion: "José Enrique Rodó 789, Salto",
        telefono: "093 775 421",
    }
];

let Negocios = [
    {
        id: 1,
        nombre: "ByteSur",
        descripcion: "Venta de computadoras, componentes y accesorios tech. También brindan soporte técnico y envíos a domicilio.",
    },
    {
        id: 2,
        nombre: "El Barrilito Express",
        descripcion: "Tienda especializada en cervezas artesanales, vinos y bebidas importadas. Ofrece delivery rápido.",
    },
    {
        id: 3,
        nombre: "Urbanaje",
        descripcion: "Ropa urbana, streetwear y accesorios de moda joven. Cuenta con tienda online y promociones exclusivas por la app.",
    },
];

let Estado = ["Pendiente", "Retirado", "Entregado", "Cancelado"];

let Repartidores = ["Gonzalo Mendez", "Luis Rodriguez", "Sofia Lopez"]

let Pedidos = [
    {
        id: 1,
        negocio: Negocios[0].nombre,
        cliente: Clientes[2].nombre,
        destino: Clientes[2].direccion,
        estado: Estado[1],
        repartidor: Repartidores[0],
    },
    {
        id: 2,
        negocio: Negocios[1].nombre,
        cliente: Clientes[1].nombre,
        destino: Clientes[1].direccion,
        estado: Estado[2],
        repartidor: Repartidores[1],
    },
    {
        id: 3,
        negocio: Negocios[2].nombre,
        cliente: Clientes[0].nombre,
        destino: Clientes[0].direccion,
        estado: Estado[0],
        repartidor: Repartidores[4],
    },
    {
        id: 4,
        negocio: Negocios[0].nombre,
        cliente: Clientes[5].nombre,
        destino: Clientes[5].direccion,
        estado: Estado[1],
        repartidor: Repartidores[2],
    },
    {
        id: 5,
        negocio: Negocios[2].nombre,
        cliente: Clientes[4].nombre,
        destino: Clientes[4].direccion,
        estado: Estado[1],
        repartidor: Repartidores[2],
    }
]

//FUNCIONES

//INGRESA UN NEGOCIO AL SISTEMA
function ingresarNegocio() {
    let nom = prompt("Nombre:")
    let yaExiste = Negocios.some(n => n.nombre.toLowerCase() === nom.toLowerCase());
    if (yaExiste) {
        console.log(" ⚠️ Negocio ya ingresado en el sistema");
        alert("⚠️ Negocio ya ingresado en el sistema");
    } else {
        let desc = prompt("Descripcion: ");
        Negocios.push({id: Negocios.length + 1, nombre: nom, descripcion: desc});
        console.log("✅ Negocio Ingresado Correctamente");
        alert("✅ Negocio Ingresado Correctamente");
    }  
}

//INGRESA UN CLIENTE AL SISTEMA
function ingresarCliente() {
    let nom = prompt("Nombre: ");
    let yaExiste = Clientes.some (c => c.nombre.toLowerCase() === nom.toLowerCase());
    if (yaExiste) {
        console.log(" ⚠️ Cliente ya ingresado en el sistema");
        alert("⚠️ Cliente ya ingresado en el sistema");
    } else {
        let direc = prompt("Direccion: ");
        let tel = prompt("Telefono: ")
        Clientes.push ({id: Clientes.length + 1, nombre: nom, direccion: direc, telefono: tel});
        console.log("✅ Cliente Ingresado Correctamente");
        alert("✅ Cliente Ingresado Correctamente");
    } 
}

//INGRESA UN PEDIDO AL SISTEMA
function ingresarPedido() {
    let nomNegocio = prompt("Nombre del Negocio:")
    //verifico si existe el negocio
    let yaExiste = Negocios.some(n => n.nombre.toLowerCase() === nomNegocio.toLowerCase());
    if (yaExiste) {
        //verifico si el cliente esta en sistema
        let nomCliente = prompt("Nombre del Cliente:")
        let existeCliente = Clientes.some (n => n.nombre.toLowerCase() === nomCliente.toLowerCase());
        let direc = prompt("Direccion del pedido:");
        let tel = prompt ("Contacto del Cliente: ")
        if (existeCliente) {
            let posicionCliente = Clientes.findIndex(n => n.nombre.toLowerCase() === nomCliente.toLowerCase());
            //Actualizo a su ultima direccion
            Clientes[posicionCliente].direccion = direc;
            //Actualizo su numero de telefono
            Clientes[posicionCliente].telefono = tel;
        } else {
            //Si no existe ese cliente, se lo ingreso a sistema automaticamente
            Clientes.push({id: Clientes.length + 1, nombre: nomCliente, direccion: direc, telefono: tel});
        }
        //Ingreso el pedido a sistema
        Pedidos.push({id: Pedidos.length + 1, negocio: nomNegocio, cliente: nomCliente, destino: direc, estado: Estado[0], repartidor: undefined}) 
        console.log("✅ Pedido Ingresado Correctamente");
        alert("✅ Pedido Ingresado Correctamente");
    } else {
        console.log(" ⚠️ Negocio no ingresado en sistema");
        let ingresar = confirm("⚠️ Negocio no ingresado en sistema\n ¿Desea ingresarlo?");
        if (ingresar) {
            ingresarNegocio();
            let respuesta = confirm("¿Desea continuar ingresando su pedido?")
            if (respuesta) {
                ingresarPedido();
            }
        }
    }    
}

//CAMBIA EL ESTADO DE UN PEDIDO A CANCELADO Y NO SALE A RUTA
function CancelarPedido(id) {
    let pedido = Pedidos.find(p => p.id === id);
    pedido.estado = Estado[3];
    console.log("✅ Pedido Cancelado");
    alert("✅ Pedido Cancelado");
}

//ASIGNA EL PEDIDO A UN CONDUCTOR
function asignarPedido(condcutor, id) {
    let pedido = Pedidos.find(p => p.id === id);
    pedido.repartidor = condcutor;
    pedido.estado = Estado[1];
}

//MUESTRA EN TERMINAL EL ARRAY INGRESADO COMO PARAMETRO
function verListado(Array) {
    for (let i = 0; i < Array.length; i++) {
        console.log(Array[i]);
    }
}



//INGRESA CONDUCTOR AL SISTEMA
function ingresarConductor() {
    let nomConductor = prompt("Nombre: ");
    let registrado = Repartidores.some(r => r.toLowerCase() === nomConductor.toLowerCase());
    if(!registrado) {
        Repartidores.push(nomConductor);
        console.log("✅ Conductor Ingresado Correctamente");
        alert("✅ Conductor Ingresado Correctamente");
    } else {
        console.log("⚠️ Conductor ya registrado");
        alert("⚠️ Conductor ya registrado");
    }
}

//DEVUELVE LA CANTIDAD DE PEDIDOS EN SISTEMA
function cantPedidos() {
    return Pedidos.length;
}

//MENU
let opcion = parseInt(prompt("MENU\n 1 - Ingresar Pedido\n 2 - Ingresar Cliente\n 3 - Ingresar Negocio\n 4 - Ingresar Conductor\n 5 - Asignar Pedido\n 6 - Listado de Pedidos\n 7 - Listado de Negocios\n 8 - Listado de Conductores\n 9 - Listado de Clientes\n 10 - Cancelar Pedido\n 11 - Salir"));

while (opcion != 11) {
    switch (opcion) {
        case 1:
            ingresarPedido();
            break;
        case 2:
            ingresarCliente();
            break;
        case 3:
            ingresarNegocio();
            break;
        case 4:
            ingresarConductor();
            break;
        case 5:
            let nomConductor = prompt("Nombre del conductor: ");
            let registrado = Repartidores.some(r => r.toLowerCase() === nomConductor.toLowerCase());
            if (!registrado) {
                console.log(" ⚠️ Conductor no registrado")
                let respuesta = confirm("⚠️ Conductor no registrado\n ¿Desea registrar un nuevo conductor?"); 
                if (respuesta) {
                    ingresarConductor();
                    let nombre = Repartidores[Repartidores.length - 1];
                    let id = parseInt(prompt("Ingresa la id del pedido a asignar: "));
                    if (id <= Pedidos.length) {
                        asignarPedido(nombre, id);
                        console.log("✅ Pedido Asignado Correctamente");
                        alert("✅ Pedido Asignado Correctamente a " + nombre);
                    } else {
                        console.log("⚠️ ID no valido");
                        alert("⚠️ Ingrese un ID valido");
                    }
                } 
            } else {
                let id = parseInt(prompt("Ingresa la id del pedido a asignar: "));
                if (id <= Pedidos.length) {
                    asignarPedido(nomConductor, id);
                    console.log("✅ Pedido Asignado Correctamente");
                    alert("✅ Pedido Asignado Correctamente a " + nomConductor);
                } else {
                    console.log("⚠️ ID no valido");
                    alert("⚠️ Ingrese un ID valido");
                }
            }
            break;
        case 6:
            console.log("-------------------------------");
            console.log("     LISTADO DE PEDIDOS");
            console.log("-------------------------------");
            console.log("TOTAL DE PEDIDOS EN SISTEMA: " + cantPedidos() + "\n");
            verListado(Pedidos);
            break;
        case 7:
            console.log("-------------------------------");
            console.log("         NEGOCIOS");
            console.log("-------------------------------");
            verListado(Negocios);
            break;
        case 8:
            console.log("-------------------------------");
            console.log("        CONDUCTORES");
            console.log("-------------------------------");
            verListado(Repartidores);
            break;
        case 9:
            console.log("-------------------------------");
            console.log("          CLIENTES");
            console.log("-------------------------------");
            verListado(Clientes);
            break;
        case 10:
            let id = parseInt(prompt("Ingresa la id del pedido a cancelar: "));
            if (id <= Pedidos.length) {
                CancelarPedido(id);
            } else {
                console.log("⚠️ ID no valido");
                alert("⚠️ Ingrese un ID valido");
            }
            break;    
        default:
            console.log("⚠️ OPCION NO VALIDA")
            alert("⚠️ OPCION NO VALIDA\n SELECCIONE 11 PARA SALIR DEL MENU");
            break;
    }
    opcion = parseInt(prompt("MENU\n 1 - Ingresar Pedido\n 2 - Ingresar Cliente\n 3 - Ingresar Negocio\n 4 - Ingresar Conductor\n 5 - Asignar Pedido\n 6 - Listado de Pedidos\n 7 - Listado de Negocios\n 8 - Listado de Conductores\n 9 - Listado de Clientes\n 10 - Cancelar Pedido\n 11 - Salir"));
}



