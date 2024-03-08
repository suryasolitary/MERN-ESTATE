import List from "../Models/Listingmodel.js";
import { errHandlers } from "../utils/Error.js";

export const creatingList = async (req, res, next) => {
  try {
    const listing = await List.create(req.body);
    return res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deletingList = async (req, res, next) => {
  const listing = await List.findById(req.params.id);
  //console.log(listing);

  if (!listing) {
    return next(errHandlers(404, "Listing Not Found..."));
  }

  if (req.user.id !== listing.userRef) {
    return next(errHandlers(401, "You can Delete your Own Account..."));
  }

  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("listing Deleted SuccessFully...");
  } catch (err) {
    console.log(err);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await List.findById(req.params.id);
  if (!listing) {
    return next(errHandlers(404, "List not Found..."));
  }

  if (req.user.id !== listing.userRef) {
    return next(errHandlers(401, "You can update your own Account..."));
  }

  try {
    const updatedListing = await List.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedListing);
  } catch (err) {
    console.log(err);
  }
};

export const getlisting = async (req, res, next) => {
  const listing = await List.findById(req.params.id);
  if (!listing) {
    return next(errHandlers(404, "Listing not found..."));
  }
  res.status(200).json(listing);
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer == undefined || offer == false) {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished == undefined || furnished == false) {
      furnished = { $in: [false, true] };
    }

    let Parking = req.query.Parking;
    if (Parking == undefined || Parking == false) {
      Parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type == undefined || type == "all") {
      type = { $in: ["sell", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const listing = await List.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      Parking,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

    //console.log("Listing Data ", listing);
    return res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
