const hbs = require('hbs')
const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port= process.env.PORT || 3000

//define paths for express config
const publicpath = path.join('__dirname', '../public')
const viewpath = path.join('__dirname', '../template/views')
const partialspath = path.join('__dirname', '../template/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicpath))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a location'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error)
            return res.send({error})

        forecast(latitude,longitude, (error, forecastData)=> {
            if (!error) {
                res.send({
                    latitude,
                    longitude,
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            }
            else 
                return res.send({error})

        })
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Meenal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: "Help text here",
        title: "Help",
        name: "Meenal"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Meenal"
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('app listening on port'+port);
})