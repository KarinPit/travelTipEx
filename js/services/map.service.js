const API_KEY = 'AIzaSyAqYsdKnuV6P-nsHHAJeBNM7jyDABbvbug'
const WEATHER_API_KEY = 'e72f008de510787bb57723f8c15f3166'
import { fetchData } from './ans.js'

export const mapService = {
    initMap,
    initMapFromUrl,
    addMarker,
    panTo,
    mapClick,
    getAddressUrl,
    showWeather,
    API_KEY,
    WEATHER_API_KEY
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.297459982, lng = 34.91348178) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            let loc = gMap.center.toJSON()
            fetchData.getAddress(getAddressUrl(loc), fetchData.showAddress)
            showWeather(loc)
            console.log('Map!', gMap)
        })
}

function initMapFromUrl(lat, lng) {
    console.log('InitMap from URL')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            let loc = gMap.center.toJSON()
            fetchData.getAddress(getAddressUrl(loc), fetchData.showAddress)
            showWeather(loc)
            console.log('Map!', gMap)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function mapClick() {
    gMap.addListener("click", (mapEvent) => {
        let loc = mapEvent.latLng.toJSON()
        addMarker(loc)
        fetchData.getAddress(getAddressUrl(loc), fetchData.showAddress)
        panTo(loc.lat, loc.lng)
    })
}

function getAddressUrl(loc) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`
    return url
}

function getWeatherUrl(loc) {
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&units=metric&APPID=${WEATHER_API_KEY}`
    return url
}

function panTo(lat, lng) {
    let loc = { lat: lat, lng: lng }
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
    fetchData.getAddress(getAddressUrl(laLatLng.toJSON()), fetchData.showAddress)
    showWeather(loc)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function showWeather(loc) {
    fetchData.getWeather(getWeatherUrl(loc), fetchData.showWeather)
}
