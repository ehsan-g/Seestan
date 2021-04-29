# docker/backend/Dockerfile

FROM python:3.8.3-alpine


# add scripts to the path of the running container
# ENV PATH="/scripts:${PATH}"
# ENV PYTHONUNBUFFERED 1
# install project requirements and install alpine requirements / no cache = lightway / virtual dependecies
# delete tmp after installation
# COPY ./requirements.txt /requirements.txt

# to fix pillow building issue - next 2 lines
# RUN apk add build-base py-pip jpeg-dev zlib-dev
# ENV LIBRARY_PATH=/lib:/usr/lib

RUN pip install -r /requirements.txt
RUN apk del .tmp


WORKDIR /django
ADD ./backend/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

ADD ./docker /app/docker
ADD ./backend /app/backend

# run all scripts
RUN chmod +x /scripts/*

# RUN mkdir /django
# COPY . /django/

# entry point
# COPY ./scripts /scripts



# static folders
# RUN mkdir -p /vol/web/static
# RUN mkdir -p /vol/web/media



# to prevent using root user / privilage to use /vol - 755 full access
# RUN adduser -D user
# RUN chown -R user:user /vol
# RUN chmod -R 755 /vol/web
# USER user

# CMD ["entrypoint.sh"]



