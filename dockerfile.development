# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16.17.0-alpine3.16
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
# Copy app dependencies to container
COPY ./package.json ./
# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Install dependencies
RUN npm install
# Fix permission issues
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
# Deploy app for local development
CMD npm start