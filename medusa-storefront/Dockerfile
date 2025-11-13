FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create .env.local with backend URL
RUN echo 'NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://medusa-backend:9000' > .env.local

# Set environment variables for build time
ENV NODE_ENV=production
ENV SKIP_BUILD_STATIC_GENERATION=true
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://medusa-backend:9000

# Build the application with static generation disabled
RUN npm run build

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "start"]
