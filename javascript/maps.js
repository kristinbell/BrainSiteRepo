function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.511882, lng: -122.6833 },
    zoom: 13
  });

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(
      {
        location: { lat: 45.511882, lng: -122.6833 },
        radius: 5000,
        keyword: 'hospitals'
      },
      function(results, status, pagination) {
          if (status !== "OK") {
              return;
          }

          createMarkers(results);
      }
  );
}

function createMarkers(places) {
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById("places");
  
    for (var i = 0, place; (place = places[i]); i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
  
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
  
      var li = document.createElement("li");
      li.textContent = place.name;
      placesList.appendChild(li);
  
      bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  }