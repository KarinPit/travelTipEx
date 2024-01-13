import { mapService } from './map.service.js'
export const fetchData =
{
    getAddress,
    showAddress,
    getLoc,
    getWeather,
    showWeather
}

function getAddress(url, onSuccess) {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const ans = JSON.parse(xhr.responseText)
            onSuccess(ans)
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

function getLoc(url, onSuccess) {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const ans = JSON.parse(xhr.responseText)
            onSuccess(ans)
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

function getWeather(url, onSuccess) {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const ans = JSON.parse(xhr.responseText)
            onSuccess(ans)
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

function showAddress(ans) {
    let address = ans.plus_code.compound_code.replace(/\b[\w\d]+\+[\w\d]+\b/g, '')
    let locDiv = document.querySelector('.user-loc')
    locDiv.innerHTML = address
    return address
}

function showWeather(ans) {
    let icon = ans.weather[0].icon
    let desc = ans.weather[0].description
    let temp = ans.main.temp
    let feelsTemp = ans.main.feels_like
    let img = document.querySelector('.weather img')
    let p = document.querySelector('.weather p')
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    p.innerHTML = `${desc}, temp is ${temp} but feels like ${feelsTemp}`
}