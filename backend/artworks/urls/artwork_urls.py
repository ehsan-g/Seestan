from django.urls import path
from artworks.views import artwork_views as views


urlpatterns = [
    path('', views.getArtWorks, name='artWorks'),
    path('<str:pk>/', views.getTheArtWork, name='theArtWork'),
]
