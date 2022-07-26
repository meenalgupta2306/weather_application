const form = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const temperature = document.querySelector('#temp');
const precip = document.querySelector('#precip');
const humid = document.querySelector('#humid');
const wind = document.querySelector('#wind');
const place = document.querySelector('#place');
const time = document.querySelector('#time');
const desc = document.querySelector('#desc');

form.addEventListener('submit', (e) => {
    //prevent refresh of page
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location
    document.querySelector('#load').style.display='block';
    message1.style.display='none';
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                if(data.error){
                    document.querySelector('#load').style.display='none';
                    document.querySelector('section').style.display='none';
                    document.querySelector('aside').style.display='none';
                    message1.style.display='block';
                    message1.textContent=data.error
                    console.log(data.error);
                }else{
                    document.querySelector('#message1').style.display='none';
                    document.querySelector('#load').style.display='none';
                    document.querySelector('section').style.display='block';
                    document.querySelector('aside').style.display='block';
                    celsius=data.forecast.temperature
                    console.log(data);
                    temperature.textContent= data.forecast.temperature;
                    precip.textContent= data.forecast.precip;
                    humid.textContent= data.forecast.humidity;
                    wind.textContent= data.forecast.wind;
                    place.textContent= data.address;
                    time.textContent= data.forecast.localtime;
                    desc.textContent= data.forecast.desc;

                    
                }
            })
        })
})




