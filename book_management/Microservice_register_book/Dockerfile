# Set the base image to Node.js 18 with Alpine Linux
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy only what we need
COPY src /usr/src/app/src

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "src/server.js"]