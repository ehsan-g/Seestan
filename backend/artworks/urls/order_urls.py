from django.urls import path
from artworks.views import order_views as views


urlpatterns = [
    path('add', views.addOrderItems, name='add-orders'),
    path('<str:pk>', views.getOrderById, name='user-order'),
    path('all/myOrders', views.getAllUserOrders, name='all-user-orders'),
    path('<str:pk>/pay', views.updateOrderToPaid, name='pay')
]
