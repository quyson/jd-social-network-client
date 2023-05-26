import React from "react";
import { useState } from "react";
import Logout from "./logout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from "./notifications";

const Navbar = () => {
  const [search, setSearch] = useState(null);

  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  console.log(currentUser);

  return (
    <div
      className="fixed flex bg-stone-800 p-3 items-center 
    justify-between h-16 border-b-2 border-neutral-500 w-full px-8"
    >
      <h1 className="text-white font-bold text-xl">
        <Link to={`/timeline`}>JD SOCIAL NETWORK</Link>
      </h1>
      <div className="w-1/2 text-center">
        <form>
          <input
            id="search"
            name="search"
            placeholder="Search JD Network"
            onChange={(e) => setSearch(e.target.value)}
            className="w-96 h-10 bg-stone-600 px-3 rounded-3xl text-white hover:bg-stone-500"
          ></input>
          <Link to={`/search/${search}`}>
            <button type="button">Search</button>
          </Link>
        </form>
      </div>
      <div className="flex gap-3.5 text-white">
        <Notifications />
        <Link to={`/profile`}>
          <div>{currentUser}</div>
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
