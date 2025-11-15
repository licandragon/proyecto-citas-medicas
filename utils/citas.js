const { leerJSON, escribirJSON } = require("./fileManager");
const archivo = "citas.json";

function obtenerCitas() {
  const citas = leerJSON(archivo);
  return citas;
}

function obtenerCitaPorId(id) {
  const citas = obtenerCitas()
  return citas.find(c => c.id === id);
}

function obtenerCitaPorDoctorId(id) {
  const citas = obtenerCitas();
  return citas.filter(c => c.doctorId === id);
}

function citasProximas(){
  const citas = obtenerCitas().filter(c => c.estado === "programada");
  const ahora = Date.now();
    const limite = ahora + 24 * 60 * 60 * 1000;

    const proximas = citas.filter(c => {
      const dt = new Date(`${c.fecha}T${c.hora}:00`).getTime();
      return dt > ahora && dt <= limite;
    }).map(c => {
      return c;
    });
    return proximas;
}

function agendarCita(pacienteId, doctorId, fecha, hora, motivo) {
  const citas = obtenerCitas();
  const id = `C${(citas.length + 1).toString().padStart(3, "0")}`;
  const estado = "programada";
  const nuevaCita = {
    id,
    pacienteId,
    doctorId,
    fecha,
    hora,
    motivo,
    estado
  }
  citas.push(nuevaCita);
  
  return !escribirJSON(archivo, citas)? false : nuevaCita;
  
}

function cancelarCita(id) {
  const citas = leerJSON(archivo);
  const index = citas.findIndex((c) => c.id === id) ;
  citas[index].estado = "cancelada";
  return !escribirJSON(archivo, citas)? false : true;
  
}


module.exports = { obtenerCitas, obtenerCitaPorId, obtenerCitaPorDoctorId, agendarCita, cancelarCita, citasProximas };
