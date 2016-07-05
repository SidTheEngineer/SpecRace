from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
	# The search page is the index/home page.
	url(r'^', include('search.urls')),
]
