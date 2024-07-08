# Use the official Node.js runtime as the base image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./projects/aluga-carros/package*.json ./

# Copy the entire application code to the container
COPY ./projects/aluga-carros ./

# Install dependencies
RUN npm install && npm run build

# Use Nginx as the production server
FROM nginx:stable-alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
#EXPOSE 80

# Start Nginx when the container runs
#CMD ["nginx", "-g", "daemon off;"]