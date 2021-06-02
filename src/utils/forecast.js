const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=633eb78dfdc792c0b690a442f0d5c487&query=' +
    latitude +
    ',' +
    longitude;

  request(
    { url, json: true },
    (
      error,
      response,
      {
        error: bodyError,
        current: { temperature, feelslike, humidity, wind_speed },
      }
    ) => {
      if (error) {
        callback('Unable to connect to weather service!', undefined);
      } else if (bodyError) {
        callback('Unable to find location', undefined);
      } else {
        const forecast = `It's currently ${temperature} celsius and it feels like ${feelslike}. The humidity is ${humidity}% and the wind speed is ${wind_speed}km/h.`;
        callback(undefined, forecast);
      }
    }
  );
};

module.exports = forecast;
