const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); 


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

 
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            auther: '662845ad6d1b6b683f729cdf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
    
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque eveniet distinctio earum provident expedita deserunt ipsa veniam in autem totam exercitationem illum vitae explicabo, quod maiores. Dolores, neque totam.',
            price,
            geometry:{
                type:'Point',
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images :[
                {
                    url: 'https://res.cloudinary.com/dqgwuqkcx/image/upload/v1715183082/YelpCamp/zehdselk7rhweg7pzbev.jpg',
                    filename: 'YelpCamp/zehdselk7rhweg7pzbev'
                  },
                  {
                    url: 'https://res.cloudinary.com/dqgwuqkcx/image/upload/v1715183083/YelpCamp/i3dhawycn5oqnqivmgzj.jpg',
                    filename: 'YelpCamp/i3dhawycn5oqnqivmgzj'
                  }
                 

            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})