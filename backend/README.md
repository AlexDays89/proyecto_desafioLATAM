# 🧱 Proyecto Base Backend

> Propiedad de **Raul Farias S.**

Proyecto base backend moderno, configurado con buenas prácticas de desarrollo, que incluye:

- ![standardjs](https://img.shields.io/badge/-263238?logo=standardjs) Linter de **JavaScript** con [StandardJS](https://standardjs.com/)
- ![git](https://img.shields.io/badge/-263238?logo=git) Validación previa al commit con [Husky](https://typicode.github.io/husky/) y [Lint-Staged](https://github.com/lint-staged/lint-staged/)
- ![git](https://img.shields.io/badge/-263238?logo=git) Convención de commits con [Commitlint](https://commitlint.js.org/) de [Conventional Commits](https://www.conventionalcommits.org/)
- ![MSW](https://img.shields.io/badge/-263238?logo=mockServiceWorker) Mocking de APIs con [Mock Service Worker (MSW)](https://mswjs.io/)
- ![vitest](https://img.shields.io/badge/-263238?logo=vitest) Pruebas unitarias con [Vitest](https://vitest.dev/)
- ![esbuild](https://img.shields.io/badge/-263238?logo=esbuild) Empaquetador ultrarrápido con [esbuild](https://esbuild.github.io/)
- ![react](https://img.shields.io/badge/-263238?logo=react) Plantillas de correo con [React](https://react.dev/) y [React Email](https://react.email/)
- ![resend](https://img.shields.io/badge/-263238?logo=resend) Envío de correos con [Resend](https://resend.com/)

Este proyecto está preparado para iniciar desarrollos backend escalables, garantizando una base de código limpia, consistente y testeada desde el comienzo.



## 🚀 Requisitos

| Paquete              | Versión   | Badge                                                                  |
|----------------------|-----------|------------------------------------------------------------------------|
| Node                 | `22.17.1` | ![node](https://img.shields.io/badge/node-22.17.1-339933?logo=node.js) |
| pnpm                 | `10.13.1` | ![pnpm](https://img.shields.io/badge/pnpm-10.13.1-F69220?logo=pnpm)    |



## 🔧 Instalación

1. Clona el repositorio con el método que prefieras:

   **HTTPS** o **SSH:**
   ```bash
   git clone <URL>
   ```

   **GitHub CLI:**
   ```bash
   gh repo clone <URL>
    ```

2. Instala las dependencias:

   **PNPM**
   ```bash
   pnpm install
   ```


## ⚙️ Scripts disponibles

```bash
pnpm run dev         # Ejecuta el entorno de desarrollo con el paquete tsx
pnpm run start       # Ejecuta el archivo compilado con Nodejs
pnpm run build       # Compila el proyecto para producción mediante esbuild
pnpm run lint        # Lint JS con StandardJS
pnpm run test        # Ejecuta los tests con Vitest
pnpm run prepare     # Inicializa Husky (Git Hooks)
```



## 📂 Estructura de Carpetas

```
|--------------------------------------------------------------------------------------------------------|
| Carpeta                              | Descripción                                                     |
|--------------------------------------------------------------------------------------------------------|
| backend-base                         | Carpeta raíz del proyecto.                                      |
| ├── .husky                           | Configuración de hooks de Git para tareas automatizadas.        |
| ├── coverage                         | Reportes generados por herramientas de cobertura de pruebas.    |
| ├── dist                             | Archivos compilados/listos para producción.                     |
| ├── documentation                    | Documentación técnica del proyecto.                             |
| │   ├── database                     | Documentación específica de la base de datos.                   |
| │   │   ├── SQL                      | Scripts SQL usados para crear y poblar la base de datos.        |
| │   │   └── diagrams                 | Diagramas de entidad-relación u otros relacionados.             |
| │   ├── interface                    | Documentación de interfaces de usuario o componentes visuales.  |
| │   └── postman                      | Configuraciones para pruebas de API con Postman.                |
| │       ├── collections              | Colecciones de peticiones HTTP para pruebas.                    |
| │       └── environments             | Variables de entorno utilizadas en Postman.                     |
| ├── logs                             | Archivos de log generados por la aplicación.                    |
| ├── mocks                            | Mocks para pruebas y desarrollo local.                          |
| ├── src                              | Código fuente principal del proyecto.                           |
| │   ├── config                       | Archivos de configuración del proyecto.                         |
| │   ├── server                       | Lógica principal del servidor.                                  |
| │   │   ├── api                      | Definición de las rutas de la API.                              |
| │   │   │   └── v1                   | Primera versión de la API.                                      |
| │   │   │       ├── controllers      | Lógica que responde a las peticiones HTTP.                      |
| │   │   │       ├── middlewares      | Funciones intermedias para el manejo de peticiones/respuestas.  |
| │   │   │       ├── models           | Definición de estructuras o entidades de datos (sin ORM).       |
| │   │   │       ├── routes           | Definición y agrupación de rutas por módulo.                    |
| │   │   │       └── schemas          | Validaciones y definiciones de datos con esquemas (e.g. zod).   |
| │   │   ├── middlewares              | Middlewares de uso general no atados a una versión de API.      |
| │   │   └── services                 | Servicios desacoplados que manejan lógica externa.              |
| │   │       ├── database             | Conexión y lógica para interactuar con la base de datos.        |
| │   │       └── mailer               | Lógica de envío de correos.                                     |
| │   │           └── templates        | Plantillas de correo basadas en React.                          |
| │   └── utils                        | Funciones utilitarias y helpers generales.                      |
| │       └── auth                     | Utilidades relacionadas con autenticación/autorización.         |
| └── test                             | Archivos de testing del proyecto.                               |
|--------------------------------------------------------------------------------------------------------|
```



## 📦 Dependencias

### 🌍 Producción

| Paquete              | Versión   | Badge                                                                  |
|----------------------|-----------|------------------------------------------------------------------------|
| tempo                    | `17.1.2`  | ![@formkit/tempo](https://img.shields.io/npm/v/@formkit/tempo.svg?label=@formkit/tempo&color=263238) |
| @react-email/components  | `17.1.2`  | ![@react-email/components](https://img.shields.io/npm/v/@react-email/components.svg?label=@react-email/components&color=263238) |
| @react-email/render      | `17.1.2`  | ![@react-email/render](https://img.shields.io/npm/v/@react-email/render.svg?label=@react-email/render&color=263238) |
| bcryptjs                 | `17.1.2`  | ![bcryptjs](https://img.shields.io/npm/v/bcryptjs.svg?label=bcryptjs&color=263238) |
| cors                     | `17.1.2`  | ![cors](https://img.shields.io/npm/v/cors.svg?label=cors&color=263238) |
| dotenv                   | `17.1.2`  | ![dotenv](https://img.shields.io/npm/v/dotenv.svg?label=dotenv&color=263238) |
| express                  | `17.1.2`  | ![express](https://img.shields.io/npm/v/express.svg?label=express&color=263238) |
| helmet                   | `17.1.2`  | ![helmet](https://img.shields.io/npm/v/helmet.svg?label=helmet&color=263238) |
| jsonwebtoken             | `17.1.2`  | ![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken.svg?label=jsonwebtoken&color=263238) |
| morgan                   | `17.1.2`  | ![morgan](https://img.shields.io/npm/v/morgan.svg?label=morgan&color=263238) |
| pg                       | `17.1.2`  | ![pg](https://img.shields.io/npm/v/pg.svg?label=pg&color=263238) |
| react                    | `17.1.2`  | ![react](https://img.shields.io/npm/v/react.svg?label=react&color=263238) |
| react-dom                | `17.1.2`  | ![react-dom](https://img.shields.io/npm/v/react-dom.svg?label=react-dom&color=263238) |
| resend                   | `17.1.2`  | ![resend](https://img.shields.io/npm/v/resend.svg?label=resend&color=263238) |
| uuid                     | `17.1.2`  | ![uuid](https://img.shields.io/npm/v/uuid.svg?label=uuid&color=263238) |
| winston                  | `17.1.2`  | ![winston](https://img.shields.io/npm/v/winston.svg?label=winston&color=263238) |
| zod                      | `17.1.2`  | ![zod](https://img.shields.io/npm/v/zod.svg?label=zod&color=263238) |

---

### 💻 Desarrollo

| Paquete                         | Versión   | Badge                                                                  |
|---------------------------------|-----------|------------------------------------------------------------------------|
| StandardJS                      | `17.1.2`  | ![standard](https://img.shields.io/badge/standard-17.1.2-F3DF49?logo=standardjs) |
| Husky                           | `9.1.7`   | ![husky](https://img.shields.io/badge/husky-9.1.7-263238?style=flat) |
| Lint-Staged                     | `16.1.2`  | ![lint-staged](https://img.shields.io/badge/lint--staged-16.1.2-263238?style=flat) |
| @commitlint/cli                 | `19.8.1`  | ![commitlint-cli](https://img.shields.io/badge/@commitlint/cli-19.8.1-000000?logo=commitlint)     |
| @commitlint/config-conventional | `19.8.1`  | ![commitlint-config](https://img.shields.io/badge/@commitlint/config--conventional-19.8.1-FE5196?logo=conventionalcommits) |
| MSW                             | `2.10.4`  | ![msw](https://img.shields.io/badge/Mock%20Service%20Worker-2.10.4-FF6A33?logo=mockserviceworker) |
| jsdom                           | `26.1.0`  | ![jsdom](https://img.shields.io/badge/jsdom-26.1.0-FFCA28?logo=javascript) |
| jest-dom                        | `6.6.4`   | ![jest-dom](https://img.shields.io/badge/@testing--library/jest--dom-6.6.4-1E4A8C?logo=testinglibrary) |
| react-testing-library           | `16.3.0`  | ![react-testing-library](https://img.shields.io/badge/@testing--library/react-16.3.0-E33332?logo=testinglibrary) |
| user-event                      | `14.6.1`  | ![user-event](https://img.shields.io/badge/@testing--library/user--event-14.6.1-FFB400?logo=testinglibrary) |
| vitest                          | `3.2.4`   | ![vitest](https://img.shields.io/badge/vitest-3.2.4-6E4AFF?logo=vitest) |
| vitest-ui                       | `3.2.4`   | ![vitest-ui](https://img.shields.io/badge/@vitest/ui-3.2.4-6E4AFF?logo=vitest) |
| coverage-v8                     | `3.2.4`   | ![coverage-v8](https://img.shields.io/badge/@vitest/coverage--v8-3.2.4-6E4AFF?logo=vitest) |
| tsx                             | `4.20.3`  | ![tsx](https://img.shields.io/badge/tsx-4.20.3-3178C6?logo=ts-node) |
| esbuild                         | `0.25.8`  | ![esbuild](https://img.shields.io/badge/esbuild-0.25.8-FFCF00?logo=esbuild) |




## 📄 Licencia

MIT © Raul Farias S. | [Ver licencia completa](./LICENSE.md)
