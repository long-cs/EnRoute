from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, JsonResponse

# Create your views here.

# class TodoView(viewsets.ModelViewSet):
    # serializer_class = TodoSerializer
    # queryset = Todo.objects.all()
    # pass

class Query(View):
    def get(self, request):
        # <view logic>
        # return HttpResponse('result')
        responseData = {
            'id': 4,
            'name': 'Test Response',
            'roles' : ['Admin','User']
        }

        return JsonResponse(responseData)        
