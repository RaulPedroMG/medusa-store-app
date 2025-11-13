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

# Build the application
RUN npm run build

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "start"]
