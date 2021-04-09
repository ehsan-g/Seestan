from django.urls import path
from artworks.views import order_views as views



urlpatterns = [
    path('add', views.addOrderItems, name='add_orders')
]
