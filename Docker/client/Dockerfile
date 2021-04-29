FROM node:13.12.0-alpine as build

RUN apk add --no-cache --virtual build-dependencies build-base

RUN  apk --no-cache add ca-certificates wget bash \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk add glibc-2.29-r0.apk

WORKDIR /app/client
COPY ./client/package.json ./
RUN npm ci --silent
COPY ./client/ ./
RUN npm run build