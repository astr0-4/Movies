let app = require('express')()
let cors = require('cors')
let fetch = require('isomorphic-fetch')

app.use(cors())

const BASE_REQUEST_URL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${formatDate()}`
const API_KEY = `api_key=g9rwkqkcx8u5t5b978as7723`
function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
var zipCode = 'zip=M5V3M6'
app.get('/api/zip=M5V3M6+/', (req, res) => {
    // console.log(req)
    var url = BASE_REQUEST_URL + '&' + zipCode + '&' + API_KEY
    fetch(url)
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
