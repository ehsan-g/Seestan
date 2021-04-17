from django.urls import path
from artworks.views import artwork_views as views


urlpatterns = [
    path('', views.fetchArtWorks, name='artWorks'),
    path('delete/', views.deleteArtwork, name='artwork-delete'),
    path('<str:pk>/', views.fetchArtWorks, name='theArtWork'),
]
