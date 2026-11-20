# Using Node 22 Alpine to match local system Node version (v22.17.1)
# (You can also use node:20-alpine if your CI environment standardizes on Node 20)
FROM node:22-alpine

WORKDIR /app

# Copy dependency manifests first for Docker caching
COPY package*.json ./

# Install dependencies (npm ci ensures exact dependencies from package-lock.json)
RUN npm ci

# Copy project source code
COPY . .

# Build the production React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start production server on port 3000
CMD ["npm", "start"]
