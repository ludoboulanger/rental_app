const express = require("express");
const LocationRouter = express.Router();
let GeocoderGeonames = require("geocoder-geonames"),
  geocoder = new GeocoderGeonames({
    username: process.env.GEONAMES_USERNAME,
  });

//see https://www.geonames.org/export/geonames-search.html for api documentation
LocationRouter.get("/search", async (request, response, next) => {
  const { geonames } = await geocoder.get("search", { maxRows: 10, ...request.query }).catch(next);
  const data = geonames.map(place => (
    {
      placeName: place.toponymName,
      countryName: place.countryName,
      adminName: place.adminName1,
      geoNameId: place.geoNameId
    }
  ));
  response.send(data);
});

module.exports = LocationRouter;
