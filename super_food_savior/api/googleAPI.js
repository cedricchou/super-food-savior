const googleMaps = require("@google/maps");
const GMAP = require("../frontend/app_keys/app_keys");
const googleMapsClient = googleMaps.createClient({
  key: GMAP.GMAP_KEY,
  Promise: Promise
});

const geoCode = address => googleMapsClient.geocode(address).asPromise();

module.exports = {
  geoCode
};
