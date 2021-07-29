from django.shortcuts import render
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, JsonResponse
import googlemaps
import polyline
from datetime import datetime
import json
from . import yelpClient
from .models import Directions, DirectionEncoder
from .serializers import RouteSerializer
from django.core import serializers

class Query(View):

    def __init__(self):
        gmapsKey = 'AIzaSyCEUcLAhX6U6pxYlcXrMkuL5XoLyd_Nfck'
        yelpApiKey = 'zQUOW4s6iONEbQgu_NigfpfZHqFNpxOKP0N2oLrTOqxpRvJZpbD0VrNAya_8xB2otciJQVWPELDNPYAgCsrE-iuL3AHxVHny-FRe1m1VacPqKtdpG6Hx-9BJcfX4YHYx'
        self.gmapsClient = googlemaps.Client(gmapsKey)
        self.yelpClient = yelpClient.YelpClient(yelpApiKey)

    def get(self, request):

        yelpResponse = self.yelpClient.searchBusiness('restaurants', 34.0522, 118.2437) # los angeles coordinates
        
        # Captures URL parameters
        start = request.GET.get("start", "")
        end = request.GET.get('end', "")

        # Request directions via public transit
        now = datetime.now()

        path = Directions()

        directions_result = self.gmapsClient.directions(start, end)
        
        # self.printRoute(directions_result)


        curr_route = directions_result[0]['legs'][0]
        route_points = [curr_route['start_location']]
        polyline_list = []

        for step in curr_route['steps']:
            route_points += polyline.decode(step['polyline']['points'])
            polyline_list.append(step['polyline']['points'])

        route_points.append(curr_route['end_location'])

        # print(route_points)

        # populates the model instance
        path.setStartAddress(curr_route['start_address'])
        path.setDestination(curr_route['end_address'])
        path.setPolylineList(polyline_list)

        # NEEDS TO CONVERT FROM MODEL TO JSON
        pathJSONdata = json.dumps(path, indent=4, cls=DirectionEncoder)

        # HttpsResponse takes in a json type as an arguement
        # JsonResponse takes an object converts to json then sends it
        return HttpResponse(pathJSONdata)
        # print(directions_result)

        # return JsonResponse(responseData)        
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