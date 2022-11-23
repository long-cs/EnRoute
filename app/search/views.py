import typing
from django.shortcuts import render
from googlemaps.directions import directions
from rest_framework import viewsets
from django.views import View
from django.http import HttpResponse, JsonResponse
import googlemaps
import polyline
from datetime import datetime
import json
from .yelpClient import YelpClient
from .models import Directions, DirectionEncoder
from math import radians, cos, sin, asin, sqrt
from .serializers import RouteSerializer
from django.core import serializers
from django.conf import settings

class Query(View):
    MAX_BUSINESS_QUERIES_NUM = 12
    MIN_BUSINESS_QUERIES_NUM = 4

    def __init__(self):
        gmapsKey = settings.GOOGLE_MAPS_API_KEY
        yelpApiKey = settings.YELP_API
        self.gmapsClient = googlemaps.Client(gmapsKey)
        self.yelpClient = YelpClient(yelpApiKey)

    def get(self, request):          
        # Captures URL parameters
        start = request.GET.get("start", "Los Angeles")
        end = request.GET.get('end', "Santa Monica")
        desc = request.GET.get('desc', "Restaurants")

        path = Directions()
        directions_result = self.gmapsClient.directions(start, end)
        curr_route = directions_result[0]['legs'][0]
        waypoint_distance, searchRadius = self.distanceBetweenBusinessQueries(totalMeterLength=curr_route["distance"]["value"] )
        waypoint = []
        curr_distance = 0
        last_coord = None
        route_points = []
        polyline_list = []

        for step in curr_route['steps']:
            path_coords = polyline.decode(step['polyline']['points'])
            # waypoint.append(path_coords[0])
            for i in path_coords:
                if last_coord:
                    curr_distance += self.distanceBetweenCoord(last_coord[0], last_coord[1], i[0], i[1])
                    if curr_distance >= waypoint_distance:
                        waypoint.append(last_coord)
                        curr_distance = 0
                last_coord = i    
            polyline_list.append(step['polyline']['points'])
        
        yelpBusinesses = self.yelpClient.searchBusinesses(description=desc, waypoints=waypoint, searchRadius=searchRadius)

        # populates the model instance
        path.setStartAddress(curr_route['start_address'])
        path.setDestination(curr_route['end_address'])
        path.setPolylineList(polyline_list)
        path.setBusinesses(yelpBusinesses)

        # NEEDS TO CONVERT FROM MODEL TO JSON
        pathJSONdata = json.dumps(path, indent=4, cls=DirectionEncoder)
        # print(directions_result)
        # HttpsResponse takes in a json type as an arguement
        # JsonResponse takes an object converts to json then sends it
        return HttpResponse(pathJSONdata)
    
    #  Haversine Formula to find distance between two (lat, lon) points
    def distanceBetweenCoord(self, lat1, lon1, lat2, lon2):
        # Applies radians func to all lat and lon
        lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * asin(sqrt(a))
        return 6371000 * c
    
    def distanceBetweenBusinessQueries(self, totalMeterLength: int) -> typing.Tuple[int,int]:
        numOfSearches = int(totalMeterLength / YelpClient.MAX_SEARCH_RADIUS)
        if numOfSearches > Query.MAX_BUSINESS_QUERIES_NUM:
            numOfSearches = Query.MAX_BUSINESS_QUERIES_NUM
            
        if numOfSearches < Query.MIN_BUSINESS_QUERIES_NUM:
            numOfSearches = Query.MIN_BUSINESS_QUERIES_NUM

        distanceBetweenQueries = totalMeterLength / numOfSearches
        searchRadius = distanceBetweenQueries if distanceBetweenQueries < YelpClient.MAX_SEARCH_RADIUS else YelpClient.MAX_SEARCH_RADIUS
        return distanceBetweenQueries, int(searchRadius)

class AutoComplete(View):
    '''
    Expected parameters: ('text','type')
    text is the input from user to figure out what to auto complete
    type is either 'place' or 'catagory' | default to place if not specified
    response will be a list of strings/auto complete suggestions
    '''
    def get(self, request):
        # Captures URL parameters
        text = request.GET.get('text', '')
        type = request.GET.get('type', 'place')
        autoSuggestions = []
        
        if type == 'place':
            gmapsKey = settings.GOOGLE_MAPS_API_KEY
            gmapsClient = googlemaps.Client(gmapsKey)
            placeResponse = gmapsClient.places_autocomplete(text)
            for place in placeResponse:
                autoSuggestions.append(place['description'])
        else:
            yelpApiKey = settings.YELP_API            
            yelpClient = YelpClient(yelpApiKey)
            yelpResponse = yelpClient.autoComplete(text)
            categories = yelpResponse['categories']
            terms = yelpResponse['terms']
            for catagory in categories:
                autoSuggestions.append(catagory['title'])
            for term in terms:
                autoSuggestions.append(term['text'])
              
        return HttpResponse(json.dumps(autoSuggestions))
