# Use the official Node.js image to build the app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's source code
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the build files
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will run on (default 80)
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
