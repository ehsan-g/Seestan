from django.urls import path
from artworks.views import artwork_views as views


urlpatterns = [
    path('', views.fetchArtWorks, name='artWorks'),
    path('delete/', views.deleteArtwork, name='artwork-delete'),
    path('create/', views.createTheArtWork, name='artwork-create'),
    path('<str:pk>/', views.fetchTheArtWork, name='theArtWork'),
]
