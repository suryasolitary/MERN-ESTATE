import mongoose from "mongoose";

const ListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    discountPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    bathRooms: {
      type: Number,
      required: true,
      trim: true,
    },
    bedRooms: {
      type: Number,
      required: true,
      trim: true,
    },
    furnished: {
      type: Boolean,
      required: true,
      trim: true,
    },
    Parking: {
      type: Boolean,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    offer: {
      type: Boolean,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const List = mongoose.model("Listing", ListSchema);

export default List;
