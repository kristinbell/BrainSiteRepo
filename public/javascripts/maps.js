var map;
var service;
var pos;
var markerArray = [];
const checkboxList = ["mentalhealth-checkbox", "psychiatric-checkbox", "addiction-checkbox", "shelters-checkbox", "lgbtq-checkbox", "hospital-checkbox"];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.511882, lng: -122.6833 },
    zoom: 13
  });

  if ('geolocation' in navigator) {
    service = new google.maps.places.PlacesService(map);
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos)
      service.nearbySearch(
        {
          location: pos,
          radius: 50000,
          keyword: 'hospital'
        },
        function(results, status, pagination) {
            if (status !== "OK") {
                return;
            }
  
            createMarkers(results);
        }
      );
    }, function() {
      service = new google.maps.places.PlacesService(map);
      pos = { lat: 45.511882, lng: -122.6833 }
      map.setCenter(pos);
      service.nearbySearch(
        {
          location: { lat: 45.511882, lng: -122.6833 },
          radius: 5000,
          keyword: 'hospital'
        },
        function(results, status, pagination) {
            if (status !== "OK") {
                return;
            }

            createMarkers(results);
        }
      );
    })
  }
}

function createMarkers(places) {

  for (var i = 0, place; (place = places[i]); i++) {
    var request = {
      placeId: place.place_id,
      fields: ['geometry', 'icon', 'name', 'formatted_address', 'formatted_phone_number', 'website']
    }
    var infowindow = new google.maps.InfoWindow();
    //var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
    
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        markerArray.push(marker);

        var li = "<div class=\"card\" style=\"width: 100%;\">" 
        + "<div class=\"card-body\">" 
        + "<h5 class=\"card-title\">" 
        + place.name 
        + "</h5>" 
        + "<h6 class=\"card-subtitle mb-2 text-muted\">" 
        + place.formatted_address 
        + "</h6>"
        + "<h6 class=\"card-subtitle mb-2 text-muted\">" 
        + place.formatted_phone_number
        + "</h6>";
        if (place.website) {
          li += "<a href=\"" + place.website + "\" class=\"card-link\" target=\"_blank\">Website</a>";
        }
        li += "</div></div>";
        document.getElementById("places").innerHTML += li;

        google.maps.event.addListener(marker, "click", function() {
          var infoWindow = 
            "<div class=\"container\"><strong>" +
            place.name +
            "</strong><br>" +
            "Address: " +
            place.formatted_address +
            "<br>" +
            place.formatted_phone_number +
            "<br>";
            if (place.website) {
              infoWindow += "<br><a href=\"" + place.website + "\" class=\"infowindow-link\" target=\"_blank\">Website</a>"; 
            }
            infoWindow += "</div>";
            
          infowindow.setContent(infoWindow)
          infowindow.open(map, this);
        })
      }
    })
  }
}

function mapsQuery(checkboxId) {

  var checkboxObject = document.getElementById(checkboxId)
  var textQuery = ""

  if (checkboxObject.checked) {
    if (checkboxId == 'mentalhealth-checkbox') {
      textQuery = "psychiatric OR psychologist OR therapist OR LCSW OR counselor OR \"mental health\" OR dr. -massage ";
      switchOffCheckboxes(checkboxId);
    } else if (checkboxId == "psychiatric-checkbox") {
      textQuery = "behavioral OR psychiatric OR inpatient OR hospital ";
      switchOffCheckboxes(checkboxId);
    } else if (checkboxId == "addiction-checkbox") {
      textQuery = "drug OR alcohol OR substance OR addiction OR \"substance abuse\" AND (rehab OR rehabilitation OR recovery) OR detox ";
      switchOffCheckboxes(checkboxId);
    } else if (checkboxId == "shelters-checkbox") {
      textQuery = "shelter OR \"domestic violence\" OR free OR low-cost OR \"emergency housing\" OR homeless OR houseless ";
      switchOffCheckboxes(checkboxId);
    } else if (checkboxId == "lgbtq-checkbox") {
      textQuery = "gay OR lesbian OR trans OR queer OR lgb OR lgbt OR lgbtqia+ AND (treatment OR counseling OR psychiatrist OR psychologist OR therapist OR counselor OR LCSW OR therapy OR specialization OR \"mental health\" OR \"behavioural health\" OR health OR center OR provider OR clinician) -truck -trucking -transportation -bar -event -import  -mortgage  -transmission -chorus";
      switchOffCheckboxes(checkboxId);
    } else if (checkboxId == "hospital-checkbox") {
      textQuery = "hospital OR \"urgent care\"";
      switchOffCheckboxes(checkboxId);
    }
  }

  if (!textQuery) {
    for (var i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }
    markerArray.length = 0;
    document.getElementById("places").innerHTML = "<h5 class=\"small-caps\">search results:</h5>";
  } else {
    
    var request = {
      location: { lat: pos.lat, lng: pos.lng },
      radius: '50000',
      query: textQuery
    }

    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(null);
        }
        markerArray.length = 0;
        document.getElementById("places").innerHTML = "<h5 class=\"small-caps\">search results:</h5>";
        createMarkers(results);
      }
    })
  }
}

function switchOffCheckboxes(checkboxId) {
  for (var x of checkboxList) {
    if (!(checkboxId == x)) {
      $('#' + x).bootstrapToggle('off');
    }
  }
}