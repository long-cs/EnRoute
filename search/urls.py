from django.urls import path
from . import views

urlpatterns = [
    path('autocomplete', views.AutoComplete.as_view()),
    path('query', views.Query.as_view()),
]