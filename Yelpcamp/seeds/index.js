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
            author: "62e854647cf14902999d4355",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat labore nam at et quos voluptate sapiente perferendis voluptatibus tempore repellendus rem accusantium incidunt dolorum ipsam numquam quo quia, obcaecati esse.",
            price: price,
            images: [
                {
                url: 'https://res.cloudinary.com/dbcktv0bw/image/upload/v1659661029/YelpCamp/ytsbtv34flomobkl3z2z.jpg',
                filename: 'YelpCamp/ytsbtv34flomobkl3z2z',
              },
              {
                url: 'https://res.cloudinary.com/dbcktv0bw/image/upload/v1659661031/YelpCamp/m0s6kaprhgbnfy5qs57z.jpg',
                filename: 'YelpCamp/m0s6kaprhgbnfy5qs57z',
              }
            ]
          
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close();
});