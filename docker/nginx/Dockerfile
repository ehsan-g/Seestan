# Copy React static files and start nginx
FROM node:lts-alpine3.13 as build

RUN apk add --no-cache --virtual build-dependencies build-base

RUN  apk --no-cache add ca-certificates wget bash \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk \
  && apk add glibc-2.29-r0.apk

RUN npm install yarn

WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/yarn.lock ./

RUN yarn install
COPY ./client/ ./
RUN npm run build

FROM nginx:stable-alpine
USER root
COPY --from=build /app/client/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]