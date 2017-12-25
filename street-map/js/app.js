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
var markers;
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
    function renderGoogleMarker(list) {
        if (markers) {
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
        }
        markers = [];
        for (var i = 0; i < list.length - 1; i++) {
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: list[i].geometry.location
            });
            markers.push(marker);
            if (!list[i].visiable()) {
                marker.setMap(null);
            }

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(list[i].name());
                infowindow.open(map, this);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    marker.setAnimation(null);
                  }, 1400)
            });
        }
    }

    var Loc = function (index, loc) {
        this.name = ko.observable(loc.name);
        this.index = ko.observable(index);
        this.visiable = ko.observable(true);
        this.geometry = loc.geometry;
    }
    var ViewModel = function () {
        var self = this;
        this.locList = ko.observableArray([]);
        for (var i = 0; i < locData.length; i++) {
            self.locList.push(new Loc(i, locData[i]));
        }

        renderGoogleMarker(this.locList());

        this.markerShow = function (loc) {
            google.maps.event.trigger(markers[loc.index()], 'click');
        }

        this.fillter = function () {
            for (var j = 0; j < self.locList().length; j++) {
                var item = self.locList()[j];
                item.visiable(true);
                if (item.name().indexOf(input.value) === -1) {
                    item.visiable(false);
                }
            }
            renderGoogleMarker(this.locList());
        }

    }
    // if (!data) {
    //     service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch({
    //         location: pos,
    //         bounds: map.getBounds(),
    //         radius: '5000',
    //         query: 'park'
    //     }, callback);
    //     function callback(results, status) {
    //         console.log("返回地理位置： " + JSON.stringify(results));
    //         if (status != google.maps.places.PlacesServiceStatus.OK) {
    //             console.error("查地址错啦！");
    //             return;
    //         }
    //         window.data = results;
    //         ko.applyBindings(new ViewModel());
    //     }
    // }
    ko.applyBindings(new ViewModel());




}

