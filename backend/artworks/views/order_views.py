from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from artworks.serializer import ArtworkSerializer
from django.contrib.auth.models import User
from artworks.models import Artwork
from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({detail: 'No orderItems'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # create order
        order = order.objects.create(
            user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # create shipping address
        shippingAddress = shippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            postalCode=data['shippingAddress']['postalCode'],
            City=data['shippingAddress']['City'],
            phone=data['shippingAddress']['phone'],
        )
        
        # create order items relation with order
        for x in orderItems:
            artwork = artwork.objects.get(_id=x[artworkId])
            item = OrderItem.objects.create(
                artwork,
                order,
                name=artwork.name,
                quantity='',
                price=artwork
            )
        # update stock
    return Response('order')
