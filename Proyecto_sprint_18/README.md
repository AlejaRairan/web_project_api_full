# Around the U.S.

Aplicación de red social construida con **React**, donde los usuarios pueden registrarse, iniciar sesión, ver un feed de tarjetas (fotos con "me gusta") y editar su perfil. El frontend se conecta a una API REST propia (backend en Express) y utiliza autenticación con JWT.

## Demo

🔗 [wtwrr.chickenkiller.com](https://wtwrr.chickenkiller.com)

## Tecnologías

- **React** (hooks, Context API)
- **Vite** como bundler
- **react-router-dom** para el ruteo y las rutas protegidas
- **CSS** siguiendo la metodología **BEM**
- **REST API** propia (backend en Express, desplegado en `api.wtwrr.chickenkiller.com`) con autenticación JWT

## Funcionalidades

- Registro e inicio de sesión de usuarios (`/signup`, `/signin`) con validación de formularios
- Manejo de token JWT guardado en `localStorage`, verificado al cargar la app
- Rutas protegidas: solo usuarios autenticados pueden ver el feed principal (`ProtectedRoute`)
- Redirección automática de usuarios ya logueados que intentan volver a `/signin` o `/signup` (`RedirectIfLoggedIn`)
- Header dinámico con 3 estados según autenticación y ruta actual
- Popup de confirmación (`InfoTooltip`) que muestra ícono y mensaje distintos según el resultado del registro (éxito o error)
- Edición de perfil, agregado y eliminado de tarjetas, sistema de "me gusta"
- Diseño responsive (overlays con `position: fixed` + flexbox en vez de valores fijos en píxeles)

## Estructura de componentes principales

- `App.js` — enrutamiento general, estado de autenticación, layout con `page` / `page__content`
- `Header` — navegación dinámica según estado de sesión
- `Login` / `Register` — formularios de autenticación
- `ProtectedRoute` — bloquea rutas privadas a usuarios no logueados
- `RedirectIfLoggedIn` — evita que un usuario logueado vuelva a ver login/registro
- `InfoTooltip` — popup de confirmación de registro (éxito/error)
- `Api.jsx` — clase que centraliza las peticiones a la API (usuarios, tarjetas), leyendo el token dinámicamente desde `localStorage`
- `auth.js` — funciones `register`, `authorize` y `checkToken` contra la API de autenticación

## Convenciones de código

- Nomenclatura de clases CSS en **BEM**, con nombres que reflejan el rol real del elemento (por ejemplo, en el popup de registro: `register` como overlay, `register__card` como tarjeta, `register__close-btn` como botón de cerrar)
- El token JWT nunca se hardcodea: cada método de `Api.jsx` lo obtiene con `localStorage.getItem("jwt")` al momento de la petición
- Linting con **ESLint** (configuración `airbnb-base` en el backend)

## Instalación

```bash
npm install
npm run dev
```