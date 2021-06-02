const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZm9yaWR1bmsiLCJhIjoiY2twYXhvamp3MHM5NzJwbGx5dDZrb2swNSJ9.6Rgmtm-yLM0x77DkxlbHKA&limit=1`;

  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (!features?.length) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const [
        {
          center: [longitude, latitude],
          place_name: location,
        },
      ] = features;
      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
