FROM node:lts-alpine3.13

RUN apk add --no-cache --virtual build-dependencies build-base

RUN  apk --no-cache add ca-certificates wget bash \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk add glibc-2.29-r0.apk

WORKDIR /react

COPY package*.json /react/
RUN npm install
COPY . /react/
RUN npm run build