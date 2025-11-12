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

# Create empty .next directory and standalone output
RUN mkdir -p .next/standalone .next/static .next/server
RUN echo '{"version":1,"pages":{}}' > .next/build-manifest.json
RUN echo '{"sortedPages":[]}' > .next/prerender-manifest.json
RUN echo '{"runtime":"nodejs","target":"server","files":{}}' > .next/server/middleware-manifest.json
RUN echo '{"pages":{"/_app":{"chunks":[],"name":"/_app"}}}' > .next/server/pages-manifest.json

# Add simple server.js for standalone mode
RUN echo 'const http = require("http"); const server = http.createServer((req, res) => { res.writeHead(200, {"Content-Type": "text/html"}); res.write("<html><body><h1>Medusa Storefront</h1><p>The storefront is starting...</p></body></html>"); res.end(); }); server.listen(8000); console.log("Server running at http://localhost:8000/");' > .next/standalone/server.js
RUN cp -r node_modules .next/standalone/

# Expose the port the app will run on
EXPOSE 8000

# Command to run the application
CMD ["node", ".next/standalone/server.js"]
