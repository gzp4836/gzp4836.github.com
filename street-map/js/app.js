var header = document.getElementsByTagName("header")[0];
var header_button = header.getElementsByTagName("button")[0];
var menu = document.getElementsByClassName('menu')[0];
var input = document.getElementsByTagName('input')[0];
var aClicker = function () {
    var tranformX = window.getComputedStyle(menu).transform.split('(')[1].split(')')[0].split(',')[4];
    if (tranformX < 0) {
        menu.style.transform = "translateX(0)";
        header_button.className = "";
    } else {
        menu.style.transform = "translateX(-100%)";
        header_button.className = "cate";
    }

}
header_button.addEventListener('click', aClicker);

var pos;
var map;
var infoWindow;
var service;
function initMap() {

    // Browser doesn't support Geolocation
    pos = { lat: -33.867, lng: 151.195 };
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function (postion) {
    //         pos.lat = postion.coords.latitude;
    //         pos.lng = postion.coords.longitude;
    //         console.log("back: " +JSON.stringify(pos));

    //     })
    // }
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
    infowindow = new google.maps.InfoWindow();
    var markers = [];
    function addMarker(data) {
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
        for (var i = 0; i < data.length; i++) {
            var place = data[i];
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    }
    var ViewModel = function () {
        this.locList = ko.observableArray(data);
        addMarker(this.locList());
        this.fillter = function () {
            var newLocList = [];
            var val = input.value;
            for (var j = 0; j < data.length; j++) {
                if (data[j].name.indexOf(val) != -1) {
                    newLocList.push(data[j]);
                }
            }
            this.locList(newLocList);
            addMarker(this.locList());
        }

    }
    if (!data) {
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pos,
            bounds: map.getBounds(),
            radius: '5000',
            query: 'park'
        }, callback);
        function callback(results, status) {
            console.log("返回地理位置： " + JSON.stringify(results));
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                console.error("查地址错啦！");
                return;
            }
            window.data = results;
            ko.applyBindings(new ViewModel());
        }
    }
    ko.applyBindings(new ViewModel());




}

