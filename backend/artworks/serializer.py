from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Artwork


class UserSerializer(serializers.ModelSerializer):
    firstName = serializers.SerializerMethodField(read_only=True)
    lastName = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email',
                  'firstName', 'lastName', 'isAdmin']

    # for changing id to _id and keeping the same convention
    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_username(self, obj):
        return obj.email

    def get_firstName(self, obj):
        return obj.first_name

    def get_lastName(self, obj):
        return obj.last_name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email',
                  'firstName', 'lastName', 'isAdmin', 'token']

    def get_token(sefl, obj):
        token = RefreshToken.for_user(obj)
        # our token is going to be an access token not refresh one
        return str(token.access_token)


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'
