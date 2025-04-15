const request = require('postman-request')
const getWeather = require('./getWeather')

// const geocodeURL = 'https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=7349543a2c8e44cbafb477e9db4a8a00'
// const geocodeURL = 'https://api.geoapify.com/v1/geocode/search?text=3&apiKey=7349543a2c8e44cbafb477e9db4a8a00'
// const geocodeURL = 'https://api.geoapify.com/v1/geocode/search?text=Rajkot&apiKey=7349543a2c8e44cbafb477e9db4a8a00'

// request({ url: geocodeURL, json: true }, (error, response) => {

//     if (error) {
//         console.log('Unable to  connect to location service!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location')
//     } else {
//         const data = response.body
//         const firstResult = data.features[0]

//         console.log(firstResult.properties.city)
//         console.log(firstResult.properties.lon)
//         console.log(firstResult.properties.lat)
//     }

// })

const geocode = (address, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) + '&apiKey=7349543a2c8e44cbafb477e9db4a8a00'

    request({ url, json: true }, (error, response  ) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = response.body
            const firstResult = data.features[0]
            const locationData = {
                City: response.body.features[0].properties.city,
                Latitude: response.body.features[0].properties.lat,
                Longitude: response.body.features[0].properties.lon,
                State: response.body.features[0].properties.state
            }
            // callback( undefined , {
            //     Location: response.body.features[0].properties.city,
            //     Latitude: response.body.features[0].properties.lat,
            //     Longitude: response.body.features[0].properties.lon

            // })
            callback(undefined , locationData)
            // getWeather(locationData.Latitude, locationData.Longitude, (error, data) => {
            //     console.log('Error', error)
            //     console.log('Data', data)
            // })
        }
    })
}

module.exports = geocode
