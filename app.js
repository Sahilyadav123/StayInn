const express = require("express")
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


main().then(() => {
    console.log("Connected")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    res.render("listings/home.ejs");
})

// app.get("/testlisting",async (req,res)=>{
//     let sample = new Listing ({
//         title: "Sample Listing",
//         description: "This is a sample listing",
//         price: 1000,
//         image:"",
//         location: "New York",
//         country: "USA",

//     })
//     await sample.save();
//     console.log("sample saved");
//     res.send("Sample Saved");
// })

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find();
    // console.log(path.join(__dirname, 'views', 'listings', 'index.ejs'));

    res.render("listings/index.ejs", { allListings });
});

app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs");
})

app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body);
    let sample = new Listing({
        title: newListing.title,
        description: newListing.description,
        price: newListing.price,
        image: newListing.image,
        location: newListing.location,
        country: newListing.country,

    })
    await sample.save();
    res.redirect("listings");

})
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing })
})

app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
})

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    // console.log(...req.body.listing) 
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


app.listen(port, () => {
    console.log("server is listening at port", port)
})