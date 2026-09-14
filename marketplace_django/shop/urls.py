from django.urls import path
from .views import storefront

urlpatterns = [path("", storefront, name="storefront")]
