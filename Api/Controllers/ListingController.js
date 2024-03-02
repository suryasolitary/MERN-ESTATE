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
