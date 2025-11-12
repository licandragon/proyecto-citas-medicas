const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, historialPaciente } = require('./utils/pacientes');
const { crearDoctor, obtenerDoctores, obtenerDoctorPorId, obtenerDoctoresPorEspecialidad, obtenerDoctoresDisponibles } = require('./utils/doctores');
const { obtenerCitas, obtenerCitaPorId, agendarCita, cancelarCita, obtenerCitaPorDoctorId, citasProximas } = require('./utils/citas');

//Endpoints Pacientes

//Registrar nuevo paciente
app.post("/pacientes", (req, res) => {
    const { nombre, edad, telefono, email } = req.body;

    const pacientes = obtenerPacientes();

    //Validaciones de Datos
    if (!telefono || edad <= 0) {
        return res.status(400).json({
            sucess: false,
            message: "Datos de telefono o edad no son validos" 
        });
    }

    if(pacientes.some(p => p.email === email)){
        return res.status(400).json({
            sucess: false,
            message: "El email ya está registrado"
        });
    }

    //Se crea un nuevo paciente
    const nuevoPaciente = crearPaciente(nombre, edad, telefono, email);
    if (!nuevoPaciente) {
        return res.status(404).json({
            success: false,
            message: "No se pudo crear el paciente exitosamente",
        });
    }
    res.status(201).json({
        sucess: true,
        message: "Paciente creado exitosamente",
        data: nuevoPaciente
    });
});

//Listar todos los pacientes
app.get("/pacientes", (req, res) => {
    const pacientes = obtenerPacientes();

    res.status(200).json({
        sucess: true,
        data: pacientes
    });
});

//Obtener paciente por ID
app.get("/pacientes/:id", (req, res) => {
    const id = req.params.id;
    const paciente = obtenerPacientePorId(id);
    if (!paciente) return res.status(404).json({
        success: false, 
        message: "Paciente no encontrado" 
    });
    res.status(200).json({
        sucess: true,
        data: paciente
    });
});

//Actualizar datos del paciente
app.put("/pacientes/:id", (req, res) => {
    const id = req.params.id;
    const {nombre, edad, telefono, email} = req.body;
    
    const actualizado = actualizarPaciente(id, nombre, edad, telefono, email)
    if (!actualizado) {
        return res.status(404).json({
            success: false,
            message: "Usuario no encontrado",
        });
    }

    res.status(200).json({
        success: true,
        message: "Usuario actualizado exitosamente",
        data: actualizado,
    });
});

// Ver historial de citas del paciente
app.get("/pacientes/:id/historial", (req, res) => {
    const id = req.params.id;
    const historial = historialPaciente(id);
    res.status(200).json({
        sucess: true,
        data: historial
    });
});


//---------Enpoints Doctores

//Registrar nuevo doctor
app.post("/doctores", (req, res) => {
    const {nombre,especialidad, horarioInicio, horarioFin, diasDisponibles} = req.body;
    const doctores = obtenerDoctores();
    if (doctores.some(d => d.nombre === nombre && d.especialidad === especialidad)) {
        return res.status(400).json({
            sucess: false,
            message:"El doctor ya existe con esa especialidad" 
        });
    }

    if (!diasDisponibles || diasDisponibles.length === 0) {
        return res.status(400).json({
            sucess: false,
            message:"Debe tener al menos un día disponible" 
        });
    }

    if (horarioInicio >= horarioFin) {
        return res.status(400).json({
            sucess: false,
            message:"Horario inválido (inicio >= fin)" 
        });
    }

    const nuevoDoctor = crearDoctor(nombre, especialidad, horarioInicio, horarioFin, diasDisponibles);
    if (!nuevoDoctor) {
        return res.status(404).json({
            success: false,
            message: "No se pudo crear el doctor exitosamente",
        });
    }
    res.status(201).json({
        sucess: true,
        mensaje: "Doctor registrado correctamente", 
        data: nuevoDoctor
    });
});

//Listar todos los doctores
app.get("/doctores", (req, res) => {
    const doctores = obtenerDoctores();
    
    res.status(200).json({
        sucess: true,
        data: doctores
    });
});

// Busqueda avanzada - Doctor disponible en horario
app.get("/doctores/disponibles", (req, res) => {
    const {fecha, hora} = req.query;
    console.log(fecha);
    
    if(!fecha || !hora){
        return res.status(400).json({
            success: false,
            message: "Debe proporcionar fecha y hora"
        });
    }

    const doctores = obtenerDoctoresDisponibles(fecha, hora);

    if (doctores.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No hay doctores disponibles en esa fecha y hora"
        });
    }

    res.status(200).json({
        sucess: true,
        data: doctores
    });
});

//Obtener doctor por ID
app.get("/doctores/:id", (req, res) => {
    const id = req.params.id;
    const doctor = obtenerDoctorPorId(id);
    if (!doctor) return res.status(404).json({
        success: false, 
        message: "Doctor no encontrado" 
    });
    res.status(200).json({
        sucess: true,
        data: doctor
    });
});

// Buscar doctores por especialidad
app.get("/doctores/especialidad/:especialidad", (req, res) => {
    const especialidad = req.params.especialidad;
    const doctores = obtenerDoctoresPorEspecialidad(especialidad)
    res.status(200).json({
        sucess: true,
        data: doctores
    });
});



//----------Endpoint Citas---------------------------------------//

// Agendar nueva cita
app.post("/citas", (req, res) => {
    const { pacienteId, doctorId, fecha, hora, motivo } = req.body;
    const citas = obtenerCitas();
    const paciente = obtenerPacientePorId(pacienteId);
    const doctor = obtenerDoctorPorId(doctorId);

    if (!paciente){ 
        return res.status(404).json({
            sucess: false,
            message: "Paciente no existe" 
        });
    }
    if (!doctor) { 
        return res.status(404).json({
            sucess: false,
            message: "Doctor no existe" 
        });
    }

    const zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone.toString();
    console.log(zonaHoraria);

    const fechaActual = new Date().toLocaleString("en-US", { timeZone: zonaHoraria }).toString().split(",")[0];
    console.log(fechaActual)
    
    if (fecha < fechaActual) { 
        return res.status(400).json({
            sucess: false,
            message: "La fecha debe ser futura" 
        });
    }

    const fechaCita = new Date(fecha);
    let diaSemana = fechaCita.toLocaleDateString("es-ES", { weekday: "long", timeZone: "UTC"});
    
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    console.log(diaSemana)
    if (!doctor.diasDisponibles.includes(diaSemana)) { 
        return res.status(400).json({
            sucess: false,
            message: "El doctor no atiende ese día" 
        });
    }

    if (hora < doctor.horarioInicio || hora >= doctor.horarioFin) {
        return res.status(400).json({
            sucess: false,
            message:"Hora fuera del horario del doctor" 
        });
    }

    const conflicto = citas.some(c =>
        c.doctorId === doctorId && c.fecha === fecha && c.hora === hora && c.estado === "programada"
    );

    if (conflicto) { 
        return res.status(400).json({
            sucess: false,
            message: "El doctor ya tiene una cita en esa hora" 
        });
    }

    const cita  = agendarCita(pacienteId, doctorId, fecha, hora, motivo);

    if(!cita){
        return res.status(404).json({
            sucess: false,
            message: "Ah ocurrido un error al guardar la cita"
        });
    }

    res.status(201).json({
        sucess: true,
        message: "La cita se ha creado con exito",
        data: cita
    });
});

// Listar todas las citas (con filtros opcionales por fecha)
app.get("/citas", (req, res) => {
    const {fecha, estado} = req.query;
    let citas = obtenerCitas();

    if (fecha) citas = citas.filter(c => c.fecha === fecha);
    if (estado) citas = citas.filter(c => c.estado === estado);
    res.status(200).json({
        sucess: true,
        data: citas,
    });
});

// Obtener cita por ID
app.get("/citas/:id", (req, res) => {
    const id = req.params.id;
    const cita = obtenerCitaPorId(id);
    if (!cita) return res.status(404).json({
        success: false, 
        message: "Cita no encontrada." 
    });
    res.status(200).json({
        sucess: true,
        data: cita,
    });
});

// Cancelar una cita
app.put("/citas/:id/cancelar", (req, res) => {
    const id = req.params.id;
    const cita = obtenerCitaPorId(id);
    if (!cita){
        return res.status(404).json({
            success: false,
            message: "Cita no encontrada" 
        });
    }
    if (cita.estado !== "programada"){
        return res.status(404).json({
            success: false,
            message: "Solo se pueden cancelar citas programadas" 
        });
    }

    if(!cancelarCita(id)){
        return res.status(404).json({
            success: false,
            message: "Ah ocurrido un error al cancelar la cita." 
        });
    }
    res.status(200).json({
        sucess: true,
        message: "Cita cancelada correctamente"
    });
});

// Ver agenda de un doctor
app.get("/citas/doctor/:doctorId", (req, res) => {
    const id = req.params.doctorId;
    const citas = obtenerCitaPorDoctorId(id);
    res.status(200).json({
        sucess: true,
        data: citas
    });
});



// Notificacion - obtener citas próximas (siguientes 24 horas)
app.get('/notificaciones/proximas',(req, res) => {
    const id = req.params.doctorId;
    const citas = citasProximas();
    res.status(200).json({
        sucess: true,
        data: citas
    });
});


app.listen(PORT, ()=> {
    console.log(`Servidor en http://localhost:${PORT}`);
})