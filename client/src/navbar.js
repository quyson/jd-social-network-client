import React from "react";
import axios from "axios";
import { useState } from "react";
import Logout from "./logout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState(null);

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
      </div>
      <Logout />
    </div>
  );
};

export default Navbar;
