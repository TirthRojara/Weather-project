const request = require('postman-request')


// const url = 'https://api.weatherstack.com/current?access_key=5f333072504082e2bb49e2b4b5ba1c28&query=22.294363,70.782555&units=f'
// const url = 'https://api.weatherstack.com/current?access_key=5f333072504082e2bb49e2b4b5ba1c28&query=22.294363,70.782555'

// request({ url: url}, (error, response) => {
//     const data = JSON.parse(response.body)
//     console.log(data)
// })

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to  connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. It feel like '+ response.body.current.feelslike + ' degress out.')
//     }
// })

const getWeather = (latitude, longitude, callback) => {
    // const url = 'https://api.weatherstack.com/current?access_key=5f333072504082e2bb49e2b4b5ba1c28&query=22.294363,70.782555'
    const url = 'https://api.weatherstack.com/current?access_key=5f333072504082e2bb49e2b4b5ba1c28&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined, )
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. It feel like '+ response.body.current.feelslike + ' degress out.')
        }
    })
}


module.exports = getWeather