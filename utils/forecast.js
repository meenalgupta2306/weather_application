const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



forecast = (latitude, longitude, callback) => {
    const weatherapi = 'http://api.weatherstack.com/current?access_key=1a86229c76d812fa2762e6a5d8da58c8&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url: weatherapi, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Unable to find that location',undefined)
        } else {
            const temp = response.body.current.temperature;
            const feel = response.body.current.feelslike;
            callback(undefined, {
                desc: response.body.current.weather_descriptions[0],
                wind: response.body.current.wind_speed+' km/hr',
                precip: response.body.current.precip,
                humidity: response.body.current.humidity,
                temperature: response.body.current.temperature+ ' C',
                localtime: response.body.location.localtime
            })
            //callback(undefined,data);
        }
    })
}

// forecast(22.572672, 88.363881, (error, data) => {
//     //console.log('Error', error)
//     console.log(data);
//     //console.log('It is currently', data.temperature, "degrees out ");
// })
 module.exports= forecast;