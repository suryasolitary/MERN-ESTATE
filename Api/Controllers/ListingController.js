import List from "../Models/Listingmodel.js";

export const creatingList = async (req, res, next) => {
  try {
    const listing = await List.create(req.body);
    return res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};
