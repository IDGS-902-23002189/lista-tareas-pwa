
import Swal from "sweetalert2";

// Configuración general
const configuracion = {
  confirmButtonColor: "#7654d6",
  cancelButtonColor: "#9ca3af",
  background: "#ffffff",
  color: "#25213a",
  customClass: {
    popup: "taskflow-alert"
  }
};

// ALERTA DE ÉXITO
export const alertaExito = (titulo, mensaje) => {
  return Swal.fire({
    ...configuracion,
    icon: "success",
    title: titulo,
    text: mensaje,
    confirmButtonText: "Aceptar"
  });
};

// ALERTA DE ERROR
export const alertaError = (titulo, mensaje) => {
  return Swal.fire({
    ...configuracion,
    icon: "error",
    title: titulo,
    text: mensaje,
    confirmButtonText: "Entendido"
  });
};

// ALERTA DE INFORMACIÓN
export const alertaInfo = (titulo, mensaje) => {
  return Swal.fire({
    ...configuracion,
    icon: "info",
    title: titulo,
    text: mensaje,
    confirmButtonText: "Aceptar"
  });
};

// CONFIRMAR UNA ACCIÓN
export const confirmarAccion = (titulo, mensaje) => {
  return Swal.fire({
    ...configuracion,
    icon: "warning",
    title: titulo,
    text: mensaje,
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
    reverseButtons: true
  });
};

// ALERTA PEQUEÑA DE ÉXITO
export const notificacionExito = (mensaje) => {
  return Swal.fire({
    ...configuracion,
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });
};
