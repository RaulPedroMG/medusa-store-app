# Medusa E-Commerce Platform

Este repositorio contiene una configuración completa de Medusa e-commerce con dos componentes principales:

1. **medusa-store**: Backend de Medusa
2. **medusa-storefront**: Frontend Next.js

## Estructura del Proyecto

El proyecto está estructurado con componentes separados para backend y frontend, lo que permite:

- Gestionar cada componente de forma independiente cuando sea necesario
- Mantener separación de preocupaciones entre componentes
- Desplegar en diferentes entornos según sea necesario
- Escalar cada componente según necesidades específicas
- Facilitar el desarrollo y mantenimiento

## Configuración de puertos por defecto

| Componente | Servicio | Puerto predeterminado |
|------------|----------|----------------------|
| medusa-store | Medusa Backend | 9000 |
| medusa-storefront | Next.js Frontend | 8000 |

## Cómo ejecutar la aplicación

### Requisitos previos
- Node.js (v16 o superior)
- npm o pnpm
- PostgreSQL (para desarrollo local o conexión a una base de datos externa)
- Redis (para caché y gestión de colas)

### Iniciar el backend (Medusa)

```bash
# Navegar al directorio del backend
cd medusa-store

# Instalar dependencias
npm install
# o usando pnpm
pnpm install

# Ejecutar migraciones de base de datos
npm run migrations
# o
npx medusa migrations run

# Iniciar el servidor en modo desarrollo
npm run dev

# O para producción
npm run build
npm run start
```

### Iniciar el frontend (Next.js)

```bash
# Navegar al directorio del frontend
cd medusa-storefront

# Instalar dependencias
npm install
# o usando pnpm
pnpm install

# Iniciar el servidor en modo desarrollo
npm run dev

# O para producción
npm run build
npm run start
```

## Credenciales por defecto del administrador

- **Email**: admin@medusajs.com
- **Password**: supersecret

## Acceso a los servicios (desarrollo local)

- **Panel de administración**: http://localhost:9000/admin
- **API de la tienda**: http://localhost:9000/store
- **Tienda (frontend)**: http://localhost:8000

## Estructura del proyecto

```
medusa-store/
├── dokploy.yml              # Configuración para despliegue en Dokploy
├── .env.example             # Variables de entorno de ejemplo
├── medusa-store/            # Backend de Medusa
│   ├── src/                 # Código fuente del backend
│   ├── package.json         # Dependencias y scripts para el backend
│   ├── medusa-config.ts     # Configuración de Medusa
│   └── ...                  # Otros archivos del backend
└── medusa-storefront/       # Frontend de Next.js
    ├── src/                 # Código fuente del frontend
    ├── public/              # Archivos estáticos
    ├── package.json         # Dependencias y scripts para el frontend
    ├── next.config.js       # Configuración de Next.js
    └── ...                  # Otros archivos del frontend
```

## Configuración avanzada

### Variables de entorno

La configuración de la aplicación se realiza principalmente a través de variables de entorno:

#### Backend (medusa-store)

Crea un archivo `.env` en el directorio `medusa-store` con las siguientes variables:

```
# Base de datos
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/medusa

# Redis
REDIS_URL=redis://localhost:6379

# JWT y cookies
JWT_SECRET=tu_secreto_seguro
COOKIE_SECRET=otro_secreto_seguro

# CORS
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7000
```

#### Frontend (medusa-storefront)

Crea un archivo `.env.local` en el directorio `medusa-storefront`:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

### Desarrollo en componentes específicos

Para un desarrollo más eficiente, puedes trabajar en cada componente de forma independiente:

```bash
# Backend: ejecutar con recarga en caliente
cd medusa-store
npm run dev

# Frontend: ejecutar con recarga en caliente
cd medusa-storefront
npm run dev
```

### Base de datos

Para gestionar la base de datos:

```bash
# Ejecutar migraciones
cd medusa-store
npx medusa migrations run

# Crear usuario administrador
cd medusa-store
npx medusa user --email admin@example.com --password tu_contraseña
```

### Personalización

#### Backend
- Personaliza el comportamiento del backend mediante plugins de Medusa
- Modifica los servicios y controladores en `medusa-store/src`
- Configura opciones avanzadas en `medusa-config.ts`

#### Frontend
- Personaliza la apariencia modificando los componentes en `medusa-storefront/src/components`
- Ajusta los estilos y temas a través de Tailwind CSS
- Añade nuevas páginas y funcionalidades en `medusa-storefront/src/pages`

## Despliegue

Este proyecto está configurado para ser desplegado en Dokploy. Consulta el archivo `DOKPLOY.md` para instrucciones detalladas sobre el proceso de despliegue.

### Requisitos para el despliegue

- Cuenta en Dokploy
- Acceso al panel de control de Dokploy o a su CLI
- Repositorio Git configurado (GitHub, GitLab, Bitbucket, etc.)
- Variables de entorno configuradas según `.env.example`

## Contribución

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).