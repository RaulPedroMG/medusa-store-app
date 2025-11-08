<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Backend for Dokploy
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Backend service for the Medusa e-commerce platform, configured for Dokploy deployment
</p>

## Overview

This is the backend service for our Medusa e-commerce platform. It's configured to be deployed on Dokploy and provides all the API endpoints needed for the storefront and admin dashboard.

## Features

- Complete e-commerce API functionality
- Product management
- Order processing
- Customer management
- Inventory tracking
- Shipping options
- Payment processing

## Deployment on Dokploy

This backend is configured to be deployed on Dokploy. See the main project README and DOKPLOY.md for complete deployment instructions.

### Environment Variables

The following environment variables need to be configured in Dokploy:

```
# Database
DATABASE_URL=postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}

# JWT and cookies
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret

# CORS
STORE_CORS=https://your-storefront-url
ADMIN_CORS=https://your-admin-url
```

## Local Development

To run this backend locally:

```bash
# Install dependencies
npm install

# Run migrations
npx medusa migrations run

# Start development server
npm run dev
```

## Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [Dokploy Documentation](https://dokploy.com/docs)
