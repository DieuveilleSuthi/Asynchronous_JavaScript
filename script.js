'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
var getCountries = function(countrie){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${countrie}`);
    request.send();
    console.log(request.responseText);

    request.addEventListener('load', function(){
        const data = JSON.parse(this.responseText);

        console.log(data);

    })
}


getCountries('congo');
getCountries('congo-brazzaville');
getCountries('usa');
getCountries('france');
*/
const renderCountry = function(data, className = ''){
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${Object.values(data[0].flags)[0]}" />
      <div class="country__data">
        <h3 class="country__name">${Object.values(data[0].name)[0]}</h3>
        <h4 class="country__region">${data[0].region}</h4>
        <p class="country__row"><span>👫</span>${(+data[0].population/1000000).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${Object.values(data[0].languages)[0]}</p>
        <p class="country__row"><span>💰</span>${Object.values(data[0].currencies)[0].name}</p>
      </div>
    </article>
 `
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

const getCountryData = function(countrie){
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${countrie}`)
    .then(response => response.json())
    .then(data => {
        renderCountry(data);
        console.log(data);
        const neighbour = data[0].borders[0];

        if (!neighbour) return;

        // Country 2

        return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        .then(response => response.json())
        .then(data => renderCountry(data, 'neighbour'));
    });
};

getCountryData('portugal');      