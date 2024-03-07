import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function Listitem({ listing }) {
  return (
    <div className="bg-white m-2 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px] ">
      <Link to={`/list/${listing._id}`}>
        <img
          src={listing.imageUrl[0]}
          alt="listing Image"
          className=" h-[300px]  sm:h-[220px] w-full object-cover hover:scale-105 transaction-slale duration-300 cursor-pointer "
        />
        <div className="p-5 flex flex-col gap-1 w-full ">
          <p className="text-slate-700 truncate  uppercase text-xl sm:text-lg font-semibold ">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-green-900 h-5 w-5  " />
            <p className="text-slate-500 text-lg font-semibold ">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-slate-600 font-semibold  line-clamp-2">
            {listing.description}
          </p>
          <p className="font-semibold text-lg text-slate-600">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "Rent" && " / Month"}
          </p>
        </div>
      </Link>
    </div>
  );
}
