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
  console.log(`location data=`, data);

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
    console.log(markerList, infoWindowList);
  }

  for (let i = 0; i < markerList.length; i++) {
    naver.maps.Event.addListener(markerList[i], 'click', (e) => {
      console.log(i);
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
}

getData();
