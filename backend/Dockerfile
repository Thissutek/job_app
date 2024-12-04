# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the port the backend runs on (e.g., 5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "index.js"]