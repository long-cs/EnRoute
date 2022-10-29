from dataclasses import dataclass
from os import stat
from unittest import result
from django.http import response
from concurrent.futures import ThreadPoolExecutor
from itertools import repeat
import requests
import time
import json
import typing
class YelpClient:

    API_ROOT_URL = "https://api.yelp.com"

    BUSINESS_PATH = "/v3/businesses/{business_id}"
    PHONE_SEARCH_PATH = "/v3/businesses/search/phone"
    SEARCH_PATH = "/v3/businesses/search"
    AUTOCOMPLETE_PATH = "/v3/autocomplete"
    MIN_STAR_RATING = 3
    MIN_REVIEW_COUNT = 10
    SEARCH_RADIUS = 40000 # 40000 meters (~25 miles)

    def __init__(self, apiKey):
        self._session = requests.Session()
        self._session.headers.update(self._getAuthHeader(apiKey))

    def searchBusinesses(self, description : str,waypoints : list):
        retBusinesses = []

        try:
            #higher max workers would mean more concurrent yelp api calls
            #if max_workers is increased than yelp will deny api calls because there will be too many api calls at once
            with ThreadPoolExecutor(max_workers=3) as executor:                
                for response in executor.map(self.searchBusiness, repeat(description), waypoints, timeout=120):
                    if response is not None:
                        retBusinesses.append(response)
        except TimeoutError:
            print('Waited too long')

        self._FilterResponse(retBusinesses)

        return retBusinesses

    def searchBusiness(self, searchTerm : str, latLon ):
        lat = latLon[0]
        lon = latLon[1]

        url = YelpClient.SEARCH_PATH
        parameters = {'term':searchTerm, 
                      'latitude':lat, 
                      'longitude':lon,
                      'sort_by': "best_match",
                      'radius' : YelpClient.SEARCH_RADIUS,
                      'limit': 50}
        # doc has alot of diff options need to look into ex. radius, limit, sort_by, etc
        retResponse = None

        while retResponse is None:
            retResponse = self._make_request(url,parameters)
            if retResponse is None:
                print('Too many Yelp API Calls at Once ')
                time.sleep(1)
            
        return retResponse
    
    def _make_request(self, path, url_params=None):
        url_params = url_params if url_params is not None else {}

        url = "{}{}".format(YelpClient.API_ROOT_URL,path)

        response = self._session.get(url, params=url_params)

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            print('response error') # do something when it fails
        
        return None

    def autoComplete(self, text : str):
        url = YelpClient.AUTOCOMPLETE_PATH
        parameters = {
            'text':text
        }        
        return self._make_request(url,parameters)

    #remove duplicates and remove low stars
    def _FilterResponse(self, responseList:list):
        idSet = set()

        for response in responseList:        
            businessesList = response['businesses']
            filteredBusinesses = []

            for business in businessesList:
                if (business['id'] not in idSet 
                    and business['rating'] >= YelpClient.MIN_STAR_RATING 
                    and business['review_count'] >= YelpClient.MIN_REVIEW_COUNT):

                    idSet.add(business['id'])
                    filteredBusinesses.append(business)
            
            response['businesses'] = filteredBusinesses
        
    # Formats the Bearer and Api key
    def _getAuthHeader(self, api_key):
        return {"Authorization": "Bearer {api_key}".format(api_key=api_key)}