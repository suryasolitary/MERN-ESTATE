import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentuser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState("");
  const navigation = useNavigate();
  //console.log(searchTerm);
  //console.log(currentuser.profilePic);

  const handleSubmit = (e) => {
    e.preventDefault();
    const UrlParams = new URLSearchParams(location.href);
    UrlParams.set("searchTerm", searchTerm);
    const SearchQuery = UrlParams.toString();
    navigation(`/search?${SearchQuery}`);
  };
  useEffect(() => {
    const UrlParams = new URLSearchParams(location.search);
    const SearchUrl = UrlParams.get("searchTerm");
    if (SearchUrl) {
      setsearchTerm(SearchUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 p-2 shadow-lg ">
      <div className=" bg-slate-200 flex justify-between p-3 ">
        <Link to={"/"}>
          <h1 className="flex flex-wrap items-center text-lg  sm:text-2xl font-bold">
            <span className="text-slate-400 ">Surya's</span>
            <span> Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" bg-slate-100 rounded-lg  flex items-center p-3"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-24 sm:w-64 outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-5 items-center sm:mr-5">
          <Link to="/">
            <li className=" hidden sm:inline cursor-pointer hover:underline font-semibold sm:text-lg ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hidden sm:inline cursor-pointer hover:underline font-semibold sm:text-lg ">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentuser ? (
              <img
                className=" rounded-full w-10 h-10 mr-5 sm:mr-0"
                src={currentuser.profilePic}
                alt="profile"
              />
            ) : (
              <li className=" font-semibold text-lg p-3 hover:underline cursor-pointer sm:p-0">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
