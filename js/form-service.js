'use strict'
var gIdxUser = getgIdxUser()

function getgIdxUser() {
    gIdxUser = JSON.parse(localStorage.getItem('gIdxUser'));
    if (!gIdxUser) gIdxUser = 100;
    return gIdxUser
}

function createUserObj(fName, lName, eMail, favBackgroundColor, favTextColor, birthDate) {
    var userData = {
        firstName: fName,
        lastName: lName,
        eMail: eMail,
        favBackgroundColor: favBackgroundColor,
        favTextColor: favTextColor,
        birthDate: birthDate,
        id: ++gIdxUser
    }
    saveToStorageUserDetails(userData);
}

function saveToStorageUserDetails(userData) {
    localStorage.setItem(userData.id, JSON.stringify(userData))
    localStorage.setItem('gIdxUser', JSON.stringify(userData.id))
    showModal(`ID CODE IS: ${userData.id}`)

}

function getForecast() {
    var randNum = getRandomIntInclusive(0, 2)
    var forecasts = ["a GOOD DAY!", 'an OK DAY', 'a NICE DAY']
    showModal(`"YOU WILL HAVE ${forecasts[randNum]}`)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}




