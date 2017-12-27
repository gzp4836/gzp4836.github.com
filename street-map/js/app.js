var header = document.getElementsByTagName("header")[0];
var header_button = header.getElementsByTagName("button")[0];
var menu = document.getElementsByClassName('menu')[0];
var input = document.getElementsByTagName('input')[0];


function initMap() {
    var markers = [];
    // 地图对象
    var map = new google.maps.Map(document.getElementById('map'), {
        center: locData[0].location,
        zoom: 12
    });
    //
    var infowindow = new google.maps.InfoWindow();

    var Loc = function (index, loc) {
        var self = this;
        this.name = ko.observable(loc.name);
        this.index = ko.observable(index);
        this.visiable = ko.observable(true);
        this.hideMark = ko.computed(function () {
            !self.visiable() ? markers[self.index()].setMap(null) : markers[self.index()].setMap(map);
        });
    }
    var ViewModel = function () {
        var self = this;
        this.locList = ko.observableArray([]);
        // 数据循环，创建marker,设置监听，构建页面数据对象Loc
        for (var i = 0; i < locData.length; i++) {
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: locData[i].location
            });
            markers.push(marker);
            // 设置marker的监听，异步jsonp获取wiki百科数据
            marker.addListener('click', function () {
                cityStr = locData[i].name;
                var wikipediaUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
                var self = this;
                $.ajax({
                    url: wikipediaUrl,
                    dataType: 'jsonp',
                    async: true,
                    success: function (response) {
                        var wikiElem = '';
                        var info = "wiki get Nothing";
                        var wikiData = response[1];
                        if(wikiData.length !=0 ){
                            for (var i = 0; i < wikiData.length; i++) {
                                var data = wikiData[i];
                                wikiElem += '<li class="wikipedia"><a href="http://en.wikipedia.org/wiki/' + data + '">' + data + '</a></li>';
                            }
                            info = '<h2>' + cityStr + '</h2><div id="pano"></div><h3>Wikipedia Links</h3><ul>' + wikiElem + '</ur>';

                        }
                    
                        infowindow.setContent(info);
                        infowindow.open(map, self);
                        // 让marker行驶动画
                        // marker.setAnimation(google.maps.Animation.BOUNCE);
                        // setTimeout(function () {
                        //     marker.setAnimation(null);
                        // }, 1400);
                    },
                    error: function () {
                        alert("异常");
                    }
                })
            });
            // 构建Loc,列表显示使用数据
            self.locList.push(new Loc(i, locData[i]));
        }

        // 点击列表条目触发click监听
        this.markerShow = function (loc) {
            google.maps.event.trigger(markers[loc.index()], 'click');
        }
        this.aClicker = function () {
            var tranformX = window.getComputedStyle(menu).transform.split('(')[1].split(')')[0].split(',')[4];
            if (tranformX < 0) {
                menu.style.transform = "translateX(0)";
                header_button.className = "";
            } else {
                menu.style.transform = "translateX(-100%)";
                header_button.className = "cate";
            }
        
        }

        // 过滤执行
        this.fillter = function () {
            for (var j = 0; j < self.locList().length; j++) {
                var item = self.locList()[j];
                item.visiable(item.name().indexOf(input.value) != -1);
            }
        }

    }
    ko.applyBindings(new ViewModel());
}

