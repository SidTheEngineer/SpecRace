import requests
import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.conf import settings
from django.utils.datastructures import MultiValueDictKeyError
from django.views.decorators.cache import cache_page
from django.core.cache import cache

# Make api call to get all available makes, return
# to home page template.
def index(request):
	allMakes = []
	url = settings.MAKES_URL + '&api_key=' + settings.API_KEY

	# Check to see if the JSON is cached.
	cached = cache.get(url)

	if not cached:
		r = requests.get(url)
		jsonObjects = r.json()
		cache.set(url, jsonObjects)

		for make in jsonObjects['makes']:
			allMakes.append(make)

		context = {'allMakes': allMakes}

	else:
		for make in cached['makes']:
			allMakes.append(make)

		context = {'allMakes': allMakes}

	return render(request, 'search/index.html', context)

def getModels(request, make):
	url = settings.VEHICLE_URL + make + settings.MODELS_ENDING
	cached = cache.get(url)

	if not cached:
		r = requests.get(url)
		jsonObjects = r.json()
		cache.set(url, jsonObjects)
		models = jsonObjects['models']

	else:
		models = cached['models']

	return JsonResponse(models, safe=False)

def getYears(request, make, model):
	url = settings.VEHICLE_URL + make + '/' +  model + settings.YEARS_ENDING
	cached = cache.get(url)

	if not cached:
		r = requests.get(url)
		jsonObjects = r.json()
		cache.set(url, jsonObjects)
		years = jsonObjects['years']
	else:
		years = cached['years']

	return JsonResponse(years, safe=False)

def getTrims(request, make, model, year):
	url = settings.VEHICLE_URL + make + '/' + model + '/' + year + settings.STYLES_ENDING
	cached = cache.get(url)

	if not cached:
		r = requests.get(url)
		jsonObjects = r.json()
		cache.set(url, jsonObjects)
		styles = jsonObjects['styles']
	else:
		styles = cached['styles']

	return JsonResponse(styles, safe=False)

def getSpecs(request, trimId):

	specsUrl = settings.VEHICLE_URL + 'styles/' + trimId + settings.FULL_ENDING
	equipmentUrl = settings.VEHICLE_URL + 'styles/' + trimId + settings.EQUIPMENT_ENDING
	cachedSpecs = cache.get(specsUrl)
	cachedEquipment = cache.get(equipmentUrl)

	if not cachedSpecs and not cachedEquipment:

		specs = requests.get(specsUrl).json()

		# Try to get the equipment from Edmunds.
		try:
			equipment = requests.get(equipmentUrl).json()['equipment'][0]['attributes']
			context = {'specs': specs, 'equipment': equipment}
			cache.set(specsUrl, specs)
			cache.set(equipmentUrl, equipment)
		except IndexError:
			context = {'specs': specs}
			cache.set(specsUrl, specs)

	else:

		specs = cachedSpecs

		try:
			equipment = cachedEquipment
			context = {'specs': specs, 'equipment': equipment}
		except:
			context = {'specs': specs}

	return JsonResponse(context)


# Gets the selected trim and renders the detail page for it.
'''def search(request):

	try:
		trimId = request.GET['trim']
		specUrl = settings.VEHICLE_URL + 'styles/' + trimId + settings.FULL_ENDING
		equipmentUrl = settings.VEHICLE_URL + 'styles/' + trimId + settings.EQUIPMENT_ENDING
		cachedSpecs = cache.get(specUrl)
		cachedEquipment = cache.get(equipmentUrl)

		if not cachedSpecs and not cachedEquipment:

			specs = requests.get(specUrl).json()
			equipment = requests.get(equipmentUrl).json()
			cache.set(specUrl, specs)
			cache.set(equipmentUrl, equipment)

			# Try to get the weight.
			try:
				attrList = equipment['equipment'][0]['attributes']
				weight = next(filter(lambda attr: attr['name'] == 'Curb Weight', attrList))['value']

			# If the "Curb Weight" key doesn't exist.
			except (IndexError, StopIteration):
				weight = '[Unavailable]'

			context = {'trim': specs, 'weight': weight}

		else:
			specs = cachedSpecs

			# Try to get the weight.
			try:
				attrList = cachedEquipment['equipment'][0]['attributes']
				weight = next(filter(lambda attr: attr['name'] == 'Curb Weight', attrList))['value']

			# If the "Curb Weight" key doesn't exist.
			except (IndexError, StopIteration):
				weight = '[Unavailable]'

			context = {'trim': specs, 'weight': weight}

	# Error involving a search without everything filled in.
	except MultiValueDictKeyError:
		return redirect('/') # Redirect home.

	return render(request, 'search/detail.html', context)'''
