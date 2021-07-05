var mapContainer = document.getElementById('map');
var mapOptions = {
  center: new kakao.maps.LatLng(37.57422945570032, 126.97676426853468),
  level: 3,
};
var map = new kakao.maps.Map(mapContainer, mapOptions);
