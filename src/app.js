const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const restaurantLocator = require("./utils/restaurantLocator");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Honest Food",
    name: "Vineet Panwar"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    });
  }
  console.log("req query here", req.query.address);

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      console.log("vineet geocode ended", latitude, longitude);

      restaurantLocator(latitude, longitude, (error, Data) => {
        if (error) {
          return res.send({ error });
        }
        console.log("VIN DATA HERE", Data);
        res.send({
          restaurant: Data
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vineet Panwar",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
