const request = require('request')
//const yargs = require('yargs')

//geocoding

//address --> lat/lon --> weather

/*
1. fire off a new request to the url explored in browser
2. have the request module parse it as json
3. print both the latitude and longitude to terminal
4. test your work
*/


geocode = (place, callback) => {

    const mapbox = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoibWd1cHRhMjMwNiIsImEiOiJjbDYwbGRsNHkwMGUzM2RtcjZyNTY0MHRpIn0.zUBhLVHiMlJkIZZOdFmZHw&limit=1'

    request({ url: mapbox, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (response.body.features.length == 0) {
            callback('Unable to find the location')
        }else {
            const lat = response.body.features[0].center[1];
            const lon = response.body.features[0].center[0];
            const loc = response.body.features[0].place_name;
            d={
                latitude:lat,
                longitude:lon,
                location:loc
            }
            callback(undefined,d)
        }
    })
}

// geocode('Los%20Angeles', (error, data) => {
//     console.log("error " + error);
//     console.log("data " + data);
//     // console.log("data " + data.latitude);
//     // console.log("data " + data.longitude);
//     // console.log("data " + data.location);
// })
module.exports= geocode;

//4.683971 51.825221