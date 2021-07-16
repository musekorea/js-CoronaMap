const mapContainer = document.getElementById('map');
const mapOptions = {
  center: new kakao.maps.LatLng(37.57422945570032, 126.97676426853468),
  level: 3,
};
let map = new kakao.maps.Map(mapContainer, mapOptions);
let places = new kakao.maps.services.Places();
let markerList = [];
let infoWindow = new kakao.maps.InfoWindow();
const placesList = document.querySelector('#placesList');

//=================SEARCH=======================================
function placesSearchCallback(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    removeList();
    removeMarker();
    makeList(result);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert(`검색 결과가 존재하지 않습니다`);
    return;
  } else if (status === kakao.maps.services.Status.Error) {
    alert(`검색중 오류가 발생했습니다`);
    return;
  }
}
//==================INITALIZE======================================
function removeList() {
  while (placesList.hasChildNodes()) {
    placesList.removeChild(placesList.firstChild);
  }
}

function removeMarker() {
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].setMap(null);
    console.log(markerList[i]);
  }
  markerList = [];
}

//==================MAKE LIST========================================
function makeList(result) {
  for (let i = 1; i < result.length; i++) {
    let lat = result[i].y;
    let lng = result[i].x;
    let address = result[i].address_name;
    let placeName = result[i].place_name;
    const placePosition = new kakao.maps.LatLng(lat, lng);

    let marker = new kakao.maps.Marker({
      position: placePosition,
    });
    marker.setMap(map);
    markerList.push(marker);

    let bounds = new kakao.maps.LatLngBounds();
    //bounds.extend(new kakao.maps.LatLng(lat, lng));
    bounds.extend(placePosition);
    map.setBounds(bounds);

    const listDiv = document.createElement('div');
    listDiv.className = 'item';
    listDiv.innerHTML = `
      <div class="listContainer">
        <div class="listTitle">
          ${placeName}
        </div>
        <span>${address}</span>
      </div>
      <hr>
      `;
    placesList.appendChild(listDiv);

    kakao.maps.event.addListener(marker, 'click', () => {
      infoWindow.close();
      paintInfoWindow(marker, placeName, address, lat, lng);
    });

    kakao.maps.event.addListener(map, 'click', () => {
      infoWindow.close();
    });

    listDiv.addEventListener('click', (e) => {
      infoWindow.close();
      paintInfoWindow(marker, placeName, address, lat, lng);
    });
  }
}
//===========INFO WINDOW=========================================

function paintInfoWindow(marker, placeName, address, lat, lng) {
  infoWindow = new kakao.maps.InfoWindow({
    position: new kakao.maps.LatLng(lat, lng),
    content: `
      <div class="infoWindow">
        ${placeName}<br>
        ${address}<br>
        <button >등록</button>
      </div>`,
    zIndex: 1,
  });

  infoWindow.open(map, marker);
  const movePan = new kakao.maps.LatLng(lat, lng);
  map.panTo(movePan);
  //map.panTo(marker.getPosition());
  infoUpload(placeName, address, lat, lng);
}

//=============info Upload==========================
function infoUpload(placeName, address, lat, lng) {
  const infoDIV = document.querySelector('.infoWindow');
  const button = infoDIV.querySelector('button');
  button.addEventListener('click', async (e) => {
    const upload = await fetch(`/location`, {
      method: 'post',
      body: JSON.stringify({
        placeName,
        address,
        lat,
        lng,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  });
}

//================SEARCH BUTTON=================================
const searchForm = document.querySelector('#searchForm');
let keyword = document.querySelector('#keyword');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  places.keywordSearch(keyword.value, placesSearchCallback);
});
