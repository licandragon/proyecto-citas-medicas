const { leerJSON, escribirJSON } = require("../utils/fileManager");
const archivo = "pacientes.json";

function obtenerPacientes() {
    const pacientes = leerJSON(archivo);
    return pacientes;
}

function obtenerPacientePorId(id) {
    const pacientes = leerJSON(archivo);
    return pacientes.find(p => p.id === id);
}

function crearPaciente(nombre, edad, telefono, email) {
    const pacientes = leerJSON(archivo);
    const id = `P${(pacientes.length + 1).toString().padStart(3, "0")}`;
    const fechaRegistro = new Date().toISOString().split("T")[0];

    const nuevoPaciente = { 
        "id": id, 
        "nombre" : nombre, 
        "telefono" : telefono, 
        "email" : email, 
        "fechaRegistro": fechaRegistro
    };
    pacientes.push(nuevoPaciente);
    return !escribirJSON(archivo, pacientes)? false : nuevoPaciente;
}

function actualizarPaciente(id, nombre, edad, telefono, email){
    const pacientes = leerJSON(archivo);
    const index = pacientes.findIndex((u) => u.id === id);

    if(index === -1){
        return false;
    }

    if (nombre){
        pacientes[index].nombre = nombre;
    } 

    if (edad){ 
        pacientes[index].edad = edad;
    }

    if (telefono){
        pacientes[index].telefono = telefono;
    } 

    if (email){ 
        pacientes[index].email = email;
    }
    escribirJSON(archivo,pacientes);
    
    return pacientes[index];
}

function historialPaciente(id) {
    const citas = leerJSON("citas.json");
    const historial = citas.filter(c => c.pacienteId === id);
    return historial;
}

module.exports = { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, historialPaciente };