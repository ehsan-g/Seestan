#!/bin/sh

set -e

python manage.py collectstatic --noinput
gunicorn backend.wsgi --bind 0.0.0.0:8000