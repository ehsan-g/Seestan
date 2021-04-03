from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products
from .serializer import ArtworkSerializer, UserSerializer, UserSerializerWithToken

from .models import Artwork
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


#  Customizing token claims with JWT / overriding

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims, meaning when token decrypted more data is available check jwt.io
        token['username'] = user.username
        token['message'] = 'hello world'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email
        #  ...
        # refactored to the following:
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/artworks/create',
        'api/artworks/upload',
        'api/artworks/<id>/favorite',
        'api/artworks/top',
        'api/artworks/<id>',
        'api/artworks/delete/<id>',
        'api/artworks/<update>/<id>',
    ]
    return Response(routes)


# since we have wrapped this view with rest-framework decorator and changed the default authentication
# /api/users/profile user is not the same as the user used for /admin
@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getArtWorks(request):
    artworks = Artwork.objects.all()
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTheArtWork(request, pk):
    artwork = Artwork.objects.get(_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)

    return Response(serializer.data)
