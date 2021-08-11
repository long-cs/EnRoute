from django.http import response
import requests
import json
import typing

class YelpClient:

    API_ROOT_URL = "https://api.yelp.com"

    BUSINESS_PATH = "/v3/businesses/{business_id}"
    PHONE_SEARCH_PATH = "/v3/businesses/search/phone"
    SEARCH_PATH = "/v3/businesses/search"
    AUTOCOMPLETE_PATH = "/v3/autocomplete"

    def __init__(self, apiKey):
        self._session = requests.Session()
        self._session.headers.update(self._getAuthHeader(apiKey))

    def searchBusiness(self, searchTerm : str, lat : float, lon : float):
        url = YelpClient.SEARCH_PATH
        parameters = {'term':searchTerm, 
                      'latitude':lat, 
                      'longitude':lon,
                      'sort_by': "best_match",
                      'limit': 10}
        # doc has alot of diff options need to look into ex. radius, limit, sort_by, etc

        return self._make_request(url,parameters)
    
    def autoComplete(self, text : str):
        url = YelpClient.AUTOCOMPLETE_PATH
        parameters = {
            'text':text
        }        
        return self._make_request(url,parameters)

    def _make_request(self, path, url_params=None):
        url_params = url_params if url_params is not None else {}

        url = "{}{}".format(YelpClient.API_ROOT_URL,path)

        response = self._session.get(url, params=url_params)

        if response.status_code == 200:
            return response.json()
        else:
            print('response error') # do something when it fails

    # Formats the Bearer and Api key
    def _getAuthHeader(self, api_key):
        return {"Authorization": "Bearer {api_key}".format(api_key=api_key)}