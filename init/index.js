// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// require("dotenv").config({ path: "../.env" });

// const maptilerClient = require("@maptiler/client");
// maptilerClient.config.apiKey = process.env.MAP_TOKEN;

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//     .then(() => {
//         console.log("connected to DB");
//         initDB(); //run After connection
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// async function main() {
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});

//     initData.data = initData.data.map((obj) => ({
//         ...obj,
//         owner: new mongoose.Types.ObjectId("6a49d0adb8a0c01d958faa1d"),

//         geometry: {
//             type: "Point",
//             coordinates: [77.2090, 28.6139]
//         }
//     }));

//     await Listing.insertMany(initData.data);

//     console.log("data was initialized");
// };

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const path = require("path");
require("dotenv").config(); 

const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

// console.log("My Map Token is:", process.env.MAP_TOKEN);

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; 

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  
  await Listing.deleteMany({});
  
  console.log("Fetching exact coordinates for all listings. This may take a few seconds...");

  
  for (let obj of initData.data) {
      
      
      obj.owner = "6a49d0adb8a0c01d958faa1d";
      
      
      const address = `${obj.location}, ${obj.country}`;
      try {
          const geoData = await maptilerClient.geocoding.forward(address);
          
          if (geoData && geoData.features && geoData.features.length > 0) {
              obj.geometry = geoData.features[0].geometry;
          } else {
              obj.geometry = { type: "Point", coordinates: [0, 0] }; 
          }
      } catch (err) {
          console.log(`Failed to fetch coordinates for ${address}`);
          obj.geometry = { type: "Point", coordinates: [0, 0] }; 
      }
  }

  await Listing.insertMany(initData.data);
  console.log("Data was initialized with EXACT exact coordinates!");
};

initDB();

