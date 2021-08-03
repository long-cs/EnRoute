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
from math import radians, cos, sin, asin, sqrt
from .serializers import RouteSerializer
from django.core import serializers
from django.conf import settings

class Query(View):
    def __init__(self):
        gmapsKey = settings.GOOGLE_MAPS_API_KEY
        yelpApiKey = settings.YELP_API
        self.gmapsClient = googlemaps.Client(gmapsKey)
        self.yelpClient = yelpClient.YelpClient(yelpApiKey)

    def get(self, request):
        
        # yelpResponse = self.yelpClient.searchBusiness('restaurants', 34.0522, -118.2437) # los angeles coordinates
        # Captures URL parameters
        start = request.GET.get("start", "")
        end = request.GET.get('end', "")

        # Request directions via public transit
        now = datetime.now()

        path = Directions()

        directions_result = self.gmapsClient.directions(start, end)
        
        # self.printRoute(directions_result)


        curr_route = directions_result[0]['legs'][0]
        waypoint_distance = curr_route["distance"]["value"] // 4
        waypoint = []
        curr_distance = 0
        last_coord = None
        route_points = []
        polyline_list = []

        for step in curr_route['steps']:
            path_coords = polyline.decode(step['polyline']['points'])
            for i in path_coords:
                if last_coord:
                    curr_distance += self.distanceBetweenCoord(last_coord[0], last_coord[1], i[0], i[1])
                    if curr_distance >= waypoint_distance:
                        waypoint.append(last_coord)
                        curr_distance = 0
                last_coord = i    
            polyline_list.append(step['polyline']['points'])
        
        yelpBuisnesses = []
        for point in waypoint:
            yelpResponse = self.yelpClient.searchBusiness('restaurants', point[0], point[1])
            yelpBuisnesses.append(yelpResponse)

        # populates the model instance
        path.setStartAddress(curr_route['start_address'])
        path.setDestination(curr_route['end_address'])
        path.setPolylineList(polyline_list)
        path.setBuisnesses(yelpBuisnesses)

        # NEEDS TO CONVERT FROM MODEL TO JSON
        pathJSONdata = json.dumps(path, indent=4, cls=DirectionEncoder)
        # print(directions_result)
        # HttpsResponse takes in a json type as an arguement
        # JsonResponse takes an object converts to json then sends it
        return HttpResponse(pathJSONdata)
        

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
    
    #  Haversine Formula to find distance between two (lat, lon) points
    def distanceBetweenCoord(self, lat1, lon1, lat2, lon2):
        # Applies radians func to all lat and lon
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        return 6371000 * c
