const request = require("request");

const restaurantLocator = (latitude, longitude, callback) => {
  const uri = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longitude}`;

  request(
    {
      headers: {
        Accept: "application/json",
        "user-key": "6b5d5d5bc824e24049fd9f1abcbd5399"
      },
      uri: uri,
      method: "GET",
      json: true
    },
    (error, res, body) => {
      console.log("vine 1" + body.nearby_restaurants[0].restaurant.name);

      if (error) {
        callback("Unable to connect to restaurant finder service!", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        console.log("vine 2" + body.nearby_restaurants[0].restaurant.name);
        callback(
          undefined,
          "The nearest store is :" + body.nearby_restaurants[0].restaurant.name
        );
      }
    }
  );
};

module.exports = restaurantLocator;
