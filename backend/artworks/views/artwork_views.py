from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from artworks.serializer import ArtworkSerializer
from django.contrib.auth.models import User
from artworks.models import Artwork
from rest_framework import status


@api_view(['GET'])
def fetchArtWorks(request):
    artworks = Artwork.objects.all()
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def fetchTheArtWork(request, pk):
    artwork = Artwork.objects.get(_id=pk)
    serializer = ArtworkSerializer(artwork, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteArtwork(request):
    data = request.data
    selectedArtworks = data['selectedArtworks']
    for _id in selectedArtworks:
        artworkDeleting = Artwork.objects.get(_id=_id)
        artworkDeleting.delete()
    return Response('artworks were deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTheArtWork(request):
    user = request.user
    artwork = Artwork.objects.create(
        AccountOwner=user,
        Artist=user,
        title= 'Default Title',
        subtitle= 'Default subitle',
        width=234,
        height=323,
        depth=35,
        price=111000,
    )
    serializer = ArtworkSerializer(artwork, many=False)

    return Response(serializer.data)
