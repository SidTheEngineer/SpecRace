from django.conf.urls import url, include
from . import views

app_name = 'search'

urlpatterns = [

	# Index, home/search page.
	url(r'^$', views.index, name='index'),

	# /search, render the template for a car.
	#url(r'^specs/', views.search, name='search'),

	# Uses Ajax/JSON to change the model/year/trim boxes.
	url(r'^getmodels/(?P<make>[a-zA-Z0-9_.-]+)/', views.getModels, name='getmodels'),
	url(r'^getyears/(?P<make>[a-zA-Z0-9_.-]+)/(?P<model>[a-zA-Z0-9_.-]+)/', views.getYears, name='getyears'),
	url(r'^gettrims/(?P<make>[a-zA-Z0-9_.-]+)/(?P<model>[a-zA-Z0-9_.-]+)/(?P<year>\d+)/', views.getTrims, name='gettrims'),
	url(r'^getspecs/(?P<trimId>\d+)/', views.getSpecs, name='getspecs'),


]
