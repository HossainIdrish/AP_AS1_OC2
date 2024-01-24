var map = L.map('map').setView([37.7, -122.4], 12);

var Stamen_Terrain = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// The Marker color are changed based on the cluster size less than 10 is green, less than 50 is blue and remaining as red

$.getJSON("https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/sf_crime.geojson", function (data) {
    var ratIcon = L.icon({
        iconUrl: 'https://pngimg.com/uploads/pin/small/pin_PNG101.png',
        iconSize: [65, 65]
    });

    var rodents = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var marker = L.marker(latlng, { icon: ratIcon });
            marker.bindPopup(feature.properties.date + '<br/>' + feature.properties.description + '<br/>' + feature.properties.title);
            return marker;
        }
    });

    var clusters = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
            var clusterClass = '';

            if (childCount < 10) {
                clusterClass = 'cluster-small';
            } else if (childCount < 50) {
                clusterClass = 'cluster-medium';
            } else {
                clusterClass = 'cluster-large';
            }

            return new L.DivIcon({
                html: '<div class="custom-cluster-icon ' + clusterClass + '">' +
                    '<span>' + childCount + '</span></div>',
                className: 'custom-cluster'
            });
        }
    });

    clusters.addLayer(rodents);
    map.addLayer(clusters);
});
