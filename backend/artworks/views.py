from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products
from .serializer import ArtworkSerializer

from .models import Artwork
# Create your views here.


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
    print(artworks)
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTheArtWork(request, pk):
    artwork = Artwork.objects.get(_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)

    return Response(serializer.data)
