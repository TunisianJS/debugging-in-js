FROM node:12
ARG PROJECT
WORKDIR /app
COPY $PROJECT/package.json .
RUN npm install
RUN npm install -g nodemon
COPY $PROJECT/ .