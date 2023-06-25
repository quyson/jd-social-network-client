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
        <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
          <img
            src="/svgs/home.svg"
            className="pr-2"
            style={{ height: "2rem", width: "3rem" }}
          ></img>
          Home
        </div>
        <Link to={"/profile"} className="link">
          <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
            <div
              className="bg-white rounded-circle ml-1 mr-2"
              style={{ height: "2rem", width: "2rem" }}
            ></div>
            <div>{currentUser}</div>
          </div>
        </Link>
      </div>
      <div
        className="mb-4 border-bottom border-white"
        style={{ listStyleType: "none" }}
      >
        <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
          <img
            src="/svgs/watch.svg"
            className="pr-2"
            style={{ height: "2rem", width: "3rem" }}
          ></img>
          Watch
        </div>
        <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
          <img
            src="/svgs/market.svg"
            className="pr-2"
            style={{ height: "2rem", width: "3rem" }}
          ></img>
          Marketplace
        </div>
        <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
          <img
            src="/svgs/video.svg"
            className="pr-2"
            style={{ height: "2rem", width: "3rem" }}
          ></img>
          Gaming
        </div>
        <div className="p-1 mb-2 listElement d-flex justify-content-start align-items-center">
          <img
            src="/svgs/news.svg"
            className="pr-2"
            style={{ height: "2rem", width: "3rem" }}
          ></img>
          Feeds
        </div>
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
