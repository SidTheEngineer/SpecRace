import requests
import json
from django.conf import settings
from django.test import TestCase

testMake = 'bmw'
testModel = '4-series'
testYear = '2016'
testTrimId = '200743645'

def indexTest():
    url = settings.MAKES_URL + '&api_key=' + settings.API_KEY
    return requests.get(url).status_code

def getModelsTest(make):
    url = settings.VEHICLE_URL + make + settings.MODELS_ENDING
    return requests.get(url).status_code

def getYearsTest(make, model):
    url = settings.VEHICLE_URL + make + '/' +  model + settings.YEARS_ENDING
    return requests.get(url).status_code

def getTrimsTest(make, model, year):
    url = settings.VEHICLE_URL + make + '/' + model + '/' + year + settings.STYLES_ENDING
    return requests.get(url).status_code

# Make sure status code is OK for view API requests.
class ApiCallTest(TestCase):

    def testIndexView(self):
        self.assertEqual(indexTest(), 200)

    def testGetModelsView(self):
        self.assertEqual(getModelsTest(testMake), 200)

    def testGetYearsView(self):
        self.assertEqual(getYearsTest(testMake, testModel), 200)

    def testGetTrimsView(self):
        self.assertEqual(getTrimsTest(testMake, testModel, testYear), 200)
