# Use the official Node.js image
FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /workspace

# Copy package.json and package-lock.json
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install --include=dev

# Install nodemon globally for hot reloading
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Set permissions for the node user (optional, but good practice)
RUN chown -R node:node /workspace

# Switch to the node user for non-root operations
USER node

# Expose the app's port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
