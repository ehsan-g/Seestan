#!/bin/sh

set -e

python manage.py collectstatic --noinput

uwisgi --socket :8000 --master --enable-threads --module backend.wsgi