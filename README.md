# TaskFlow - Lista de tareas PWA

TaskFlow es una aplicación web progresiva (PWA) desarrollada con React, Vite y Firebase. Permite a los usuarios administrar sus tareas personales mediante operaciones CRUD, autenticación y almacenamiento de datos en tiempo real.

## Tecnologías utilizadas

- **React:** biblioteca para construir la interfaz de usuario.
- **Vite:** herramienta para ejecutar y compilar la aplicación.
- **JavaScript:** lenguaje de programación.
- **Firebase Authentication:** autenticación de usuarios.
- **Cloud Firestore:** almacenamiento de tareas en la nube.
- **Firebase Hosting:** alojamiento de la aplicación.
- **SweetAlert2:** alertas y ventanas de confirmación.
- **vite-plugin-pwa:** configuración de la aplicación web progresiva.

## Funcionalidades

- Registro e inicio de sesión con correo electrónico y contraseña.
- Inicio de sesión con Google.
- Crear, consultar, editar y eliminar tareas.
- Marcar tareas como completadas o pendientes.
- Actualización automática de tareas en tiempo real.
- Separación de tareas por usuario.
- Reglas de seguridad en Firestore.
- Instalación como aplicación PWA.
- Diseño adaptable a diferentes dispositivos.

## Requisitos previos

Para ejecutar el proyecto necesitas:

- Node.js instalado.
- npm (se instala junto con Node.js).
- Git para clonar el repositorio.
- Una cuenta y proyecto configurado en Firebase.

## Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar a la carpeta del proyecto

```bash
cd lista-tareas-pwa
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar Firebase

La aplicación necesita una configuración de Firebase para conectarse con Authentication y Cloud Firestore.

Configura las credenciales de tu proyecto Firebase en el archivo de conexión correspondiente (`src/services/firebase.js` o el archivo que utilice el proyecto).

Debes habilitar:

- Firebase Authentication.
- Inicio de sesión con correo y contraseña.
- Proveedor de Google, si deseas utilizar ese método.
- Cloud Firestore.
- Las reglas de seguridad de la colección `tasks`.

No compartas credenciales privadas ni subas archivos `.env` con información sensible.

## Ejecutar en modo desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre en el navegador:

```text
http://localhost:5173/
```

## Compilar para producción

Para generar los archivos optimizados de la aplicación:

```bash
npm run build
```

Los archivos generados se almacenan en la carpeta `dist`.

## Probar la versión de producción

Después de compilar el proyecto, ejecuta:

```bash
npm run preview
```

Abre:

```text
http://localhost:4173/
```

## Despliegue en Firebase Hosting

Para publicar una nueva versión de la aplicación:

1. Instalar Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Iniciar sesión:

```bash
firebase login
```

3. Seleccionar el proyecto Firebase:

```bash
firebase use
```

4. Generar la compilación:

```bash
npm run build
```

5. Desplegar la aplicación:

```bash
firebase deploy --only hosting
```

## Aplicación desplegada

https://lista-tareas-pwa.web.app

## Repositorio

https://github.com/IDGS-902-23002189/lista-tareas-pwa.git

