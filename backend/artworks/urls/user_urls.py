from django.urls import path
from artworks.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.fetchUserProfile, name='users_profile'),
    path('profile/update/', views.updateUserProfile, name='users_profile_update'),
    path('', views.fetchUsers, name='users'),
]
