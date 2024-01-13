// import { storageService } from './async-storage.service'

const locs = []

export const locService = {
    getLocs,
    save: saveToStorage,
    show: show,
    delete: deleteFromStorage
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDateTime = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime
}

function saveToStorage(loc, input) {
    locs.push({ id: locs.length, name: input, lat: loc.lat, lng: loc.lng, createdAt: getTime(), updatedAt: getTime() })
}

function show() {
    const locPre = document.querySelector('.locs')
    let innerText = ''
    locs.forEach(loc => {
        let p = `<p onclick="onLocClick(this)">${loc.name} Lat:${loc.lat} Lng:${loc.lng}</p>
                <hr>`
        innerText += p
    });
    locPre.innerHTML = innerText
}

function deleteFromStorage(input) {
    let index = locs.findIndex(location => location.name === input)
    if (index !== -1) {
        locs.splice(index, 1);
    } else {
        console.log('something went wrong...');
    }
}
