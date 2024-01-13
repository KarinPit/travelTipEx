import { locService } from './loc.service.js'
import { mapService } from './map.service.js'
import { fetchData } from './ans.js'


window.onload = onInit
window.loadFromUrl = loadFromUrl
window.copyUrl = copyUrl
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchLocation = onSearchLocation
window.getTheCoords = getTheCoords
window.panToMyLocation = panToMyLocation
window.deleteLocation = deleteLocation
window.onLocClick = onLocClick
window.fetchData = fetchData

function onInit() {
    let loc = loadFromUrl()
    if (loc != '') {
        mapService.initMapFromUrl(loc.lat, loc.lng)
            .then(() => {
                console.log('Map is ready')
                mapService.mapClick()
            })
            .catch(() => console.log('Error: cannot init map'))
    }
    else {
        mapService.initMap()
            .then(() => {
                console.log('Map is ready')
                mapService.mapClick()
            })
            .catch(() => console.log('Error: cannot init map'))
    }
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.3003663, lng: 34.9096494 })
}

function onGetLocs() {
    locService.show()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function panToMyLocation() {
    mapService.panTo(32.297459982, 34.91348178)
}

function getTheCoords(ans) {
    let loc = ans.results[0].geometry.location
    let input = document.querySelector('input').value.replace(/ /g, '_')
    let lat = loc.lat
    let lng = loc.lng
    window.location.hash = `/search?q=${encodeURIComponent(lat)}-${encodeURIComponent(lng)}`;
    mapService.panTo(loc.lat, loc.lng)
    locService.save(loc, input)
    locService.show()
}

function onSearchLocation(event) {
    if (event) event.preventDefault()
    let input = document.querySelector('input').value.replace(/ /g, '_')
    let addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${input}}&key=${mapService.API_KEY}`
    fetchData.getLoc(addressUrl, getTheCoords)
}

function deleteLocation() {
    let input = document.querySelector('input').value.replace(/ /g, '_')
    locService.delete(input)
}

function onLocClick(el) {
    let toDel = el.innerText.split(' ')[0].replace('Name:', '')
    let lat = el.innerText.split(' ')[1].replace('Lat:', '')
    let lng = el.innerText.split(' ')[2].replace('Lng:', '')
    mapService.panTo(lat, lng)
    locService.delete(toDel)
    locService.show()
}

function loadFromUrl() {
    const hash = window.location.hash;
    const match = hash.match(/q=([-+]?\d*\.\d+)-([-+]?\d*\.\d+)/);
    if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) }
    else { return '' }
}

function copyUrl() {
    const currentUrl = window.location.href;
    const textarea = document.createElement('textarea');
    textarea.value = currentUrl;
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}




