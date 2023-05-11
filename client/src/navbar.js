import React from "react";
import axios from "axios";
import logout from "./logout";
import { useState } from "react";
import Logout from "./logout";

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
          ></input>
        </form>
      </div>
      <Logout />
    </div>
  );
};

export default Navbar;
