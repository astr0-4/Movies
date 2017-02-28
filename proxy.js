let app = require('express')()
let cors = require('cors')
let fetch = require('isomorphic-fetch')

app.use(cors())

const REQUEST_URL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-02-28&zip=M5V+3M6&api_key=g9rwkqkcx8u5t5b978as7723'

app.get('/api', (req, res) => {
    fetch(REQUEST_URL)
        .then(response => response.json() )
        .then(responseData => {
        
            res.json(responseData)
        })
        .catch(error => {
            console.log('Error: ', error)
        })
})

app.get('/', (req, res) => {
  res.send('its alive!')
})

app.listen(5000, () => { console.log('listening! ⚡️') })
