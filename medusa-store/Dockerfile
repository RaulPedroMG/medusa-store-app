FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json .
COPY yarn.lock .
COPY pnpm-lock.yaml .

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Expose the port the app will run on
EXPOSE 9000

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=9000

# Create data directory
RUN mkdir -p /app/data

# Command to run the application
CMD ["npx", "medusa", "start", "--host", "0.0.0.0"]
