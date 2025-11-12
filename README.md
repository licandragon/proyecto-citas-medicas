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

**Respuesta 201:**

```json
{
  "sucess": true,
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

#### **GET** `/pacientes` - Listar todos los pacientes

**Respuesta 200:**

```json
{
  "sucess": true,
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
  },
  {
    "id": "P003",
    "nombre": "Ana López",
    "edad": 28,
    "telefono": "555-0303",
    "email": "ana.lopez@email.com",
    "fechaRegistro": "2025-03-10"
  }
  ]
}
```

#### **GET** `/pacientes/:id` - Obtener paciente por ID

**Respuesta 404 (no encontrado):**

```json
{
  "success": false,
  "message": "Paciente no encontrado"
}
```

#### **PUT** `/pacientes/:id` - Actualizar datos del paciente

```json
{
  "nombre": "Carlos Pérez López",
  "edad": 31,
  "telefono": "5559876543",
  "email": "carlos@example.com"
}
```

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
### **GET** `/pacientes/:id/historial` - Ver historial de citas del paciente
```json
{

}
```
---

### 🩺 Doctores

#### **POST** `/doctores` - Registrar nuevo doctor

```json
{
  "nombre": "Dra. Ana Gómez",
  "especialidad": "Cardiología",
  "telefono": "5553217890"
}
```

#### **GET** `/doctores` - Listar todos los doctores
```json
{
  "sucess": true,
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
  },
  {
    "id": "P003",
    "nombre": "Ana López",
    "edad": 28,
    "telefono": "555-0303",
    "email": "ana.lopez@email.com",
    "fechaRegistro": "2025-03-10"
  }
  ]
}
```

#### **GET** `/doctores/:id` - Obtener doctor por ID

#### **GET** `/doctores/especialidad/:especialidad` - Buscar doctores por especialidad

#### **GET** `/doctores/disponibles?fecha=YYYY-MM-DD&hora=HH:MM` - Buscar doctores dispibles en un horario


---

### 📅 Citas

#### **POST** `/citas` - Agendar nueva cita

```json
{
  "idPaciente": 1,
  "idDoctor": 2,
  "fecha": "2025-11-15",
  "hora": "09:00"
}
```

**Respuesta 201:**

```json
{
  "success": true,
  "data": {
    "id": 5,
    "paciente": "Carlos Pérez",
    "doctor": "Dra. Ana Gómez",
    "fecha": "2025-11-15",
    "hora": "09:00"
  }
}
```

#### **GET** `/citas` Listar todas las citas (con filtros opcionales por fecha)

#### **GET** `/citas/:id` - Obtener cita por ID

#### **PUT** `/citas/:id/cancelar` Cancelar una cita
**Respuesta:**

```json
{
  "success": true,
  "message": "Cita cancelada exitosamente"
}
```

### **GET** `/citas/doctor/:doctorId` - Ver agenda de un doctor


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
