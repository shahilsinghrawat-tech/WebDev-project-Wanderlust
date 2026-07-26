const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    const address = `${req.body.listing.location}, ${req.body.listing.country}`;
    const geoData = await maptilerClient.geocoding.forward(address);
    const newListing = new Listing(req.body.listing);

    let url = req.file.path;
    let filename = req.file.filename;

    // console.log(url, "..", filename)
    newListing.image = { url, filename };
    newListing.owner = req.user._id;

    if (geoData && geoData.features && geoData.features.length > 0) {
        newListing.geometry = geoData.features[0].geometry; 
    } else {
        newListing.geometry = { type: 'Point', coordinates: [0, 0] }; 
    }

    await newListing.save();

    console.log(newListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }

    let { id } = req.params;

    const address = `${req.body.listing.location}, ${req.body.listing.country}`;

    const geoData = await maptilerClient.geocoding.forward(address);

    if (geoData && geoData.features && geoData.features.length > 0) {
        req.body.listing.geometry = geoData.features[0].geometry;
    } else {
        req.body.listing.geometry = { type: 'Point', coordinates: [0, 0] };
    }
    
    let listing = await Listing.findByIdAndUpdate(
        id, 
        { ...req.body.listing },
        { new: true }
    );

    console.log("Updated Listing:", listing);

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.index = async (req, res) => {
    const { category } = req.query;
    let dbQuery = {};
    if (category) {
        dbQuery.category = category;
    }
    const allListings = await Listing.find(dbQuery);
    res.render("listings/index.ejs", { allListings });
};

module.exports.index = async (req, res) => {
    const { category, q } = req.query;
    let dbQuery = {};

    if (category) {
        dbQuery.category = category;
    }

    // bas abhi filter by location, country, or title

    if (q) {
        dbQuery = {
            $or: [
                // $options: "i" makes the search case-insensitive!
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } },
                { title: { $regex: q, $options: "i" } }
            ]
        };
    }

    const allListings = await Listing.find(dbQuery);
    

    res.render("listings/index.ejs", { 
        allListings, 
        currentCategory: category || "" 
    });
};
