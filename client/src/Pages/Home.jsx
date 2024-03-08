import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listitem from "../Components/Listitem";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerlist, setofferlist] = useState([]);
  const [salelist, setsalelist] = useState([]);
  const [rentlist, setrentlist] = useState([]);
  console.log(salelist);

  useEffect(() => {
    const fetchofferList = async () => {
      try {
        const response = await fetch(`/api/list/get?offer=true&limit=4`);
        const data = await response.json();
        setofferlist(data);
        fetchsaleList();
      } catch (err) {
        console.log(err);
      }
    };

    const fetchsaleList = async () => {
      try {
        const response = await fetch(`/api/list/get?type=sale&limit=4`);
        const data = await response.json();
        setsalelist(data);
        fetchrentList();
      } catch (err) {
        console.log(err);
      }
    };

    const fetchrentList = async () => {
      try {
        const response = await fetch(`/api/list/get?type=rent&limit=4`);
        const data = await response.json();
        setrentlist(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchofferList();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 p-16 px-7">
        <h1 className="text-slate-600 text-4xl  font-bold sm:text-6xl">
          Find your next <span className="text-slate-400">Perfect</span> place
          with ease
        </h1>
        <div className="text-slate-500 font-semibold text-md sm:text-lg">
          Surya's Estate is the Best place to find your next perfect place to
          live.
          <br />
          we have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 text-md sm:text-lg font-semibold hover:underline "
        >
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerlist &&
          offerlist.length > 0 &&
          offerlist.map((list) => (
            <SwiperSlide>
              <div
                key={list._id}
                style={{
                  background: `url(${list.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] m-3 rounded-lg"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {offerlist && offerlist.length > 0 && (
        <div className="max-w-6xl mx-auto p-3  flex flex-col gap-6 my-10">
          <div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h1>
              <Link
                to={`/search?offer=true`}
                className="text-md font-semibold text-blue-800 hover:underline"
              >
                Show more Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerlist.map((list) => (
                <div>
                  <Listitem key={list._id} listing={list} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {rentlist && rentlist.length > 0 && (
        <div className="max-w-6xl mx-auto p-3  flex flex-col gap-6 my-10">
          <div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent Place for Rents
              </h1>
              <Link
                to={`/search?type=rent`}
                className="text-md font-semibold text-blue-800 hover:underline"
              >
                Show more place for Rent...
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentlist.map((list) => (
                <div>
                  <Listitem key={list._id} listing={list} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {salelist && salelist.length > 0 && (
        <div className="max-w-6xl mx-auto p-3  flex flex-col gap-6 my-10">
          <div>
            <div className="flex flex-col  gap-2">
              <h1 className="text-2xl font-semibold text-slate-600">
                Recent Place for Sale
              </h1>
              <Link
                to={`/search?type=sell`}
                className="text-md font-semibold  text-blue-800 hover:underline"
              >
                Show more Place for sale...
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {salelist.map((list) => (
                <div>
                  <Listitem key={list._id} listing={list} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
