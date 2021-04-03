from django.urls import path
from . import views


urlpatterns = [
    path('users/login', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('', views.getRoutes, name='routes'),
    path('artworks/', views.getArtWorks, name='artWorks'),
    path('artworks/<str:pk>', views.getTheArtWork, name='theArtWork'),
]
