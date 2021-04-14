from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from artworks.serializer import ArtworkSerializer, OrderItemSerializer, OrderSerializer
from django.contrib.auth.models import User
from artworks.models import Artwork, Order, ShippingAddress, OrderItem
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['cartItems']

    if orderItems and len(orderItems) == 0:
        return Response({detail: 'No orderItems'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalCartPrice'],
        )
        # create shipping address
        shippingAddress = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            postalcode=data['shippingAddress']['postalCode'],
            city=data['shippingAddress']['city'],
            phone=data['shippingAddress']['phone'],
            deliverymethod=data['shippingAddress']['deliveryMethod'],
        )

        # create order items relation with order
        for theOrderItem in orderItems:
            artwork = Artwork.objects.get(_id=theOrderItem['artworkId'])
            if artwork.quantity > 0:
                item = OrderItem.objects.create(
                    artwork=artwork,
                    order=order,
                    name=artwork.title,
                    quantity=1,
                    price=artwork.price,
                    image=artwork.image
                )
                # update stock
                artwork.quantity -= 1
                if artwork.editionSize > artwork.editionNum:
                    artwork.editionNum += 1
                artwork.save()
                serializer = OrderItemSerializer(item, many=False)

        return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getOrderById(request, pk):
#     user = request.user
#     try:
#         order = Order.objects.get(_id=pk)
#         if user.is_staff or order.user == user:
#             serializer = OrderSerializer(order, many=False)
#             return Response(serializer.data)
#         else:
#             Response({'Sorry: (, You are not authorized to view this order'},
#                      status=status.HTTP_400_BAD_REQUEST)
#     except:
#         return Response({'The order you are requesting does not exit'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllUserOrders(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
