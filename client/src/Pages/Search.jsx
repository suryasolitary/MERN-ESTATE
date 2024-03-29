import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listitem from "../Components/Listitem";
export default function Search() {
  const navigation = useNavigate();
  const [loading, setloading] = useState(false);
  const [listing, setlisting] = useState([]);
  const [showmore, setshowmore] = useState(false);
  console.log(showmore);
  console.log(listing);
  const [sidebarData, setsidebarData] = useState({
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    searchTerm: "",
    sort: "createdAt",
    order: "desc",
  });
  //console.log(sidebarData);
  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const searchTermUrl = UrlParams.get("searchTerm");
    const typeUrl = UrlParams.get("type");
    const ParkingUrl = UrlParams.get("parking");
    const furnishedUrl = UrlParams.get("furnished");
    const offerUrl = UrlParams.get("offer");
    const sortUrl = UrlParams.get("sort");
    const orderUrl = UrlParams.get("order");
    if (
      searchTermUrl ||
      typeUrl ||
      ParkingUrl ||
      furnishedUrl ||
      offerUrl ||
      sortUrl ||
      orderUrl
    ) {
      setsidebarData({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        offer: offerUrl == "true" ? true : false,
        parking: ParkingUrl == "true" ? true : false,
        furnished: furnishedUrl == "true" ? true : false,
        sort: sortUrl || "createdAt",
        order: orderUrl || "desc",
      });
    }
    const fetching = async () => {
      try {
        setloading(true);
        const searchQuary = UrlParams.toString();
        const response = await fetch(`/api/list/get?${searchQuary}`);
        const data = await response.json();
        if (data.length > 8) {
          setshowmore(true);
        } else {
          setshowmore(false);
        }
        if (data.errMessage == false) {
          setloading(false);
          console.log(errMessage);
        }
        setlisting(data);
        setloading(false);
      } catch (err) {
        setloading(false);
        console.log(err);
      }
    };
    fetching();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id == "sell"
    ) {
      setsidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id == "search") {
      setsidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setsidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked == "true" ? true : false,
      });
    }
    if (e.target.id == "sort") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setsidebarData({ ...sidebarData, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const UrlParams = new URLSearchParams();
    UrlParams.set("searchTerm", sidebarData.searchTerm);
    UrlParams.set("type", sidebarData.type);
    UrlParams.set("parking", sidebarData.parking);
    UrlParams.set("furnished", sidebarData.furnished);
    UrlParams.set("offer", sidebarData.offer);
    UrlParams.set("sort", sidebarData.sort);
    UrlParams.set("order", sidebarData.order);
    const searchQuery = UrlParams.toString();
    //console.log(searchQuery);
    navigation(`/search?${searchQuery}`);
  };
  const onMoreChange = async () => {
    const NumberofListing = listing.length;
    const startIndex = NumberofListing;
    const UrlParams = new URLSearchParams(location.search);
    UrlParams.set("startIndex", startIndex);
    const searchQuary = UrlParams.toString();
    const response = await fetch(`/api/list/get?${searchQuary}
     `);
    const data = await response.json();
    if (data.length < 9) {
      setshowmore(false);
    }
    setlisting([...listing, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-5 border-b-2 md:border-r-2  md:min-h-screen ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-3 items-center">
            <label
              htmlFor="search"
              className="text-xl whitespace-nowrap font-semibold"
            >
              Search Item :
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className=" p-3 w-full rounded-lg text-lg outline-none"
              onChange={handleChange}
              value={sidebarData.searchTerm}
            />
          </div>
          <div className="flex gap-3 items-center ">
            <label className="text-lg font-semibold">Type :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                id="RentandSale"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span> Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={sidebarData.type == "rent"}
              />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-4"
                onChange={handleChange}
                checked={sidebarData.type == "sale"}
              />
              <span className="text-md">Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                id="offer"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span className="text-md">Offer</span>
            </div>
          </div>
          <div className="flex gap-3">
            <label className="text-lg font-semibold">Amenities :</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                id="parking"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span className="text-md">Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                id="furnished"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span className="text-md">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-lg font-semibold">Sort :</label>
            <select
              className="p-3 rounded-lg border outline-none"
              id="sort"
              onChange={handleChange}
              defaultValue="createdAt_desc"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 w-full mt-3 uppercase p-3 text-white text-lg hover:opacity-95 rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl text-slate-700 p-5 font-semibold border-b-2 mt-5 ">
          Listing Results :
        </h1>
        <div className="flex flex-wrap gap-7">
          {!loading && listing.length == 0 && (
            <p className="p-5 text-lg sm:text-xl font-semibold">
              No Listing Found...
            </p>
          )}
          {loading && (
            <p className=" text-center w-full p-3 font-semibold text-md sm:text-xl  ">
              Loading...
            </p>
          )}
          {!loading &&
            listing &&
            listing.map((list) => <Listitem key={list._id} listing={list} />)}
          {showmore && (
            <button
              className=" m-3 text-lg text-green-900 underline font-semibold text-center w-full"
              onClick={onMoreChange}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
