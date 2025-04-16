// node src/app.js -e js,hbs 

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/getWeather')
const { error } = require('console')

const app = express()

// app.get('', (req, res) => {
//     // res.send('Hello Express!!!')
//     res.send('<h1>Hello Express!!!</h1>')
// })

// (((((((((((((((     Define paths for Express config     )))))))))))))))

// console.log(__dirname)
// console.log(publicDirectoryPath)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template copy/views')
const partialsPath = path.join(__dirname, '../template copy/partials')


// ((((((((((((((      Setup handlebars engine and views location      ))))))))))))))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tirth'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me from title',
        name: 'Tirth'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Title',
        name: 'Rwiz'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Tirth',
//         age: 21
//     }, {
//         name: 'Rwiz',
//         age: 17
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    const addressfromUrl = req.query.address
    console.log(addressfromUrl)
    console.log(req.query.address)
    geocode(req.query.address, (error, { Latitude, Longitude, City, State } = {}) => {
        if (error) {
            return res.send({ error })
        }

        // console.log(locationData)
        console.log(Longitude, Latitude, City, State)


        forecast(Latitude, Longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                City,
                State,
                address: req.query.address
            })
         
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/help/*', (req, res) => {
//     res.send('Help article not found')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 page')
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})


























