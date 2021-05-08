# docker/backend/Dockerfile

FROM python:3.8.3-alpine

WORKDIR /app
COPY ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn

# to fix pillow building issue - next 2 lines
RUN apk add build-base py-pip jpeg-dev zlib-dev
ENV LIBRARY_PATH=/lib:/usr/lib

RUN pip install -r backend/requirements.txt

COPY ./docker /app/docker
COPY ./backend /app/backend

RUN chmod +x /app/docker/backend/wsgi-entrypoint.sh