import { useEffect, useState } from "react";
import Contact from "../Components/Contact";
import {
  FaShare,
  FaMapMarkedAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";

export default function List() {
  SwiperCore.use([Navigation]);
  const Params = useParams();
  const { currentuser } = useSelector((state) => state.user);
  const [formData, setformData] = useState(null);
  const [loading, setloading] = useState(false);
  const [Error, setError] = useState(null);
  const [copy, setcopy] = useState(false);
  const [contact, setContact] = useState(false);
  //console.log(copy);
  useEffect(() => {
    const fetching = async () => {
      const listId = Params.listid;
      //console.log("list Id ", listId);
      try {
        setloading(true);
        const response = await fetch(`/api/list/get/${listId}`);
        const data = await response.json();
        if (data.success === false) {
          setloading(false);
          setError(true);
        }
        //console.log(data);
        setformData(data);
        setloading(false);
        setError(false);
      } catch (err) {
        setError(true);
        setloading(false);
      }
    };
    fetching();
  }, [Params.listid]);

  return (
    <main>
      {loading && (
        <p className="text-center text-xl my-7 text-slate-600 font-semibold">
          Loading...
        </p>
      )}
      {Error && (
        <p className="text-xl text-red-600 font-semibold text-center my-7 ">
          Something went Wrong...
        </p>
      )}
      {formData && !loading && !Error && (
        <>
          <Swiper navigation>
            {formData.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[16%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setcopy(true);
                setTimeout(() => {
                  setcopy(false);
                }, 2000);
              }}
            />
          </div>

          {copy && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-3 font-semibold">
              Link Copied
            </p>
          )}

          <div className=" flex flex-col max-w-4xl mx-auto my-5 p-3 gap-3 ">
            <p className="text-2xl text-slate-700 font-semibold">
              {formData.name} - ₹{" "}
              {formData.offer
                ? formData.discountPrice.toLocaleString("en-US")
                : formData.regularPrice.toLocaleString("en-US")}
              {formData.type === "Rent" && " / Month"}
            </p>

            <p className="flex items-center mt-5 gap-2 font-semibold my-2 text-lg text-slate-600 ">
              <FaMapMarkedAlt className="text-green-700 text-2xl" />
              {formData.address}
            </p>

            <div className="flex gap-5">
              <p className="bg-red-900 text-white p-2 w-full max-w-[200px] rounded-lg text-center text-lg font-semibold ">
                {formData.type === "Rent" ? `For Rent` : `For Sale`}
              </p>
              {formData.offer && (
                <p className="bg-green-900 w-full max-w-[200px] self-center  text-lg text-center text-white p-2 rounded-lg">
                  ₹ {+formData.regularPrice - +formData.discountPrice}
                </p>
              )}
            </div>
            <p className=" text-slate-600 ">
              <span className="text-lg font-semibold text-slate-700">
                Description -{" "}
              </span>
              {formData.description}
            </p>
            <ul className=" flex gap-5 text-green-900 flex-wrap">
              <li className="flex gap-1 items-center text-lg font-semibold ">
                <FaBed className="text-xl " />
                {formData.bedRooms > 1
                  ? `${formData.bedRooms} Beds`
                  : `${formData.bedRooms} Bed`}
              </li>
              <li className="flex gap-1 items-center text-lg font-semibold ">
                <FaBath className="text-xl " />
                {formData.bathRooms > 1
                  ? `${formData.bathRooms} Baths`
                  : `${formData.bathRooms} Bath`}
              </li>
              <li className="flex gap-1 items-center text-lg font-semibold ">
                <FaParking className="text-xl " />
                {formData.Parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex gap-1 items-center text-lg font-semibold ">
                <FaChair className="text-xl " />
                {formData.furnished ? "Furnished" : "No Furnished"}
              </li>
            </ul>
            {currentuser &&
              currentuser._id !== formData.userRef &&
              !contact && (
                <button
                  className="bg-slate-700 text-white p-3 rounded-lg text-lg uppercase hover:opacity-95"
                  onClick={() => setContact(true)}
                >
                  Contact
                </button>
              )}
            {contact && <Contact formData={formData} />}
          </div>
        </>
      )}
    </main>
  );
}
