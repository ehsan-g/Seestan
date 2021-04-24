FROM python:3.8-alpine

# add scripts t othe path of the running container
ENV PATH="/scipts:${PATH}"

# install project requirements and install alpine requirements / no cache = lightway / virtual dependecies
# delete tmp after installation
COPY ./requirements.txt /requirements.txt

RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers
# to fix pillow building issue - next 2 lines
RUN apk add build-base py-pip jpeg-dev zlib-dev
ENV LIBRARY_PATH=/lib:/usr/lib
RUN pip install -r /requirements.txt
RUN apk del .tmp

# create root app directory
RUN mkdir /app
# copy our content to this directory
COPY ./backend /app
WORKDIR /app
COPY ./scripts /scripts

# run all scripts
RUN chmod +x /scripts/*

# static folders - p means create all sub dir to get to the end of this dir (media / static)
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

# to prevent using root user / privilage to use /vol
#  755 full access
RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web
USER user

CMD ["entrypoint.sh"]
