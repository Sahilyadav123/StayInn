const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        set: (v)=> v ==="" ? "https://unsplash.com/photos/white-boat-on-body-of-water-near-green-palm-trees-n7DY58YFg9E" 
            : v,    
    },
    price: Number,
    location: String,
    country: String
  });

  const Listing = mongoose.model('Listing', ListingSchema);
  module.exports = Listing; 