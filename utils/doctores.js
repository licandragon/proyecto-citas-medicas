const { leerJSON, escribirJSON } = require("../utils/fileManager");
const { obtenerCitas } = require('./citas');
const archivo = "doctores.json";

function obtenerDoctores() {
    const doctores = leerJSON(archivo);
    return doctores;
}

function obtenerDoctorPorId(id) {
    const doctores = leerJSON(archivo);
    return doctores.find(d => d.id === id);
}

function obtenerDoctoresPorEspecialidad(especialidad) {
    const doctores = leerJSON(archivo);
    const resultado = doctores.filter(d => d.especialidad.toLowerCase() === especialidad.toLowerCase());
    return resultado;
}

function obtenerDoctoresDisponibles(fecha, hora){
    const doctores = obtenerDoctores();
    const citas = obtenerCitas();

    const date = new Date(fecha);
    let diaSemana = date.toLocaleDateString("es-ES", { weekday: "long", timeZone: "UTC" });
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

    // Filtrar doctores que cumplen con todos los criterios
    const disponibles = doctores.filter(doctor => {
        // Verificar día de disponibilidad
        const trabajaEseDia = doctor.diasDisponibles.includes(diaSemana);
        if (!trabajaEseDia) return false;

        // Verificar horario
        const dentroDeHorario = hora >= doctor.horarioInicio && hora < doctor.horarioFin;
        if (!dentroDeHorario) return false;

        // Verificar que no tenga cita programada a esa hora
        const citaExistente = citas.some(c =>
            c.doctorId === doctor.id &&
            c.fecha === fecha &&
            c.hora === hora &&
            c.estado === "programada"
        );
        return !citaExistente;
    });

    return disponibles;
}
function crearDoctor(nombre, especialidad, horarioInicio, horarioFin, diasDisponibles) {
    const doctores = obtenerDoctores();

    const id = `D${(doctores.length + 1).toString().padStart(3, "0")}`;
    const nuevoDoctor ={
        id,
        nombre, 
        especialidad,
        horarioInicio,
        horarioFin,
        diasDisponibles
    }
    doctores.push(nuevoDoctor);
    return !escribirJSON(archivo, doctores)? false : nuevoDoctor;
}

module.exports = { obtenerDoctores, obtenerDoctorPorId, obtenerDoctoresPorEspecialidad, obtenerDoctoresDisponibles, crearDoctor };
