from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('artworks/', views.getArtWorks, name='artWorks'),
    path('artworks/<str:pk>', views.getTheArtWork, name='theArtWork'),
]
