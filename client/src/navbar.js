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
    <div>
      <h3>JD SOCIAL NETWORK</h3>
      <div>
        <form>
          <input
            id="search"
            name="search"
            placeholder="Search JD Network"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <Link to={`/search/${search}`}>
            <button type="button">Search</button>
          </Link>
        </form>
        <Link to={`/profile`}>
          <div>{currentUser}</div>
        </Link>
      </div>
      <Notifications />
      <Logout />
    </div>
  );
};

export default Navbar;
