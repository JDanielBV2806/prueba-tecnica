# Prueba Técnica - Node.js + Express + MySQL

Este proyecto es una API REST con autenticación JWT, gestión de productos y categorías, además de un pequeño CRUD de personas con vistas renderizadas con Handlebars.

## Tecnologías

- Node.js
- Express
- MySQL
- JWT
- bcrypt
- express-handlebars
- CORS
- Nodemon

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 18 o superior
- npm
- MySQL Server (puedes usar XAMPP, WAMP, MAMP o MySQL local)
- Un cliente para probar la API (Postman o similar)

## 1. Clonar el proyecto

```bash
git clone <url-del-repositorio>
cd PT
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=Prueba01
PORT=3000
JWT_SECRET=mi_clave_super_secreta
JWT_EXPIRES_IN=1d
```

Ajusta los valores según tu instalación local de MySQL.

> Importante: el archivo `.env` no debe subirse a GitHub ni compartirlo públicamente.

## 4. Crear la base de datos y tablas

Conectate a MySQL y ejecuta:

```sql
CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL
);
```

También puedes usar el script que trae la carpeta `src/database/query.sql` como referencia.

## 5. Ejecutar el proyecto

En la raíz del proyecto:

```bash
npm run dev
```

Esto arrancará la aplicación con nodemon y quedará escuchando en:

```text
http://localhost:3000
```

Si quieres ejecutar sin nodemon:

```bash
node src/index.js
```

## 6. Endpoints principales

### Autenticación

- `POST /api/auth/registro`
  - Body:
    ```json
    {
      "nombre": "Juan",
      "email": "juan@email.com",
      "password": "123456"
    }
    ```

- `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "juan@email.com",
      "password": "123456"
    }
    ```
  - Responde con un token JWT.

### Categorías

- `POST /api/categorias` - requiere token
- `GET /api/categorias` - requiere token
- `PUT /api/categorias/:id` - requiere token
- `DELETE /api/categorias/:id` - requiere token

### Productos

- `POST /api/productos` - requiere token
- `GET /api/productos` - requiere token
- `PUT /api/productos/:id` - requiere token
- `DELETE /api/productos/:id` - requiere token

### Públicos

- `GET /api/publico/productos` - acceso público

### Personas (vistas y CRUD web)

- `GET /add`
- `POST /add`
- `GET /list`
- `GET /edit/:id`
- `POST /edit/:id`
- `GET /delete/:id`

## 7. Probar con JWT

Una vez que te logueas, usa el token de respuesta en el header Authorization:

```http
Authorization: Bearer <token>
```

## 8. Postman

El proyecto incluye colecciones en la carpeta `postman/`. Puedes importarlas para probar todos los endpoints más rápido.

## 9. Solución de problemas comunes

### Error de conexión a MySQL

Revisa:

- que MySQL esté corriendo
- que el usuario y contraseña de `.env` coincidan
- que la base `Prueba01` exista
- que el puerto `3306` esté correcto

### Error de token

Asegúrate de:

- hacer login antes de usar rutas protegidas
- enviar el JWT en el formato correcto:
  ```http
  Authorization: Bearer <tu_token>
  ```

### La app no levanta

Verifica que:

- hayas ejecutado `npm install`
- no tengas errores de sintaxis en Node
- el archivo `.env` exista y tenga las variables correctas

## 10. Comandos útiles

```bash
npm install
npm run dev
```

## 11. Estructura principal

```text
PT/
├── database.js
├── package.json
├── README.md
├── postman/
├── src/
│   ├── index.js
│   ├── database/
│   ├── middleware/
│   ├── public/
│   ├── routes/
│   └── views/
└── .env
```
## 11. Aclaraciones

La base de datos SQL creada para esto no se encuentra en el repositorio, estoy validando una manera de poder hacerla online y que quede subida en la nube para un acceso mucho mas facil al momento de compartir mi codigo
De igual manera comparto los Query que deben ser ejecutados para la creacion de dicha tabla

## 11. Falla

En mi ultima revision detecte una falla al momento de hacer login, ya que redirigia a un error 404 el cual aparentemente se debe a la ubicacion de una carpeta y asi mismo el mal direccionamiento a ella

## 12. Nombres de Variables

Debido a mis pocos conocimientos en algunas de las tecnologias requeridas este proyecto se fue realizando en base a foros y ejemplos visuales que tomaban como iniciativa el echo de crear una base de datos la cual manejara personas y sus propiedade fueran nombre, edad, apellido, tengo pendiente cambiar estos valores por valores mas concretos para la prueba

## 13. Plantillas

Se utilizaron plantillas de la api (handlebars) para ver de manera grafica mis avances y asi darle un Render al Backend, tambien se configuraron estas plantillas con boostrap y los botones de ejmplo con fontawesome

