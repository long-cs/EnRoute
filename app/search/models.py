from django.db import models
import json

# Create your models here.

class Business(models.Model):
    name = models.CharField(max_length=120)

    def _str_(self):
        return self.name

class Route(models.Model):
    start_address = models.CharField(max_length=120)
    end_address = models.CharField(max_length=120)
    polyline_list = models.TextField(null=True)

    def __str__(self):
        return "Route from " + self.start_address + " to " + self.end_address

class Directions:
    def __init__ (self, start_address = "", destination = "", polyline_list = []):
        self._start_addresss = start_address
        self._destination = destination
        self._polyline_list = polyline_list
        self._buisnesses = []
    
    def setStartAddress(self, newStart):
        self._start_addresss = newStart
    
    def setDestination(self, newDestination):
        self._destination = newDestination
    
    def setPolylineList(self, newPolyline):
        self._polyline_list = newPolyline

    def setBuisnesses(self, newBuisnesses):
        self._buisnesses = newBuisnesses

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

class DirectionEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__
