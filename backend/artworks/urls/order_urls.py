from django.urls import path
from artworks.views import order_views as views


urlpatterns = [
    path('add', views.addOrderItems, name='add-orders'),
    path('myOrders', views.fetchMyOrders, name='my-orders'),
    path('<str:pk>', views.fetchOrderById, name='user-order'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='pay')
]
