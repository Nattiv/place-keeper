'use strict'
var gIdx = 101
var gPlaces 
var map

function createPlace(locName) {
    console.log(locName)
    var place = {
        id: gIdx++,
        lng: gLng,
        lat: gLat,
        locName: locName
    }
    gPlaces.unshift(place);
    saveListInStorage()
}

function saveListInStorage() {
    localStorage.setItem('listKeptPlaces', JSON.stringify(gPlaces)); //TO DO: Create utils and save
}


function getListFromStorage() {
    var listKeptPlaces = localStorage.getItem('listKeptPlaces');
    if (!listKeptPlaces) return []
    return JSON.parse(listKeptPlaces);
}

function findPlace(PlaceId) {
    var res = gPlaces.findIndex(place => {
        return (place.id === PlaceId)
    })
    console.log(res)
    return res;
}

function deletePlace(placeIdx) {
    gPlaces.splice(placeIdx, 1);
    saveListInStorage();
}
