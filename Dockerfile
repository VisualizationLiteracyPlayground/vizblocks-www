# Dockerfile for client

# Stage 1: Build react client
FROM node:13.12.0-alpine

# Working directory be app
WORKDIR /usr/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]
