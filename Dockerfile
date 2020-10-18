# Dockerfile for client

# Stage 1: Build react client
FROM node:10

# Working directory be app
WORKDIR /usr/app
# Copy local files to app folder
COPY . /usr/app

# Install dependencies
RUN npm install --unsafe-perm

EXPOSE 3000

CMD ["npm","start"]
