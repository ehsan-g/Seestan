from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .products import products

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
    return Response(products)

@api_view(['GET'])
def getTheArtWork(request, pk):
    product = None
    for theArtWork in products:
        if theArtWork['_id'] == pk:
            product = theArtWork
            break

    return Response(product)
