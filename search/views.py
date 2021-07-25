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
        self.printRoute(directions_result)

        # print(directions_result)

        return JsonResponse(responseData)        
        # return HttpResponse(directions_result)        
        # return JsonResponse(directions_result)        

    # Debugging purposes
    def printRoute(self,gMapsRoute):
        directionsDict = gMapsRoute[0] # only 1 route, if there would was more locations, then there would be more than one
        boundsDict = directionsDict['bounds'] # northeast and southwest coordinates

        legsList = directionsDict['legs'] # starting,ending points and contains the steps to get there
        legDict = legsList[0] # only 1 leg since only one starting and ending location

        distance = legDict['distance']
        duration = legDict['duration']
        endAddress = legDict['end_address']
        endLocation = legDict['end_location']
        startAddress = legDict['start_address']
        startLocation = legDict['start_location']

        stepsList = legDict['steps']


        print('Bounds:' + str(boundsDict))
        print('Distance: ' + str(distance))
        print('Duration: ' + str(duration))
        print('End Address: ' + str(endAddress))
        print('End Location: ' + str(endLocation))
        print('Start Address: ' + str(startAddress))
        print('Start Location: ' + str(startLocation))

        for i in range(len(stepsList)):
            step = stepsList[i]
            stepDistance = step['distance']
            stepDuration = step['duration']
            stepStartLocation = step['start_location']
            stepEndLocation = step['end_location']
            print('Step #' + str(i) + ' Distance: ' + str(stepDistance) + ' Duration ' + str(stepDuration) + ' Start: '  + str(stepStartLocation) + ' End: ' + str(stepEndLocation))