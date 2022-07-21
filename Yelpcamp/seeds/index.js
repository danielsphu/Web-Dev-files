const mongoose = require("mongoose");
const cities = require("./cities")
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
    for (let i = 0; i<50; i++){
        const price = Math.floor(Math.random()*20)+10;
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground ({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://placeimg.com/640/480/nature",
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat labore nam at et quos voluptate sapiente perferendis voluptatibus tempore repellendus rem accusantium incidunt dolorum ipsam numquam quo quia, obcaecati esse.",
            price: price,
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close();
});