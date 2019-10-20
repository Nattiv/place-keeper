'use strict'

function getIdxUser() {
    return parseInt(localStorage.getItem('gIdxUser'));
}

function getUserDetailsfromStorage(idxUser) {
    var res = localStorage.getItem(idxUser);
    res = JSON.parse(res);
    return res
}






