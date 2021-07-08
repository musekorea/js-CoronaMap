const mapContainer = document.getElementById('map');
const mapOptions = {
  center: new kakao.maps.LatLng(37.57422945570032, 126.97676426853468),
  level: 3,
};
let map = new kakao.maps.Map(mapContainer, mapOptions);
let infoWindow = new kakao.maps.InfoWindow({
  zIndex: 1,
});
let places = new kakao.maps.services.Places();
let markerList = [];

function makeList(result) {
  const placesList = document.querySelector('#placesList');
  //let bounds = new kakao.maps.LatLngBounds();
  for (let i = 1; i < result.length; i++) {
    let lat = result[i].y;
    let lng = result[i].x;
    let address = result[i].address_name;
    let placeName = result[i].place_name;
    const placePosition = new kakao.maps.LatLng(lat, lng);
    //bounds.extend(placePosition);

    let marker = new kakao.maps.Marker({
      position: placePosition,
    });
    marker.setMap(map);
    markerList.push(marker);
    console.log(markerList);

    const listDiv = document.createElement('div');
    listDiv.className = 'item';
    listDiv.innerHTML = `
      <div class="info">
        <div class="infoTitle">
          ${placeName}
        </div>
        <span>${address}</span>
      </div>
      <hr>
      `;

    placesList.appendChild(listDiv);
  }
}

function palcesSearchCallback(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    makeList(result);
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    alert(`검색 결과가 존재하지 않습니다`);
    return;
  } else if (status === kakao.maps.services.Status.Error) {
    alert(`검색중 오류가 발생했습니다`);
    return;
  }
}
const searchForm = document.querySelector('#searchForm');
let keyword = document.querySelector('#keyword');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  places.keywordSearch(keyword.value, palcesSearchCallback);
});
