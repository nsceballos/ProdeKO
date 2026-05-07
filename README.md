# Prode Mundial 2026 ⚽

Aplicación de pronósticos para el FIFA World Cup 2026. Construida con Next.js 14, Tailwind CSS y Google Sheets como base de datos.

---

## Requisitos Previos

- Node.js 18 o superior
- Cuenta de Google Cloud
- Hoja de cálculo de Google Sheets

---

## 1. Configurar Google Cloud y la cuenta de servicio

1. Ingresá a [Google Cloud Console](https://console.cloud.google.com)
2. Creá un proyecto nuevo (o usá uno existente)
3. Habilitá la **Google Sheets API**:
   - Ir a "APIs y servicios" → "Biblioteca"
   - Buscar "Google Sheets API" y habilitarla
4. Creá una cuenta de servicio:
   - Ir a "APIs y servicios" → "Credenciales"
   - Click en "Crear credenciales" → "Cuenta de servicio"
   - Completá el nombre y creá la cuenta
   - En la cuenta de servicio creada, ir a "Claves" → "Agregar clave" → "Crear nueva clave" → JSON
   - Descargá el archivo JSON (lo usarás para obtener el email y la clave privada)

---

## 2. Configurar la Hoja de Cálculo

1. Creá una nueva hoja de cálculo en [Google Sheets](https://sheets.google.com)
2. Compartí la hoja con el email de la cuenta de servicio (el campo `client_email` del JSON descargado), dándole permisos de **editor**
3. Anotá el ID de la hoja (está en la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`)
4. Creá las siguientes pestañas con sus encabezados:

### Pestaña `users`
| id | email | name | password_hash | created_at |
|----|-------|------|---------------|------------|

### Pestaña `predictions`
| id | user_email | match_id | prediction | updated_at |
|----|------------|----------|------------|------------|

### Pestaña `results`
| match_id | result |
|----------|--------|

> **Nota sobre `results`**: El campo `result` acepta los valores `home`, `draw` o `away`. Esta hoja la completa el administrador manualmente cuando termina cada partido.

---

## 3. Configurar Variables de Entorno

1. Copiá el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

2. Editá `.env.local` con tus valores:

```env
# ID de la hoja de cálculo (de la URL de Google Sheets)
GOOGLE_SHEETS_ID=tu_id_aqui

# Email de la cuenta de servicio (campo client_email del JSON)
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-cuenta@tu-proyecto.iam.gserviceaccount.com

# Clave privada (campo private_key del JSON, reemplazando saltos de línea con \n)
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"

# Clave secreta para JWT (generá una con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=tu_clave_secreta_de_al_menos_32_caracteres
```

> **Importante**: Para `GOOGLE_PRIVATE_KEY`, tomá el valor del campo `private_key` del archivo JSON descargado de Google Cloud. Los saltos de línea (`\n`) deben quedar como `\n` literales dentro de las comillas dobles.

---

## 4. Instalar Dependencias y Correr la App

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Construir para producción
npm run build
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## Funcionalidades

- **Login y Registro**: Autenticación con JWT en cookie HTTP-only
- **Predicciones**: Elegí Local / Empate / Visitante para cada partido
- **Bloqueo automático**: No se pueden modificar predicciones cuando el partido ya comenzó
- **Ranking**: Tabla con puntos de todos los usuarios (3 puntos por acierto)
- **Filtros por grupo**: Filtrá los partidos por grupo (A-L) o ver todos
- **Cuenta regresiva**: Contador en el header hasta el inicio del Mundial

---

## Estructura del Proyecto

```
prodeko/
├── components/
│   ├── Header.js        # Barra superior con cuenta regresiva
│   └── MatchCard.js     # Tarjeta de partido con botones de predicción
├── data/
│   └── worldcup2026.js  # Datos de equipos, grupos y partidos
├── lib/
│   ├── auth.js          # JWT helpers
│   └── sheets.js        # Google Sheets API helpers
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Página de login
│   ├── register.js      # Página de registro
│   ├── app.js           # Página principal (predicciones + ranking)
│   └── api/
│       ├── auth/
│       │   ├── login.js
│       │   └── register.js
│       ├── me.js
│       ├── logout.js
│       ├── predictions.js
│       └── ranking.js
├── styles/
│   └── globals.css
├── .env.local.example
└── README.md
```
