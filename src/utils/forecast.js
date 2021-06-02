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
      { error: bodyError, current: { temperature, feelslike } }
    ) => {
      if (error) {
        callback('Unable to connect to weather service!', undefined);
      } else if (bodyError) {
        callback('Unable to find location', undefined);
      } else {
        callback(
          undefined,
          "It's currently " +
            temperature +
            ' celsius. It feels like ' +
            feelslike +
            ' celsius.'
        );
      }
    }
  );
};

module.exports = forecast;
