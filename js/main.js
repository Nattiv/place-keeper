'use strict'
var map;
var gLat;
var gLng;



// <---MAP--->


function initMapPage() {
    gPlaces = getListFromStorage()
    renderList()
}

function initMap() {
    var eilat = { lat: 29.5577, lng: 34.9519 };
    map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: eilat });
    google.maps.event.addListener(map, 'click', function (event) {
        document.querySelector('.latclicked').innerHTML = event.latLng.lat();
        document.querySelector('.longclicked').innerHTML = event.latLng.lng();
        gLat = event.latLng.lat();
        gLng = event.latLng.lng();
    });
    var marker = new google.maps.Marker({ position: eilat, map: map });
}

function getLocation() {
    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log('pos is:', pos)
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function showModalMap() {
    var elModal=document.querySelector('.modal-content-map')
    elModal.classList.add('show-modal-map');
}

function savePlace() {
    var elLocName = document.querySelector('.loc-name').value;
    if (!elLocName) return;
    if (!gLat || !gLng) return;
    createPlace(elLocName);
    onCloseModalMap()
    renderList()
}

function renderList() {
    var listKeptPlaces = getListFromStorage()
    console.log(listKeptPlaces)
    console.log(typeof listKeptPlaces)
    if (!listKeptPlaces) return;

    var strHtmls = listKeptPlaces.map((place) => {
        console.log(place)
        return `<tr>
        <td>${place.locName}</td>
        <td>${place.lng.toFixed(2)}</td>
        <td>${place.lat.toFixed(2)}</td>
        <td><button onclick="onDelete(${place.id})" class="delete-btn">Delete</button></td>
        </tr>`
    })
    console.log(strHtmls)
    document.querySelector('.places-kept').innerHTML = strHtmls.join('');
}

function onDelete(PlaceId) {
    var placeIdx = findPlace(PlaceId)
    deletePlace(placeIdx);
    renderList()
}

function onToggleMenu() {
    var menu = document.querySelector('ul');
    var btnHamburger = document.querySelector('.img-hamburger');
    if (!menu.classList.contains('show-menu')) {
        menu.classList.add('show-menu')
        btnHamburger.src = 'img/x-png-512_512_preview.png';
    } else {
        menu.classList.remove('show-menu');
        btnHamburger.src = 'img/hamburger-button-png-6.png';
    }
}

function onCloseModalMap(){
    var elModal = document.querySelector('.modal-content-map')
    elModal.classList.remove('show-modal-map')

}

// <---HOME--->


function initHomePage() {
    var idxUser = getIdxUser()
    var userDetails = getUserDetailsfromStorage(idxUser)
    setPageColors(userDetails)
}

function setPageColors(userDetails) {
    document.body.style.backgroundColor = userDetails.favBackgroundColor;
    document.body.style.color = userDetails.favTextColor;
}

function onUpdate() {
    var idxUser = document.querySelector('.input-id').value;
    if (!idxUser) return;
    var userDetails = getUserDetailsfromStorage(idxUser)
    console.log(userDetails)
    setPageColors(userDetails)
}


// <----FORM-CONTROLLER---->

console.log('Form')

function onSubmit(event) {
    event.preventDefault()
    getData();
}

function getData() {
    let fName = document.querySelector('#fName').value;
    let lName = document.querySelector('#lName').value;
    let eMail = document.querySelector('#e-mail').value;
    let favBackgroundColor = document.querySelector('#fav-background-color').value
    let favTextColor = document.querySelector('#fav-text-color').value
    let birthDate = document.querySelector('#user-birth-date').value;
    createUserObj(fName, lName, eMail, favBackgroundColor, favTextColor, birthDate)
}

function onGetForecast() {
    getForecast()
    showModal(`FORECAST IS: ${forecasts[randNum]}`)
}

function showModal(msg) {
    var elModal = document.querySelector(".screen");
    elModal.classList.add('show-modal');
    var elMsg = document.querySelector('.msg');
    elMsg.innerHTML = msg;
}

function onCloseModal() {
    var elModal = document.querySelector(".screen");
    elModal.classList.remove('show-modal')
}

