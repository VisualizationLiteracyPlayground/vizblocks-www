# Dockerfile for client

# Stage 1: Build react client
FROM node:13.12.0-alpine

RUN mkdir /usr/app
# copy local files to app folder
COPY . /usr/app

# Working directory be app
WORKDIR /usr/app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# Install dependencies
RUN npm install --unsafe-perm

EXPOSE 3000

CMD ["npm","start"]
