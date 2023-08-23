# Use the official Node.js LTS image as the base image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the app
RUN npm run build

# Use a smaller Nginx image to serve the built app
FROM nginx:latest

# Copy the built app to the Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
