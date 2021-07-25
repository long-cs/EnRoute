from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, JsonResponse
import googlemaps
from datetime import datetime

# Create your views here.
class Query(View):

    def __init__(self):
        self.gmapsKey = 'AIzaSyCEUcLAhX6U6pxYlcXrMkuL5XoLyd_Nfck'
        self.gmaps = googlemaps.Client(self.gmapsKey)

    def get(self, request):
        # <view logic>
        # return HttpResponse('result')
        responseData = {
            'id': 4,
            'name': 'Test Response',
            'roles' : ['Admin','User']
        }

        # Request directions via public transit
        now = datetime.now()

        directions_result = self.gmaps.directions('Los Angeles','San Francisco')

        print(directions_result)

        return JsonResponse(responseData)        
        # return HttpResponse(directions_result)        
        # return JsonResponse(directions_result)        
