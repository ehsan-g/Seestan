from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from artworks.serializer import ArtworkSerializer
from django.contrib.auth.models import User
from artworks.models import Artwork
from rest_framework import status


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
