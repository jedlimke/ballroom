# Use the official Node.js image
FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /workspace

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies as root
RUN npm install

# Install nodemon globally for hot reloading
RUN npm install -g nodemon

# Change ownership of the working directory to the node user
RUN chown -R node:node /workspace

# Switch to the node user for subsequent operations
USER node

# Copy the rest of the application code
COPY --chown=node:node . .

# Expose the app's port
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]