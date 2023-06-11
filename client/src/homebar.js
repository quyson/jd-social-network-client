import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

const Homebar = () => {
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  return (
    <div
      className="pt-3"
      style={{
        fontSize: "1.15rem",
        fontWeight: "900",
        color: "white",
      }}
    >
      <div
        className="mb-4 border-bottom border-white"
        style={{ listStyleType: "none" }}
      >
        <div className="p-1 mb-2 listElement">Home</div>
        <Link to={"/profile"} className="link">
          <div className="p-1 mb-2 listElement">{currentUser}</div>
        </Link>
      </div>
      <div
        className="mb-4 border-bottom border-white"
        style={{ listStyleType: "none" }}
      >
        <div className="p-1 mb-2 listElement">Watch</div>
        <div className="p-1 mb-2 listElement">Marketplace</div>
        <div className="p-1 mb-2 listElement">Gaming</div>
        <div className="p-1 mb-2 listElement">Feeds</div>
      </div>
      <div
        className="mb-4 border-bottom border-white"
        style={{ listStyleType: "none" }}
      >
        <div className="p-1 mb-2 listElement">Watch</div>
        <div className="p-1 mb-2 listElement">Marketplace</div>
        <div className="p-1 mb-2 listElement">Gaming</div>
        <div className="p-1 mb-2 listElement">Feeds</div>
      </div>
    </div>
  );
};

export default Homebar;
