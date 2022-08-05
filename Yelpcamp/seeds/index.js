const mongoose = require("mongoose");
const cities = require("./cities")
const campgroundImages = require('./campgroundImages')
const {places, descriptors} = require('./seedhelper')
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
})

const sample = (array)=> array[Math.floor(Math.random()*array.length)]


const seedDB = async () =>{
    await Campground.deleteMany({});
    for (let i = 0; i<200; i++){
        const price = Math.floor(Math.random()*20)+10;
        const random1000 = Math.floor(Math.random()*1000);
        const random9 = Math.floor(Math.random()*9);
        const camp = new Campground ({
            //YOUR USER ID
            author: "62e854647cf14902999d4355",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat labore nam at et quos voluptate sapiente perferendis voluptatibus tempore repellendus rem accusantium incidunt dolorum ipsam numquam quo quia, obcaecati esse.",
            price: price,
            geometry :{
                type:"Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: campgroundImages[random9]
          
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close();
});