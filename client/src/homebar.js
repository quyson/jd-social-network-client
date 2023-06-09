import React from "react";
import { useSelector } from "react-redux";

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
      <div className="mb-4" style={{ listStyleType: "none" }}>
        <div className="p-1 mb-2 border-bottom border-white">Home</div>
        <div className="p-1 mb-2 border-bottom border-white">{currentUser}</div>
      </div>
      <div className="mb-4" style={{ listStyleType: "none" }}>
        <div className="p-1 mb-2 border-bottom border-white">Watch</div>
        <div className="p-1 mb-2 border-bottom border-white">Marketplace</div>
        <div className="p-1 mb-2 border-bottom border-white">Gaming</div>
        <div className="p-1 mb-2 border-bottom border-white">Feeds</div>
      </div>
      <div className="mb-4" style={{ listStyleType: "none" }}>
        <div className="p-1 mb-2 border-bottom border-white">Watch</div>
        <div className="p-1 mb-2 border-bottom border-white">Marketplace</div>
        <div className="p-1 mb-2 border-bottom border-white">Gaming</div>
        <div className="p-1 mb-2 border-bottom border-white">Feeds</div>
      </div>
    </div>
  );
};

export default Homebar;
