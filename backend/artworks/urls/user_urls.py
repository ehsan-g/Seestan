from django.urls import path
from artworks.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.fetchUserProfile, name='users-profile'),
    path('artist/<int:pk>/', views.fetchArtist, name='artist'),
    path('profile/update/', views.updateUserProfile, name='users-profile-update'),
    path('', views.fetchUsers, name='users'),
]
