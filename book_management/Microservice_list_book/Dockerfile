# Set the base image to Node.js 18 with the Alpine Linux distribution (lightweight version)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Install the project dependencies using npm
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 4001 (the port the service will listen to by default)
EXPOSE 4001

# Run the application using node, starting from the src/server.js file
CMD ["node", "src/server.js"]
