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

let markerList = [];
let infoWindowList = [];

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
      <div class="infoWindow_title">${target.title}</div>
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
