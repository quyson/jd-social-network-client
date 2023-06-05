import React from "react";
import { useSelector } from "react-redux";

const Homebar = () => {
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );
  return (
    <div>
      <div>
        <ul>
          <li> Home</li>
          <li>{currentUser}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Watch</li>
          <li>Marketplace</li>
          <li>Gaming</li>
          <li>Feeds</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Watch</li>
          <li>Marketplace</li>
          <li>Gaming</li>
          <li>Feeds</li>
        </ul>
      </div>
    </div>
  );
};

export default Homebar;
