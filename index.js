const searchInput = document.getElementById('search');
const resultList = document.getElementById('result-list');
const mapContainer = document.getElementById('map-container');
const currentMarkers = [];

const map = L.map(mapContainer).setView([20.13847, 1.40625], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);





document.addEventListener("DOMContentLoaded", function(event) {
  
  setTimeout(() => {
    function isTokenInvalid(token) {
        return token === '' || token === 'null' || token === null;
    }
    var token = getCookie('token');
    if(isTokenInvalid(token)){
        window.location.href="login.html"
    }
  }, 200);
  
  // let local = 'localhost';
  // let host = '';
  // if(window.location.href.indexOf(local) > -1){
  //   local = true;
  //   host = 'http://localhost/brinjilbackend/';
  // }else{
  // local = false;
  //   host = 'https://nurida-florist.com/apis/';
  // }

  // var token = getCookie('token');
  // let data = {
  //   token: token
  // }

  // var circleLayer = L.layerGroup();

  // fetch(host+"bridge/markers/dots/read/", {
  //   method: "POST",
  //   headers: {'Content-Type': 'application/json'}, 
  //   dataType: 'json',
  //   body: JSON.stringify({data})
  // }).then(response =>response.json())
  // .then(data => {
  //   var data = data.data;
  //   for(let i=0; i<data.length; i++){
  //     // console.log(data[i].latitude);
  //     var circle = L.circle([data[i].latitude, data[i].longitude], {
  //       radius: 3
  //     }).addTo(circleLayer);
  //     circleLayer.addTo(map);
  //   }
  // })
  // .catch(error => console.log('Error:', error));
  function loadData(param){
    let local = 'localhost';
    let host = '';
    if(window.location.href.indexOf(local) > -1){
      local = true;
      host = 'http://localhost/brinjilbackend/';
    }else{
    local = false;
      host = 'https://nurida-florist.com/apis/';
    }
  
    var token = getCookie('token');
    let data = {
      token: token
    }
  
    var circleLayer = L.layerGroup();
    circleLayer.addTo(map);

    fetch(host+"bridge/markers/dots/read/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      dataType: 'json',
      body: JSON.stringify({data})
    }).then(response =>response.json())
    .then(data => {
      var data = data.data;
      if(param=='init'){
        for(let i=0; i<data.length; i++){
          // console.log(data[i].latitude);
          var circle = L.circle([data[i].latitude, data[i].longitude], {
            radius: 3
          }).addTo(circleLayer);
        }
        localStorage.setItem("last_marking", data.length);
      }
      if(data.length == parseInt(localStorage.getItem("last_marking"))){
        console.log('marked request same, not loaded')
      }else{
        for(let i=parseInt(localStorage.getItem("last_marking")); i<data.length; i++){
          // console.log(data[i].latitude);
          var circle = L.circle([data[i].latitude, data[i].longitude], {
            radius: 3
          }).addTo(circleLayer);
        }
        console.log('new marker loaded');
        localStorage.setItem("last_marking", data.length);
      }
    })
    .catch(error => console.log('Error:', error));
  }
  loadData('init');
  setInterval(loadData, 3000); 
  //to remove layer:
  // setTimeout(() => {
  //   circleLayer.remove();
  // }, 5000);

  var newCenter = {
      //-6.312640, 106.743008
      lat: -6.312640,
      lng: 106.743008
  };
    
  map.setView(newCenter, 19, true);
  map.setMinZoom(10); 

  var markers = [
      [-6.3120128075724695, 106.74366116534658],
      [-6.31222082955609, 106.74331784259267],
      [-6.3114562966779, 106.74288868915029],
      [-6.311674899680798, 106.74383282672353],
      [-6.310958382274288, 106.74190700065084],
      [-6.300734379669636, 106.76198601733633]
  ];

  var default_icon_size = [38, 50];
  var imageList = [
      'aryagraha/tenis.png', 
      'aryagraha/hatihatitaik.png',
      'aryagraha/masjid.png',
      'aryagraha/warung.png',
      'aryagraha/tower.jpg',
      'commonicon/macet.png'
  ];

  var nameList = [
      'Lapangan', 
      'Kadang ada taik kucing.png',
      'Masjid',
      'Warung',
      'Tower',
      'Langganan Macet'
  ];
  
  for (var i = 0; i < markers.length; i++) {

      var customIcon = L.icon({
          iconUrl: imageList[i],
          iconSize: default_icon_size, // Adjust dimensions as needed
      });

      var marker = L.marker(markers[i])
      .setIcon(customIcon)
      .bindPopup(nameList[i]+'</br><a href=#>details</a>')
      .openPopup()
      .addTo(map);
  }

  //Line
  var line = L.polyline([
    [-6.3114562966779, 106.74288868915029],
    [-6.311674899680798, 106.74383282672353]
  ]).bindPopup(nameList[i]+'</br>Distance: </a>').addTo(map);

  //Triangle
  var triangle = L.polygon([
    [-6.301814958751263, 106.76194846632825],
    [-6.301168779425779, 106.76245272162308],
    [-6.301948466776063, 106.76313936713089]
  ]).addTo(map);

  triangle.setStyle({
    color: 'green',
    fillColor: 'red',
    fillOpacity: 0.5
  });

});

map.on('zoomend', function() {
  zoomThreshold(15,16);
});

map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    console.log('Latitude Longitude: ' + lat + ', ' + lng);

    var popLocation= e.latlng;

    var circle = L.circle([lat, lng], {
        radius: 3
    }).addTo(map);

    let local = 'localhost';
    let host = '';
    if(window.location.href.indexOf(local) > -1){
      local = true;
      host = 'http://localhost/brinjilbackend/';
    }else{
    local = false;
      host = 'https://nurida-florist.com/apis/';
    }

    var token = getCookie('token')
    let data = {
      token:"gagagrag42252524agfagadfg341",
        latitude:lat,
        longitude:lng,
        altitude:"-"
    }

    //SAVE DOTS REQUEST
    fetch(host+"bridge/markers/dots/create/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      dataType: 'json',
      body: JSON.stringify({data})
    }).then(response => response.json())
    .then(data => {
      if(data.success == false){
        alert('records limited, contact the web admin');
      }
    }
    ).catch(error => console.log('Error:', error));
});


document.getElementById('search-button').addEventListener('click', () => {
    setResultList(
        [
            {
              "place_id": 274010846,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "relation",
              "osm_id": 65606,
              "lat": "-6.3137688447271465",
              "lon": "106.74078549089327",
              "class": "place",
              "type": "city",
              "place_rank": 16,
              "importance": 0.8820890292539882,
              "addresstype": "city",
              "name": "London",
              "display_name": "Capital City of Indonesia",
              "address": {
                "city": "London",
                "state_district": "Greater London",
                "state": "England",
                "ISO3166-2-lvl4": "GB-ENG",
                "country": "United Kingdom",
                "country_code": "gb"
              },
              "boundingbox": [
                "51.2867601",
                "51.6918741",
                "-0.5103751",
                "0.3340155"
              ]
            },
            {
              "place_id": 24623173,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "node",
              "osm_id": 9406695086,
              "lat": "42.9832406",
              "lon": "-81.243372",
              "class": "place",
              "type": "city",
              "place_rank": 16,
              "importance": 0.6078714571941068,
              "addresstype": "city",
              "name": "London",
              "display_name": "London, Ontario, N6A 3N7, Canada",
              "address": {
                "city": "London",
                "state": "Ontario",
                "ISO3166-2-lvl4": "CA-ON",
                "postcode": "N6A 3N7",
                "country": "Canada",
                "country_code": "ca"
              },
              "boundingbox": [
                "42.8232406",
                "43.1432406",
                "-81.4033720",
                "-81.0833720"
              ]
            },
            {
              "place_id": 273135560,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "relation",
              "osm_id": 51800,
              "lat": "51.5156177",
              "lon": "-0.0919983",
              "class": "boundary",
              "type": "administrative",
              "place_rank": 12,
              "importance": 0.5865111547516774,
              "addresstype": "city",
              "name": "City of London",
              "display_name": "City of London, Greater London, England, United Kingdom",
              "address": {
                "city": "City of London",
                "ISO3166-2-lvl6": "GB-LND",
                "state_district": "Greater London",
                "state": "England",
                "ISO3166-2-lvl4": "GB-ENG",
                "country": "United Kingdom",
                "country_code": "gb"
              },
              "boundingbox": [
                "51.5068709",
                "51.5233122",
                "-0.1138295",
                "-0.0727619"
              ]
            },
            {
              "place_id": 24606406,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "node",
              "osm_id": 6182594243,
              "lat": "42.9537654",
              "lon": "-81.2291529",
              "class": "place",
              "type": "county",
              "place_rank": 12,
              "importance": 0.45000999999999997,
              "addresstype": "county",
              "name": "London (city)",
              "display_name": "London (city), Ontario, N6C 0A7, Canada",
              "address": {
                "county": "London (city)",
                "state": "Ontario",
                "ISO3166-2-lvl4": "CA-ON",
                "postcode": "N6C 0A7",
                "country": "Canada",
                "country_code": "ca"
              },
              "boundingbox": [
                "42.2537654",
                "43.6537654",
                "-81.9291529",
                "-80.5291529"
              ]
            },
            {
              "place_id": 325272631,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "relation",
              "osm_id": 182481,
              "lat": "39.8864493",
              "lon": "-83.448253",
              "class": "boundary",
              "type": "administrative",
              "place_rank": 16,
              "importance": 0.44530120282564173,
              "addresstype": "city",
              "name": "London",
              "display_name": "London, Madison County, Ohio, 43140, United States",
              "address": {
                "city": "London",
                "county": "Madison County",
                "state": "Ohio",
                "ISO3166-2-lvl4": "US-OH",
                "postcode": "43140",
                "country": "United States",
                "country_code": "us"
              },
              "boundingbox": [
                "39.8592800",
                "39.9217860",
                "-83.4789230",
                "-83.3899970"
              ]
            },
            {
              "place_id": 325636495,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "relation",
              "osm_id": 130591,
              "lat": "37.1283343",
              "lon": "-84.0835576",
              "class": "boundary",
              "type": "administrative",
              "place_rank": 16,
              "importance": 0.4412922449371916,
              "addresstype": "city",
              "name": "London",
              "display_name": "London, Laurel County, Kentucky, 40741, United States",
              "address": {
                "city": "London",
                "county": "Laurel County",
                "state": "Kentucky",
                "ISO3166-2-lvl4": "US-KY",
                "postcode": "40741",
                "country": "United States",
                "country_code": "us"
              },
              "boundingbox": [
                "37.0797590",
                "37.1522600",
                "-84.1262620",
                "-84.0359570"
              ]
            },
            {
              "place_id": 320503585,
              "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
              "osm_type": "relation",
              "osm_id": 111457,
              "lat": "35.328973",
              "lon": "-93.2529553",
              "class": "boundary",
              "type": "administrative",
              "place_rank": 16,
              "importance": 0.39823578717763003,
              "addresstype": "city",
              "name": "London",
              "display_name": "London, Pope County, Arkansas, United States",
              "address": {
                "city": "London",
                "county": "Pope County",
                "state": "Arkansas",
                "ISO3166-2-lvl4": "US-AR",
                "country": "United States",
                "country_code": "us"
              },
              "boundingbox": [
                "35.3169503",
                "35.3389327",
                "-93.2716305",
                "-93.1874567"
              ]
            }
          ]
        );
});

function setResultList(parsedResult) {
    resultList.innerHTML = "";
    for (const marker of currentMarkers) {
        map.removeLayer(marker);
    }
    // map.flyTo(new L.LatLng(-6.3137688447271465, 106.74078549089327), 2);
    for (const result of parsedResult) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-action');
        li.innerHTML = JSON.stringify({
            displayName: result.display_name,
            lat: result.lat,
            lon: result.lon
        }, undefined, 2);
        li.addEventListener('click', (event) => {
            for(const child of resultList.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            const position = new L.LatLng(clickedData.lat, clickedData.lon);
            map.flyTo(position, 10);
        })
        const position = new L.LatLng(result.lat, result.lon);
        currentMarkers.push(new L.marker(position).addTo(map));
        resultList.appendChild(li);
    }

    // map.setZoom(100);
    const position = new L.LatLng(-6.312640, 106.743008);
    map.flyTo(position, 18);
    
    currentMarkers.push(new L.marker(position).addTo(map).bindPopup('Test..<a href=#>test</a>').openPopup());
}

document.getElementById('btn-logout').addEventListener('click', () => {
  window.location.href = 'logout.html';
});
