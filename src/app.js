const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather dynamic'
    });
});

app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Some help'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Mohammedi Afini'
    });
});
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            return res.send({
                location,
                forecastData,
                address:req.query.address
            });
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Page not found.'
    });
});

app.listen('3000', () => {
    console.log("Server initialized - Listening on port 3000");
})
