const mapContainer = document.getElementById('map');
const mapOptions = {
  center: new kakao.maps.LatLng(37.57422945570032, 126.97676426853468),
  level: 3,
};
let map = new kakao.maps.Map(mapContainer, mapOptions);

let infoWindow = new kakao.maps.InfoWindow({
  zIndex: 1,
});

let markerList = [];

let places = new kakao.maps.services.Places();

function palcesSearchCallback(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    console.log(result);
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
