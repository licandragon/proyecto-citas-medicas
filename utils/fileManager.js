const fs = require("fs");
const path = require("path");
function obtenerRutaArchivo(nombreArchivo) {
    return path.join(__dirname, '..', 'data', nombreArchivo);
}
const leerJSON = (nombreArchivo) => {
    const archivo = obtenerRutaArchivo(nombreArchivo);
    try {
        const data = fs.readFileSync(archivo, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error leyendo ${nombreArchivo}:`, err);
        return  [] ;
    }
};

const escribirJSON = (nombreArchivo, data) => {
    const JSON_FILE = obtenerRutaArchivo(nombreArchivo);
    try {
        fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2), "utf-8");
        return true;
    } catch (error) {
        console.error(`Error escribiendo ${archivo}:`, err);
        return false;
    }
};

module.exports = {
    leerJSON,
    escribirJSON
}