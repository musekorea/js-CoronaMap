let markerList = [];
let infoWindowList = [];

async function getData() {
  const fetchData = await fetch('/location', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!fetchData) {
    console.log(`error`);
    return;
  }

  const dataJSON = await fetchData.json();
  const data = dataJSON.data;

  let map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(
      data[data.length - 1].lat,
      data[data.length - 1].lng
    ),
    zoom: 10,
  });

  for (let i = 0; i < data.length; i++) {
    let target = data[i];

    let marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(data[i].lat, data[i].lng),
      icon: {
        content: `<div class="marker"></div>`,
        anchor: new naver.maps.Point(7.5, 7.5),
      },
    });
    const content = `
    <div class="infoWindow_wrap">
      <div class="infoWindow_title">${target.placeName}</div>
      <div class="infoWindow_address">${target.address}</div>
    <div>`;

    const infoWindow = new naver.maps.InfoWindow({
      content: content,
      backgroundColor: 'green',
      borderColor: 'black',
      anchorSize: new naver.maps.Size(0, 10),
    });

    markerList.push(marker);
    infoWindowList.push(infoWindow);
  }

  for (let i = 0; i < markerList.length; i++) {
    naver.maps.Event.addListener(markerList[i], 'click', (e) => {
      const selectedMarker = markerList[i];
      const selectedInfoWindow = infoWindowList[i];
      if (selectedInfoWindow.getMap()) {
        selectedInfoWindow.close();
      } else {
        selectedInfoWindow.open(map, selectedMarker);
      }
    });
    naver.maps.Event.addListener(map, 'click', (e) => {
      infoWindowList[i].close();
    });
  }
  //===========CLUSTER=====================================
  const cluster1 = {
    content: `<div class="cluster cluster1"></div>`,
  };
  const cluster2 = {
    content: `<div class="cluster cluster2"></div>`,
  };
  const cluster3 = {
    content: `<div class="cluster cluster3"></div>`,
  };

  const markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 12,
    map: map,
    markers: markerList,
    disableClickZoom: false,
    gridSize: 20,
    icons: [cluster1, cluster2, cluster3],
    indexGenerator: [2, 5, 10],
    stylingFunction: (clusterMarker, count) => {
      //console.log(clusterMarker._wrapper.firstChild);
      clusterMarker._wrapper.firstChild;
      clusterMarker._wrapper.firstChild.textContent = `${count}`;
    },
  });
}
getData();

//================아래는 행정구역 나누기 실패~ =============================

/* const urlPrefix = `https://navermaps.github.io/maps.js/docs/data/region`;
const urlSuffix = `.json`;

let regionGeoJson = [];
let loadCount = 0;

naver.maps.Event.once(map, 'init_stylemap', async () => {
  for (let i = 1; i > 18; i++) {
    let keyword = i.toString();
    if (keyword.length === 1) {
      keyword = `0${keyword}`;
    }
    const regionData = await fetch(urlPrefix + keyword + urlSuffix.toString,{
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    });
    regionGeoJson.push(regionData);
    await loadCount++;
    console.log(i)
    if (loadCount === 17) {
      return startDataLayer();
    }
  }
});

function startDataLayer() {
  map.data.setStyle((feature)  =>  {
    const styleOptions = {
      fillColor = `red`,
      fillOpacity = 0.0001,
      strokeColor = `red`,
      strokeWeight:2,
      strokeOpacity:0.4,
    };
    if(feature.getProperty("focus")){
      styleOptions.fillColor = `green`,
      styleOptions.fillOpacity=0.6,
      styleOptions.strokeColor = `green`,
      styleOptions.strokeWeight=4,
      styleOptions.strokeOpacity=1
    }
    return styleOptions;
  });

  regionGeoJson.forEach(geojson=>{
    map.data.addGeoJson(geojson)
  })
}
 */
