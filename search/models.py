from django.db import models

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

