# Sistema de Gestión de Citas Médicas

## Portada
- Instituto Tecnologico de Ensenada
- Ing. en Sistemas Computacionales
- Desarrollo Web 1
- Práctica Integradora - Sistema de Gestión de Citas Médicas
- Estudiante: Justino Daniel Guerrero
- Xenia Padilla 
- 12 de Noviembre de 2025.

## Instrucciones de Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/proyecto-citas-medicas.git
cd proyecto-citas-medicas
```

### 2. Instalar dependencias

```bash
npm install express
npm install nodemon
```

### 3. Ejecutar el servidor

```bash
npm run dev
```

El servidor en **[http://localhost:3000](http://localhost:3000)**.

---

## 📘 Documentación de Endpoints

### 👨‍⚕️Pacientes



### **POST** `/pacientes` - Registrar nuevo paciente


```json
{
  "nombre": "Carlos Pérez",
  "edad": 30,
  "telefono": "5551234567",
  "email": "carlos@example.com"
}
```

**Respuesta 201** 

```json
{
  "success": true,
  "message": "Paciente creado exitosamente",
  "data": {
    "id": "P004",
    "nombre": "Carlos Pérez",
    "edad": 30,
    "telefono": "5551234567",
    "email": "carlos@example.com"
  }
}
```
**Respuesta 400** - Error en validaciones
```json
{
  "success": false,
  "message" : "Datos de telefono o edad no son validos" 
}
```
---
#### **GET** `/pacientes` - Listar todos los pacientes

**Respuesta 200:**

```json
{
  "success": true,
  "data": [
    {
      "id": "P001",
      "nombre": "María González",
      "edad": 35,
      "telefono": "555-0101",
      "email": "maria.g@email.com",
      "fechaRegistro": "2025-01-15"
    },
    {
      "id": "P002",
      "nombre": "Juan Pérez",
      "edad": 42,
      "telefono": "555-0202",
      "email": "juan.perez@email.com",
      "fechaRegistro": "2025-02-01"
    }
  ]
}
```

#### **GET** `/pacientes/:id` - Obtener paciente por ID


**Repuesta 200**

```json
{
  "success": true,
    "data": {
        "id": "P003",
        "nombre": "Ana López",
        "edad": 28,
        "telefono": "555-0303",
        "email": "ana.lopez@email.com",
        "fechaRegistro": "2025-03-10"
    }
}
```

**Respuesta 404 (no encontrado):**

```json
{
  "success": false,
  "message": "Paciente no encontrado"
}
```
---

#### **PUT** `/pacientes/:id` - Actualizar datos del paciente
- Datos que se pueden actualizar: nombre, edad, telefono, email

**Respuesta 200:**

```json
{
  "success": true,
  "message": "Paciente actualizado correctamente",
  "data" : {
    "id" : "P005"
  }
}
```

**Respuesta 404**
```json
{
  "success": false,
  "message": "Usuario no encontrado",
}
```
---

### **GET** `/pacientes/:id/historial` - Ver historial de citas del paciente
```json
{
  {
    "success": true,
    "data": [
        {
            "id": "C003",
            "pacienteId": "P003",
            "doctorId": "D002",
            "fecha": "2025-11-11",
            "hora": "09:00",
            "motivo": "Consulta pediátrica",
            "estado": "programada"
        },
        {
            "id": "C005",
            "pacienteId": "P003",
            "doctorId": "D002",
            "fecha": "2025-12-05",
            "hora": "10:30",
            "motivo": "Lunares",
            "estado": "cancelada"
        }
    ]
}
}
```
---

### 🩺 Doctores

#### **POST** `/doctores` - Registrar nuevo doctor

**Respuesta 201** - Registro exitoso
```json
{
  "success" : true,
  "mensaje" : "Doctor registrado correctamente", 
  "data" : {
    {
    "id": "D005",
    "nombre": "Dr. Osvaldo Perez",
    "especialidad": "Ginecologo",
    "horarioInicio": "09:00",
    "horarioFin": "15:00",
    "diasDisponibles": [
      "Lunes",
      "Martes",
      "Miércoles",
      "Viernes"
    ]
  }
  }
}
```

**Respuesta 400** - Errores de validacion (ejemplo)
```json
{
  "success": false,
  "message" : "El doctor ya existe con esa especialidad" 
}
```

---

#### **GET** `/doctores` - Listar todos los doctores

**Respuesta 200**
```json
{
    "success": true,
    "data": [
        {
            "id": "D001",
            "nombre": "Dr. Carlos Méndez",
            "especialidad": "Cardiología",
            "horarioInicio": "09:00",
            "horarioFin": "17:00",
            "diasDisponibles": [
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes"
            ]
        },
        {
            "id": "D002",
            "nombre": "Dra. Laura Ruiz",
            "especialidad": "Pediatría",
            "horarioInicio": "08:00",
            "horarioFin": "14:00",
            "diasDisponibles": [
                "Lunes",
                "Miércoles",
                "Viernes"
            ]
        }
    ]
}
```
---
#### **GET** `/doctores/:id` - Obtener doctor por ID

**Respuesta 200**
```json
{
    "success": true,
    "data": {
        "id": "D001",
        "nombre": "Dr. Carlos Méndez",
        "especialidad": "Cardiología",
        "horarioInicio": "09:00",
        "horarioFin": "17:00",
        "diasDisponibles": [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes"
        ]
    }
}

```


**Respuesta 404**
```json
{
    "success": false,
    "message": "Doctor no encontrado"
}
```
---

#### **GET** `/doctores/especialidad/:especialidad` - Buscar doctores por especialidad
**Respuesta 200**
```json
{
    "success": true,
    "data": [
        {
            "id": "D001",
            "nombre": "Dr. Carlos Méndez",
            "especialidad": "Cardiología",
            "horarioInicio": "09:00",
            "horarioFin": "17:00",
            "diasDisponibles": [
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes"
            ]
        }
    ]
}
```
---

#### **GET** `/doctores/disponibles?fecha=YYYY-MM-DD&hora=HH:MM` - Buscar doctores dispibles en un horario

**Respuesta 200**
```json
{
    "success": true,
    "data": [
        {
            "id": "D001",
            "nombre": "Dr. Carlos Méndez",
            "especialidad": "Cardiología",
            "horarioInicio": "09:00",
            "horarioFin": "17:00",
            "diasDisponibles": [
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes"
            ]
        }
    ]
}
```
**Respuesta 400** - Parametros son requierido
```json
{
  "success": false,
  "message": "Debe proporcionar fecha y hora"
}
```

**Respuesta 404** - No disponibles
```json
{
    "success": false,
    "message": "No hay doctores disponibles en esa fecha y hora"
}
```

---

### 📅 Citas

#### **POST** `/citas` - Agendar nueva cita

**Respuesta 201:**

```json
{
  "success": true,
  "message" : "La cita se ha creado con exito",
  "data": {
    "id": "C005",
    "pacienteId": "P003",
    "doctorId": "D002",
    "fecha": "2025-12-05",
    "hora": "10:30",
    "motivo": "Lunares",
    "estado": "cancelada"
  }
```
**Respuesta 400**

```json
{
  "success" : false,
  "message" : "Paciente no existe" 
}
```
---

#### **GET** `/citas` Listar todas las citas (con filtros opcionales por fecha)
Filtros opcionales fecha y/o estado
`/citas?fecha=YYYY-MM-DD&estado=XXXX`

**Respuesta 200**
 ```json
{
    "success": true,
    "data": [
        {
            "id": "C001",
            "pacienteId": "P001",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "10:00",
            "motivo": "Revisión general",
            "estado": "programada"
        },
        {
            "id": "C002",
            "pacienteId": "P002",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "11:00",
            "motivo": "Dolor en el pecho",
            "estado": "cancelada"
        }
    ]
}
```

---

#### **GET** `/citas/:id` - Obtener cita por ID

**Respuesta 200**
 ```json
{
    "success": true,
    "data": {
        "id": "C001",
        "pacienteId": "P001",
        "doctorId": "D001",
        "fecha": "2025-11-10",
        "hora": "10:00",
        "motivo": "Revisión general",
        "estado": "programada"
    }
}
```
---

#### **PUT** `/citas/:id/cancelar` Cancelar una cita
**Respuesta 200**
```json
{
  "success" : true,
  "message" : "Cita cancelada correctamente"
}
```
**Respuesta 400** - Posible error
```json
{
  "success": false,
  "message": "Solo se pueden cancelar citas programadas" 
}
```
---

### **GET** `/citas/doctor/:doctorId` - Ver agenda de un doctor
**Respuesta 200**
```json
{
    "success": true,
    "data": [
        {
            "id": "C001",
            "pacienteId": "P001",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "10:00",
            "motivo": "Revisión general",
            "estado": "programada"
        },
        {
            "id": "C002",
            "pacienteId": "P002",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "11:00",
            "motivo": "Dolor en el pecho",
            "estado": "programada"
        }
    ]
}
```
---
### **GET** `/notificaciones/proximas` - Se obtienen las citas próximas (siguientes 24 horas)
```json
{
    "success": true,
    "data": [
        {
            "id": "C001",
            "pacienteId": "P001",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "10:00",
            "motivo": "Revisión general",
            "estado": "programada"
        },
        {
            "id": "C002",
            "pacienteId": "P002",
            "doctorId": "D001",
            "fecha": "2025-11-10",
            "hora": "11:00",
            "motivo": "Dolor en el pecho",
            "estado": "programada"
        }
    ]
}

```

---

## 🧪 Casos de Prueba
###    Crear 3 pacientes, 2 doctores
**Creacion de Pacientes**
![Crear paciente](/capturas/Caso%201%20Paciente.png)


**Creacion de Doctores**

![Crear doctores](/capturas/caso%201%20Doctores.png)

### Agendar 5 citas exitosamente

![Crear Citas](/capturas/Caso%202%20Registro%20de%20Citas.png)

## Intentar agendar una cita en horario no disponible (debe fallar)

![Crear Citas](/capturas/Caso%203%20Cita%20Fuera%20de%20horario.png)

### Intentar agendar dos citas al mismo doctor a la misma hora (debe fallar)

**Se agrega cita**
![Agendar cita](/capturas/caso%204%20agendar%20cita%201.png)

**Se agrega otra cita en el mismo horario**

![Falla cita](/capturas/caso%204%20agendar%20cita%202.png)


### Cancelar una cita

![Cancelar Citas](/capturas/caso%205%20cancelar%20cita.png)

### Consultar historial de un paciente

![Historial-Paciente](/capturas/caso%206%20historial.png)

---

###  Buscar doctores por especialidad

![Historial-Paciente](/capturas/caso%207%20doctor-especialidad.png)
