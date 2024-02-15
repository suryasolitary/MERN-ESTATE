import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-slate-200 p-2 shadow-lg ">
      <div className=" bg-slate-200 flex justify-between p-3 ">
        <h1 className="flex flex-wrap items-center text-lg  sm:text-2xl font-bold">
          <span className="text-slate-400 ">Surya</span>
          <span>Estate</span>
        </h1>
        <form className=" bg-slate-100 rounded-lg  flex items-center p-3">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-24 sm:w-64 outline-none text-lg"
          />
          <FaSearch className="text-slate-500" />
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
          <Link to="/signin">
            <li className=" font-semibold text-lg p-3 hover:underline cursor-pointer sm:p-0">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}