# Despliegue en Dokploy - Medusa Store

Este documento proporciona instrucciones para desplegar tu tienda Medusa en Dokploy.

## Estructura del Proyecto

El proyecto consta de dos componentes principales:

1. **Backend de Medusa** (`medusa-store/`): El servidor de backend de Medusa que gestiona la lógica de negocio, la base de datos y las API.

2. **Storefront** (`medusa-storefront/`): Una aplicación Next.js que sirve como frontend para la tienda.

## Requisitos Previos

Antes de comenzar el despliegue, asegúrate de:

1. Tener una cuenta en Dokploy
2. Tener acceso a la CLI de Dokploy o a su panel de control
3. Tener la configuración de variables de entorno requeridas (ver `.env.example`)

## Configuración de Dokploy

El archivo `dokploy.yml` en la raíz del proyecto ya está configurado para desplegar ambos componentes:

- **medusa-backend**: El servidor backend de Medusa
- **medusa-storefront**: El frontend de la tienda
- **postgres**: Base de datos PostgreSQL para almacenar los datos
- **redis**: Para caché y gestión de colas

## Variables de Entorno

Es necesario configurar las siguientes variables de entorno en Dokploy:

### Variables para el Backend

- `NODE_ENV`: Configurado como `production`
- `PORT`: Puerto en el que se ejecutará el backend (por defecto 9000)
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `REDIS_URL`: URL de conexión a Redis
- `JWT_SECRET`: Secreto para los tokens JWT
- `COOKIE_SECRET`: Secreto para las cookies
- `STORE_CORS`: URL del storefront para CORS
- `ADMIN_CORS`: URL del panel de administración para CORS

### Variables para el Storefront

- `NODE_ENV`: Configurado como `production`
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: URL pública del backend de Medusa
- `PORT`: Puerto en el que se ejecutará el storefront (por defecto 8000)

## Pasos para el Despliegue

1. **Inicializa el despliegue en Dokploy**:

   ```bash
   dokploy init --name medusa-store
   ```

2. **Configura las variables de entorno**:

   Puedes configurar las variables de entorno a través de la CLI de Dokploy o desde el panel de control:

   ```bash
   dokploy env set DB_USERNAME=postgres
   dokploy env set DB_PASSWORD=your_secure_password
   # ... configurar el resto de variables según .env.example
   ```

3. **Despliega la aplicación**:

   ```bash
   dokploy deploy
   ```

4. **Verifica el despliegue**:

   ```bash
   dokploy status
   ```

## Administración de la Base de Datos

Dokploy proporciona una base de datos PostgreSQL gestionada. Si necesitas migrar datos existentes:

1. **Exporta tu base de datos actual**:

   ```bash
   pg_dump -U usuario -d medusa_db > medusa_backup.sql
   ```

2. **Importa a la base de datos de Dokploy**:

   ```bash
   dokploy db import --file medusa_backup.sql
   ```

## Solución de Problemas

Si encuentras problemas durante el despliegue:

1. **Verifica los logs**:

   ```bash
   dokploy logs medusa-backend
   dokploy logs medusa-storefront
   ```

2. **Reinicia los servicios**:

   ```bash
   dokploy restart medusa-backend
   dokploy restart medusa-storefront
   ```

## Mantenimiento

Para actualizar tu aplicación después de realizar cambios:

```bash
dokploy deploy
```

## Recursos Adicionales

- [Documentación de Dokploy](https://dokploy.com/docs)
- [Documentación de Medusa](https://docs.medusajs.com/)

## Soporte

Si necesitas ayuda con el despliegue en Dokploy, contacta al soporte de Dokploy en support@dokploy.com.