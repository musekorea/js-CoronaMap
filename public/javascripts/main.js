const data = [
  {
    title: '주한중국대사관',
    address: '서울',
    lat: 37.70324989452125,
    lng: 126.99967224161223,
  },
  {
    title: '우리집',
    address: '성끝4길',
    lat: 35.48251331323697,
    lng: 129.43343387826172,
  },
  {
    title: '종로',
    address: '종로4가',
    lat: 37.570905849510986,
    lng: 126.9837533075827,
  },
  {
    title: '중국 테스트',
    address: '천안문',
    lat: 39.908923621036585,
    lng: 116.39753433978021,
  },
  {
    title: '중국 테스트',
    address: '왕징소호',
    lat: 39.99663230140488,
    lng: 116.48140811094798,
  },
];

let map = new naver.maps.Map('map', {
  center: new naver.maps.LatLng(
    data[data.length - 1].lat,
    data[data.length - 1].lng
  ),
  zoom: 10,
});

for (let i = 0; i < data.length; i++) {
  let marker = new naver.maps.Marker({
    map: map,
    position: new naver.maps.LatLng(data[i].lat, data[i].lng),
  });
}
