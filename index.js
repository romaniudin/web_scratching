const request = require('request')
const readlineSync = require('readline-sync')

let city
if(process.argv[2]) {
  city = process.argv[2]
} else {
  city = readlineSync.question('Please enter a city: ')
}


const geoDataUrl = `https://api.opencagedata.com/geocode/v1/json?key=e86222355af7460b9e753283326cfbb7&q=${city}&pretty=1&no_annotations=1`

let weatherUrl = 'https://api.darksky.net/forecast/82317ee0c43e86070fe114fabe7b32b7/'

request(geoDataUrl, function(error, response, body) {
  if(error) {
    console.log(error)
    return
  }

  if(response.statusCode === 404) {
    console.log('Error - Path Not Found: ' + geoDataUrl)
    return
  }

  const data = JSON.parse(body)
  const latitude = data.results[0].geometry.lat
  const longitude = data.results[0].geometry.lng

  const output = `${city}'s Latitude is ${latitude} and Longitude is ${longitude}`

  console.log(output)

  weatherUrl += `${latitude},${longitude}?units=si`

  request(weatherUrl, function(error, response, body) {
    const data = JSON.parse(body)
    console.log(`${city}'s current temperature is: ${data.currently.temperature} C`)
  })

})


